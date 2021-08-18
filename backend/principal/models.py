from django.db import models
from utils.models import BaseModel

class Pelicula(BaseModel):
    titulo = models.CharField(max_length=255, help_text="Titulo")
    subtitulo = models.CharField(max_length=255, help_text="subtitulo", blank=True, null=True)
    año = models.IntegerField(blank=True, null=True)
    duracion = models.CharField(max_length=255, blank=True, null=True, help_text="duracion")
    sinopsis = models.TextField(blank=True, null=True, help_text="sinopsis")
    reparto = models.CharField(max_length=255, blank=True, null=True, help_text="reparto")
    imagen = models.FileField(upload_to='bita_archivos', blank=True, null=True)
    triller = models.TextField(blank=True, null=True, help_text="triller")
    rutasp = (('PeliculasDetalle','PeliculasDetalle'),)
    ruta = models.CharField(max_length=240, choices = rutasp, default='PeliculasDetalle', blank=True, null=True)
    vistas = models.IntegerField(default = 0, blank=True, null=True)  
    carousel = models.BooleanField(help_text="carousel",default=False)
    imagen_carousel = models.FileField(upload_to='bita_archivos', blank=True, null=True)
    
    
    def __str__(self):
        """Return post title."""
        return '{}'.format(self.titulo, )

    class Meta:
        """Meta class."""
        db_table = 'principal_peliculas'
        ordering = ['-created', '-modified']

class Menu(BaseModel):
    nombre = models.CharField(max_length=240, blank=True, null=True)
    icono = models.CharField(max_length=240, default="local_movies", blank=True, null=True)
    rutas = (('home','home'),('MenusAdministrar','MenusAdministrar'))
    ruta = models.CharField(max_length=240, choices = rutas, default='MenusAdministrar', blank=True, null=True)
    menu_pelicula = models.ManyToManyField(
        Pelicula,
        through='MenuPelicula',
        through_fields=('menu', 'pelicula'),
    )

    def __str__(self):
        """Return post title."""
        return '{}'.format(self.nombre, )

class MenuPelicula(BaseModel):
    menu = models.ForeignKey(
        Menu,
        on_delete=models.CASCADE,
        related_name='mp_menu'
    )
    pelicula = models.ForeignKey(
        Pelicula,
        on_delete=models.CASCADE,
        related_name='mp_pelicula'
    )
    vistas = models.IntegerField(default = 0, blank=True, null=True)  
    
    def __str__(self):
        """Return post title."""
        return '{} - {}'.format(self.menu.nombre, self.pelicula.titulo )

    class Meta:
        """Meta class."""
        db_table = 'principal_menus_peliculas'

class Servidor(BaseModel):
    nombre = models.CharField(max_length=240, blank=True, null=True)
    servidor_pelicula = models.ManyToManyField(
        Pelicula,
        through='ServidorPelicula',
        through_fields=('servidor', 'pelicula'),
    )

    def __str__(self):
        """Return post title."""
        return '{}'.format(self.nombre, )

    class Meta:
        """Meta class."""
        db_table = 'principal_servidores'
        ordering = ['-created', '-modified']

class ServidorPelicula(BaseModel):
    servidor = models.ForeignKey(
        Servidor,
        on_delete=models.CASCADE,
        related_name='sp_servidor'
    )
    pelicula = models.ForeignKey(
        Pelicula,
        on_delete=models.CASCADE,
        related_name='sp_pelicula'
    )
    link = models.TextField(blank=True, null=True, help_text="link del embed")

    def __str__(self):
        """Return post title."""
        return '{} - {}'.format(self.servidor.nombre, self.pelicula.titulo )

    class Meta:
        """Meta class."""
        db_table = 'principal_servidores_peliculas'

class Busqueda(BaseModel):
    texto = models.CharField(max_length=240, blank=True, null=True)

    def __str__(self):
        """Return post title."""
        return '{}'.format(self.texto, )
    class Meta:
        """Meta class."""
        db_table = 'principal_busquedas'
        ordering = ['-created', '-modified']