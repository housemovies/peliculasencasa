from django.urls import include, path
from rest_framework.routers import DefaultRouter

from principal.views import UserViewGet, LoginView, LogoutView, MenuViewSet, MenuPeliculaViewSet, PeliculaViewSet

router = DefaultRouter()
router.register(r'menus', MenuViewSet, basename='menu')
router.register(r'peliculas', MenuPeliculaViewSet, basename='peliculas')
router.register(r'pelicula', PeliculaViewSet, basename='pelicula')
urlpatterns = [
    path('', include(router.urls))
]
