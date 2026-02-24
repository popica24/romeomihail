from django.db import models
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from PIL import Image as PilImage
import os


def validate_image_size(image):
    """Max 20MB per image"""
    max_size = 20 * 1024 * 1024
    if image.size > max_size:
        raise ValidationError(f"Imaginea nu poate depăși 20MB. Dimensiunea curentă: {image.size / 1024 / 1024:.1f}MB")


def album_cover_path(instance, filename):
    ext = filename.rsplit('.', 1)[-1].lower()
    return f'albums/{instance.slug}/cover/cover.{ext}'


def photo_upload_path(instance, filename):
    ext = filename.rsplit('.', 1)[-1].lower()
    return f'albums/{instance.album.slug}/photos/{instance.order:04d}.{ext}'


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Ex: Nuntă, Botez, Cununie Civilă"
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
        help_text="Auto-generat din nume. Ex: nunta, botez"
    )
    description = models.TextField(
        blank=True,
        help_text="Descriere scurtă a categoriei"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Dezactivează pentru a ascunde categoria din site"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Categorie"
        verbose_name_plural = "Categorii"
        db_table = "category"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Album(models.Model):
    name = models.CharField(
        max_length=200,
        help_text="Ex: Andrei & Maria, Botez Sofia"
    )
    slug = models.SlugField(
        unique=True,
        blank=True,
        help_text="Auto-generat din nume. Ex: andrei-maria"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="albums",
        help_text="Categoria albumului"
    )
    date = models.DateField(
        help_text="Data evenimentului"
    )
    location = models.CharField(
        max_length=200,
        blank=True,
        help_text="Ex: București, Sala Palatului"
    )
    description = models.TextField(
        blank=True,
        help_text="Descriere scurtă a evenimentului"
    )

    cover = models.ImageField(
        upload_to=album_cover_path,
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(['jpg', 'jpeg', 'png', 'webp']),
            validate_image_size,
        ],
        help_text="Fotografia de copertă a albumului (max 20MB)"
    )

    meta_title = models.CharField(
        max_length=60,
        blank=True,
        help_text="Titlu SEO (max 60 caractere). Lăsați gol pentru a folosi numele albumului."
    )
    meta_description = models.CharField(
        max_length=160,
        blank=True,
        help_text="Descriere SEO (max 160 caractere)"
    )

    is_published = models.BooleanField(
        default=False,
        help_text="Bifați pentru a face albumul vizibil pe site"
    )
    
    order = models.PositiveIntegerField(
        default=0,
        db_index=True,
        help_text="Ordinea de afișare în catalog (0 = primul)"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Album"
        verbose_name_plural = "Albume"
        db_table = "album"
        ordering = ["order", "-date"]
        indexes = [
            models.Index(fields=["is_published", "category"]),
            models.Index(fields=["order", "-date"]),
            models.Index(fields=["slug"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        if not self.meta_title:
            self.meta_title = self.name[:60]

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category} | {self.name} ({self.date.year})"

    def delete(self, *args, **kwargs):
        """Delete cover image file when album is deleted"""
        if self.cover:
            if os.path.isfile(self.cover.path):
                os.remove(self.cover.path)
        super().delete(*args, **kwargs)

    @property
    def photo_count(self):
        return self.photos.count()

    @property
    def cover_url(self):
        if self.cover:
            return self.cover.url
        first_photo = self.photos.first()
        if first_photo:
            return first_photo.image.url
        return None

    @property
    def get_meta_title(self):
        return self.meta_title or self.name

    @property
    def get_meta_description(self):
        return self.meta_description or self.description[:160] or f"Album foto {self.name}"


class Photo(models.Model):
    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name="photos"
    )
    image = models.ImageField(
        upload_to=photo_upload_path,
        validators=[
            FileExtensionValidator(['jpg', 'jpeg', 'png', 'webp']),
            validate_image_size,
        ],
        help_text="Format acceptat: JPG, PNG, WebP. Max 20MB."
    )
    caption = models.CharField(
        max_length=255,
        blank=True,
        help_text="Descriere scurtă a fotografiei (opțional)"
    )
    alt_text = models.CharField(
        max_length=255,
        blank=True,
        help_text="Text alternativ pentru accesibilitate și SEO"
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Marchează fotografia ca featured (afișată în preview)"
    )

    order = models.PositiveIntegerField(
        default=0,
        db_index=True,
        help_text="Ordinea de afișare în album (drag & drop în admin)"
    )

    width = models.PositiveIntegerField(
        null=True,
        blank=True,
        editable=False,
        help_text="Auto-populated on upload"
    )
    height = models.PositiveIntegerField(
        null=True,
        blank=True,
        editable=False,
        help_text="Auto-populated on upload"
    )
    file_size = models.PositiveIntegerField(
        null=True,
        blank=True,
        editable=False,
        help_text="File size in bytes, auto-populated on upload"
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Fotografie"
        verbose_name_plural = "Fotografii"
        db_table = "photo"
        ordering = ["order", "uploaded_at"]
        indexes = [
            models.Index(fields=["album", "order"]),
            models.Index(fields=["is_featured"]),
        ]

    def save(self, *args, **kwargs):
        if self.image and not self.width:
            try:
                img = PilImage.open(self.image)
                self.width, self.height = img.size
                self.file_size = self.image.size
            except Exception:
                pass

        if not self.alt_text:
            self.alt_text = f"Fotografie {self.order + 1} din albumul {self.album.name}"

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """Delete image file from disk when photo is deleted"""
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"#{self.order} — {self.album.name}"

