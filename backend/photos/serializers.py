from rest_framework import serializers
from .models import Category, Album, Photo


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'image', 'image_url', 'caption', 'order', 'uploaded_at']
        read_only_fields = ['uploaded_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class PhotoUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image', 'caption', 'order']


class AlbumListSerializer(serializers.ModelSerializer):
    cover_url = serializers.SerializerMethodField()
    photo_count = serializers.IntegerField(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Album
        fields = [
            'id', 'name', 'slug', 'category', 'category_name',
            'date', 'description', 'cover_url', 'photo_count',
            'is_published', 'order', 'created_at'
        ]

    def get_cover_url(self, obj):
        request = self.context.get('request')
        if obj.cover and request:
            return request.build_absolute_uri(obj.cover.url)
        return None


class AlbumDetailSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    cover_url = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    photo_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Album
        fields = [
            'id', 'name', 'slug', 'category', 'category_name',
            'date', 'description', 'cover_url', 'photos',
            'photo_count', 'is_published', 'order',
            'created_at', 'updated_at'
        ]

    def get_cover_url(self, obj):
        request = self.context.get('request')
        if obj.cover and request:
            return request.build_absolute_uri(obj.cover.url)
        return None


class CategorySerializer(serializers.ModelSerializer):
    albums = AlbumListSerializer(many=True, read_only=True)
    album_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'album_count', 'albums']

    def get_album_count(self, obj):
        return obj.albums.filter(is_published=True).count()


class PhotoReorderSerializer(serializers.Serializer):
    """Used for reordering photos via drag & drop"""
    photos = serializers.ListField(
        child=serializers.DictField(
            child=serializers.IntegerField()
        )
    )
    # Expected format: [{"id": 1, "order": 0}, {"id": 2, "order": 1}, ...]