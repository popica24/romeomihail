import json
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from adminsortable2.admin import SortableAdminMixin, SortableTabularInline, SortableAdminBase
from .models import Category, CategoryCover, Album, Photo
from django.urls import path
from django.http import JsonResponse
from django.conf import settings

def thumbnail(url, size=14):
    if not url:
        return mark_safe(
            f'<div class="avatar placeholder">'
            f'<div class="bg-neutral text-neutral-content w-{size} h-{size} rounded-lg">'
            f'<i class="fa-solid fa-image opacity-30"></i></div></div>'
        )
    return format_html(
        '<div class="avatar"><div class="w-{} h-{} rounded-lg">'
        '<img src="{}" style="object-fit:cover;" /></div></div>',
        size, size, url,
    )

def badge(label, css_class="badge-ghost", icon=None):
    icon_html = f'<i class="fa-solid fa-{icon} text-xs"></i>' if icon else ""
    return mark_safe(
        f'<span class="badge {css_class} gap-1">{icon_html}{label}</span>'
    )


# ─── Category Cover Inline ────────────────────────────────────────────────────

class CategoryCoverInline(SortableTabularInline):
    model = CategoryCover
    extra = 1
    fields = ["order", "preview", "image", "title", "is_active"]
    readonly_fields = ["preview"]
    ordering = ["order"]
    verbose_name = "Copertă"
    verbose_name_plural = "🖼️ Coperți Categorie — trage pentru reordonare"

    def preview(self, obj):
        return thumbnail(obj.image.url if obj.image else None, size=16)

    preview.short_description = "Preview"


# ─── Category Admin ───────────────────────────────────────────────────────────

@admin.register(Category)
class CategoryAdmin(SortableAdminBase, admin.ModelAdmin):
    list_display = ["name", "slug", "cover_thumb", "album_count_badge", "is_active", "created_at"]
    list_editable = ["is_active"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]
    inlines = [CategoryCoverInline]

    fieldsets = (
        ("📋 Informații de bază", {
            "fields": ("name", "slug", "description", "is_active"),
        }),
    )

    @admin.display(description="Copertă")
    def cover_thumb(self, obj):
        return thumbnail(obj.cover_url, size=14)

    @admin.display(description="Albume publicate")
    def album_count_badge(self, obj):
        count = obj.albums.filter(is_published=True).count()
        css = "badge-success" if count > 0 else "badge-ghost"
        return badge(f"{count} albume", css, "images")


# ─── Category Cover Admin ─────────────────────────────────────────────────────

@admin.register(CategoryCover)
class CategoryCoverAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = [
        "preview_thumb",
        "category",
        "title",
        "order",
        "is_active",
        "created_at",
    ]
    list_filter = ["category", "is_active"]
    list_editable = ["order", "is_active"]
    search_fields = ["category__name", "title"]
    readonly_fields = ["preview_large"]

    fieldsets = (
        ("🖼️ Copertă", {
            "fields": ("category", "image", "preview_large", "title"),
        }),
        ("⚙️ Setări", {
            "fields": ("order", "is_active"),
        }),
    )

    @admin.display(description="Preview")
    def preview_thumb(self, obj):
        return thumbnail(obj.image.url if obj.image else None, size=14)

    @admin.display(description="Preview mare")
    def preview_large(self, obj):
        if obj.image:
            return format_html(
                '<div class="card w-fit shadow-xl mt-2"><figure>'
                '<img src="{}" style="max-height:300px;max-width:500px;object-fit:cover;" />'
                '</figure></div>',
                obj.image.url,
            )
        return mark_safe(
            '<div class="alert alert-info mt-2">'
            '<i class="fa-solid fa-circle-info"></i>'
            '<span>Nicio imagine încărcată încă.</span></div>'
        )


# ─── Album Admin ──────────────────────────────────────────────────────────────

