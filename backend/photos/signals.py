from django.dispatch import receiver
from django.db.models.signals import pre_save
from .models import Album, Photo, CategoryCover
from .utils import compress_image


@receiver(pre_save, sender=Album)
def compress_album_cover(sender, instance, **kwargs):
    """Compress album cover image before saving"""
    if instance.pk:
        try:
            old_instance = Album.objects.get(pk=instance.pk)
            # Only compress if cover changed
            if old_instance.cover != instance.cover and instance.cover:
                if not isinstance(instance.cover, str):
                    instance.cover = compress_image(
                        instance.cover,
                        quality=85,
                        max_width=1920,
                        max_height=1920
                    )
        except Album.DoesNotExist:
            pass
    else:
        # New instance - compress cover
        if instance.cover and not isinstance(instance.cover, str):
            instance.cover = compress_image(
                instance.cover,
                quality=85,
                max_width=1920,
                max_height=1920
            )


@receiver(pre_save, sender=Photo)
def compress_photo_image(sender, instance, **kwargs):
    """Compress photo image before saving"""
    if instance.pk:
        try:
            old_instance = Photo.objects.get(pk=instance.pk)
            # Only compress if image changed
            if old_instance.image != instance.image and instance.image:
                if not isinstance(instance.image, str):
                    instance.image = compress_image(
                        instance.image,
                        quality=88,  # Higher quality for portfolio photos
                        max_width=2400,
                        max_height=2400
                    )
        except Photo.DoesNotExist:
            pass
    else:
        # New instance - compress image
        if instance.image and not isinstance(instance.image, str):
            instance.image = compress_image(
                instance.image,
                quality=88,
                max_width=2400,
                max_height=2400
            )


@receiver(pre_save, sender=CategoryCover)
def compress_category_cover(sender, instance, **kwargs):
    """Compress category cover image before saving"""
    if instance.pk:
        try:
            old_instance = CategoryCover.objects.get(pk=instance.pk)
            # Only compress if image changed
            if old_instance.image != instance.image and instance.image:
                if not isinstance(instance.image, str):
                    instance.image = compress_image(
                        instance.image,
                        quality=85,
                        max_width=1920,
                        max_height=1920
                    )
        except CategoryCover.DoesNotExist:
            pass
    else:
        # New instance - compress image
        if instance.image and not isinstance(instance.image, str):
            instance.image = compress_image(
                instance.image,
                quality=85,
                max_width=1920,
                max_height=1920
            )