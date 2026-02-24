from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('categories', views.CategoryViewSet, basename='category')
router.register('albums', views.AlbumViewSet, basename='album')

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # ✅ Add /api/ prefix to router URLs
    path('api/', include(router.urls)),
    
    # Nested photo routes under albums
    path(
        'api/albums/<slug:album_slug>/photos/',
        views.PhotoViewSet.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='album-photos'
    ),
    path(
        'api/albums/<slug:album_slug>/photos/<int:pk>/',
        views.PhotoViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='album-photo-detail'
    ),
    path(
        'api/albums/<slug:album_slug>/photos/reorder/',
        views.PhotoViewSet.as_view({'post': 'reorder'}),
        name='album-photos-reorder'
    ),
    path(
        'api/albums/<slug:album_slug>/photos/bulk-upload/',
        views.PhotoViewSet.as_view({'post': 'bulk_upload'}),
        name='album-photos-bulk-upload'
    ),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
    urlpatterns += [path("__reload__/", include("django_browser_reload.urls"))]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)