@admin.register(Album)
class AlbumAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = [
        "cover_thumb", "name", "category", "date",
        "location", "photo_count_badge", "published_badge",
        "updated_at", "is_published",
    ]
    list_filter = ["category", "is_published", "date"]
    search_fields = ["name", "description", "location"]
    prepopulated_fields = {"slug": ("name",)}
    list_editable = ["is_published"]
    date_hierarchy = "date"
    readonly_fields = ["cover_preview"]
    fieldsets = (
        ("📋 Informații de bază", {
            "fields": ("name", "slug", "category", "date", "location", "description"),
        }),
        ("🖼️ Copertă album", {
            "fields": ("cover", "cover_preview"),
            "description": "Fotografia principală afișată în catalog.",
        }),
        ("🔍 SEO", {
            "fields": ("meta_title", "meta_description"),
            "classes": ("collapse",),
        }),
        ("⚙️ Setări", {
            "fields": ("is_published", "order"),
        }),
    )

    def get_urls(self):
        urls = super().get_urls()
        custom = [
            path(
                "<int:album_id>/photos/upload/",
                self.admin_site.admin_view(self.upload_photos_view),
                name="photos_album_upload",
            ),
            path(
                "<int:album_id>/photos/reorder/",
                self.admin_site.admin_view(self.reorder_photos_view),
                name="photos_album_reorder",
            ),
            path(
                "photos/<int:photo_id>/delete/",
                self.admin_site.admin_view(self.delete_photo_view),
                name="photos_photo_delete",
            ),
            path(
                "photos/<int:photo_id>/feature/",
                self.admin_site.admin_view(self.feature_photo_view),
                name="photos_photo_feature",
            ),
        ]
        return custom + urls

    def upload_photos_view(self, request, album_id):
        if request.method != "POST":
            return JsonResponse({"error": "POST only"}, status=405)

        album = Album.objects.get(pk=album_id)
        uploaded = []
        files = request.FILES.getlist("images")

        for i, f in enumerate(files):
            last_order = album.photos.order_by("-order").values_list("order", flat=True).first() or 0
            photo = Photo(album=album, image=f, order=last_order + i + 1)
            photo.save()
            uploaded.append({
                "id": photo.pk,
                "url": photo.image.url,
                "order": photo.order,
                "is_featured": photo.is_featured,
                "caption": photo.caption,
            })

        return JsonResponse({"uploaded": uploaded})

    def reorder_photos_view(self, request, album_id):
        if request.method != "POST":
            return JsonResponse({"error": "POST only"}, status=405)

        data = json.loads(request.body)
        order_map = data.get("order", [])

        for item in order_map:
            Photo.objects.filter(pk=item["id"], album_id=album_id).update(order=item["order"])

        return JsonResponse({"ok": True})

    def delete_photo_view(self, request, photo_id):
        if request.method != "POST":
            return JsonResponse({"error": "POST only"}, status=405)

        photo = Photo.objects.get(pk=photo_id)
        photo.delete()
        return JsonResponse({"ok": True})

    def feature_photo_view(self, request, photo_id):
        if request.method != "POST":
            return JsonResponse({"error": "POST only"}, status=405)

        photo = Photo.objects.get(pk=photo_id)
        photo.is_featured = not photo.is_featured
        photo.save(update_fields=["is_featured"])
        return JsonResponse({"ok": True, "is_featured": photo.is_featured})

    def change_view(self, request, object_id, form_url="", extra_context=None):
        extra_context = extra_context or {}
        if object_id:
            album = Album.objects.prefetch_related("photos").get(pk=object_id)
            photos = list(album.photos.order_by("order", "uploaded_at").values(
                "id", "image", "order", "is_featured", "caption"
            ))
            media_url = settings.MEDIA_URL
            for p in photos:
                p["url"] = media_url + p["image"]
                del p["image"]
            extra_context["photo_grid_data"] = json.dumps(photos)
            extra_context["album_id"] = object_id
        return super().change_view(request, object_id, form_url, extra_context)

    @admin.display(description="")
    def cover_thumb(self, obj):
        return thumbnail(obj.cover_url, size=14)

    @admin.display(description="Foto")
    def photo_count_badge(self, obj):
        count = obj.photo_count
        css = "badge-primary" if count > 0 else "badge-ghost"
        return badge(str(count), css, "camera")

    @admin.display(description="Status")
    def published_badge(self, obj):
        if obj.is_published:
            return badge("Publicat", "badge-success", "eye")
        return badge("Draft", "badge-ghost", "eye-slash")

    @admin.display(description="Preview copertă")
    def cover_preview(self, obj):
        if obj.cover:
            return format_html(
                '<div class="card w-fit shadow-xl mt-2"><figure>'
                '<img src="{}" style="max-height:300px;max-width:500px;object-fit:cover;" />'
                '</figure></div>',
                obj.cover.url,
            )
        return mark_safe(
            '<div class="alert alert-info mt-2">'
            '<i class="fa-solid fa-circle-info"></i>'
            '<span>Nicio copertă încărcată încă.</span></div>'
        )


# ─── Photo Admin ──────────────────────────────────────────────────────────────

@admin.register(Photo)
class PhotoAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = [
        "thumb", "album", "order", "caption",
        "dims_badge", "size_badge", "featured_badge", "uploaded_at", "is_featured",
    ]
    list_filter = ["album__category", "album", "is_featured"]
    search_fields = ["album__name", "caption", "alt_text"]
    list_editable = ["order", "caption", "is_featured"]
    list_select_related = ["album"]
    readonly_fields = ["preview_large", "width", "height", "file_size", "uploaded_at"]

    fieldsets = (
        ("🖼️ Fotografie", {"fields": ("album", "image", "preview_large")}),
        ("📝 Detalii", {"fields": ("caption", "alt_text", "is_featured", "order")}),
        ("📊 Metadata", {
            "fields": ("width", "height", "file_size", "uploaded_at"),
            "classes": ("collapse",),
        }),
    )

    @admin.display(description="Preview")
    def thumb(self, obj):
        return thumbnail(obj.image.url if obj.image else None, size=14)

    @admin.display(description="Preview mare")
    def preview_large(self, obj):
        if obj.image:
            return format_html(
                '<div class="card w-fit shadow-xl mt-2"><figure>'
                '<img src="{}" style="max-height:400px;max-width:600px;object-fit:cover;" />'
                '</figure></div>',
                obj.image.url,
            )
        return "—"

    @admin.display(description="Dimensiuni")
    def dims_badge(self, obj):
        if obj.width and obj.height:
            return badge(f"{obj.width} × {obj.height}", "badge-ghost")
        return "—"

    @admin.display(description="Mărime")
    def size_badge(self, obj):
        if obj.file_size:
            mb = round(obj.file_size / 1024 / 1024, 1)
            css = "badge-success" if mb < 5 else "badge-warning"
            return badge(f"{mb} MB", css)
        return "—"

    @admin.display(description="Featured")
    def featured_badge(self, obj):
        if obj.is_featured:
            return badge("Featured", "badge-warning", "star")
        return mark_safe('<span class="badge badge-ghost text-xs">—</span>')