from django.contrib import admin

from .models import Pelicula, Menu, MenuPelicula, Busqueda, ServidorPelicula, Servidor

class MenuInlineAdmin(admin.TabularInline):
    model = MenuPelicula
    extra = 1
    
class ServidorInlineAdmin(admin.TabularInline):
    model = ServidorPelicula
    extra = 1

class PeliculaAdmin(admin.ModelAdmin):
    list_display=('titulo','subtitulo')
    list_filter = ('carousel',)
    search_fields = ("titulo", )
    inlines = (MenuInlineAdmin, ServidorInlineAdmin)


class MenuAdmin(admin.ModelAdmin):
    list_display=('nombre',)
    list_filter = ('nombre',)
    search_fields = ("nombre", )

# class MenuPeliculaAdmin(admin.ModelAdmin):
#     model = Menu
#     raw_id_fields = ('pelicula','menu')


admin.site.register(Menu, MenuAdmin)
# admin.site.register(MenuPelicula, MenuPeliculaAdmin)
admin.site.register(Pelicula, PeliculaAdmin)
admin.site.register(Busqueda)
admin.site.register(Servidor)