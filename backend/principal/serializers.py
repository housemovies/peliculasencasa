from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from principal.models import Menu, MenuPelicula, Pelicula, ServidorPelicula
from django.conf import settings


class MenuSerializer(serializers.ModelSerializer):
    """Menu model serializer."""
    class Meta:
        """Meta class."""
        model = Menu
        fields = (
            'id',
            'nombre',
            'icono',
            'ruta'
        )

class PeliculaBasicoSerializer(serializers.ModelSerializer):
    """pelicula model serializer."""
    class Meta:
        """Meta class."""
        model = Pelicula
        fields = (
            'id',
            'titulo',
            'subtitulo',
            'ruta',
            'imagen',
        )


class MenuPeliculaSerializer(serializers.ModelSerializer):
    menu = MenuSerializer()
    pelicula = PeliculaBasicoSerializer()
    
    class Meta:
        model = MenuPelicula
        fields = (
            'id',
            'menu',
            'menu_id',
            'pelicula_id',
            'pelicula',
            'vistas'
        )
        read_only_fields = ('id',)



class MenuPeliculaBasicoSerializer(serializers.ModelSerializer):
    menu = MenuSerializer()
    # menu = serializers.SlugRelatedField(
    #     read_only=True,
    #     slug_field='nombre'
    # )
    class Meta:
        model = MenuPelicula
        fields = (
            'id',
            'menu',
            'menu_id'
        )
        read_only_fields = ('id',)

class ServidorPeliculaBasicoSerializer(serializers.ModelSerializer):
    # menu = MenuSerializer()
    servidor = serializers.SlugRelatedField(
        read_only=True,
        slug_field='nombre'
    )
    class Meta:
        model = ServidorPelicula
        fields = (
            'id',
            'servidor',
            'servidor_id',
            'link'
        )
        read_only_fields = ('id',)

class PeliculaSerializer(serializers.ModelSerializer):
    # imagen = serializers.FileField()
    imagen = serializers.SerializerMethodField('get_imagen', read_only=True)

    def get_imagen(self, obj):
        if obj.imagen != '':
            return '%s%s' % (settings.MEDIA_URL, obj.imagen)

    mp_pelicula = MenuPeliculaBasicoSerializer(many= True)
    sp_pelicula = ServidorPeliculaBasicoSerializer(many= True)
    """pelicula model serializer."""
    class Meta:
        """Meta class."""
        model = Pelicula
        fields = (
            'id',
            'titulo',
            'subtitulo',
            'ruta',
            'año',
            'duracion',
            'sinopsis',
            'reparto',
            'mp_pelicula',
            'sp_pelicula',
            'imagen',
            'triller',
            'imagen_carousel',
        )
































class GrupoPermissionsSerializer(serializers.ModelSerializer):
    permissions = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='codename'
    )

    class Meta:
        model = Group
        fields = "__all__"


class UserFindSerializer(serializers.ModelSerializer):
    user_permissions = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='codename'
    )
    groups = GrupoPermissionsSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'user_permissions', 'groups', 'username', 'first_name',
                  'last_name', 'email', 'is_superuser',)


class UserLoginSerializer(serializers.Serializer):
    """User login serializer.

    Handle the login request data.
    """

    def update(self, instance, validated_data):
        pass

    username = serializers.CharField()
    password = serializers.CharField(min_length=8, max_length=64)

    def validate(self, data):
        """Check credentials."""
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid credentials')
        self.context['user'] = user
        return data

    def create(self, data):
        """Generate or retrieve new token."""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key



