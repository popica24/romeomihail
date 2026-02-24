from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Category, Album, Photo
from .serializers import (
    CategorySerializer,
    AlbumListSerializer,
    AlbumDetailSerializer,
    PhotoSerializer,
    PhotoUploadSerializer,
    PhotoReorderSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class AlbumViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def get_queryset(self):
        queryset = Album.objects.filter(is_published=True).select_related('category')

        # Filter by category slug
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)

        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AlbumDetailSerializer
        return AlbumListSerializer

    @action(detail=True, methods=['get'])
    def photos(self, request, slug=None):
        """Get all photos for an album in order"""
        album = self.get_object()
        photos = album.photos.all().order_by('order')
        serializer = PhotoSerializer(photos, many=True, context={'request': request})
        return Response(serializer.data)


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def get_queryset(self):
        album_slug = self.kwargs.get('album_slug')
        if album_slug:
            return Photo.objects.filter(
                album__slug=album_slug
            ).order_by('order')
        
        return Photo.objects.none()

    def perform_create(self, serializer):
        album_slug = self.kwargs.get('album_slug')
        album = get_object_or_404(Album, slug=album_slug)

        # Set order to last position
        last_order = album.photos.count()
        serializer.save(album=album, order=last_order)

    @action(detail=False, methods=['post'], url_path='reorder')
    def reorder(self, request, album_slug=None):
        """
        Reorder photos via drag & drop
        Expected: [{"id": 1, "order": 0}, {"id": 2, "order": 1}, ...]
        """
        serializer = PhotoReorderSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        photos_data = serializer.validated_data['photos']

        try:
            with transaction.atomic():
                for photo_data in photos_data:
                    Photo.objects.filter(
                        id=photo_data['id'],
                        album__slug=album_slug
                    ).update(order=photo_data['order'])

            return Response({'message': 'Photos reordered successfully'})
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'], url_path='bulk-upload')
    def bulk_upload(self, request, album_slug=None):
        """Upload multiple photos at once"""
        album = get_object_or_404(Album, slug=album_slug)
        files = request.FILES.getlist('images')

        if not files:
            return Response(
                {'error': 'No images provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        created_photos = []
        start_order = album.photos.count()

        with transaction.atomic():
            for i, file in enumerate(files):
                photo = Photo.objects.create(
                    album=album,
                    image=file,
                    order=start_order + i
                )
                created_photos.append(photo)

        serializer = PhotoSerializer(
            created_photos,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)