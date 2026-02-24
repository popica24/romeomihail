from rest_framework import serializers
from .models import Category, Album, CategoryCover, Photo


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


class CategoryCoverSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CategoryCover
        fields = ['id', 'image_url', 'title', 'order', 'is_active']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    

class CategorySerializer(serializers.ModelSerializer):
    covers = CategoryCoverSerializer(many=True, read_only=True)
    published_album_count = serializers.IntegerField(read_only=True)  # ✅ Removed source
    cover_url = serializers.CharField(read_only=True)  # ✅ Removed source

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'is_active', 'published_album_count', 'cover_url', 'covers']

class PhotoReorderSerializer(serializers.Serializer):
    """Used for reordering photos via drag & drop"""
    photos = serializers.ListField(
        child=serializers.DictField(
            child=serializers.IntegerField()
        )
    )
    # Expected format: [{"id": 1, "order": 0}, {"id": 2, "order": 1}, ...]
