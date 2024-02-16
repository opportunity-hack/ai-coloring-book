from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

from rest_framework import serializers
from api.models import NonProfits, Drawings, Sponsors, Books, User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.conf import settings
UserModel = get_user_model()


class NonProfitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonProfits
        fields = '__all__'


class DrawingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawings
        fields = '__all__'


class SponsorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsors
        fields = '__all__'


class BooksSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Books
        fields = ['id', 'name', 'about', 'cover_url', 'url', 'sponsors', 'current_sponsors', 'total_sponsors', 'is_published', 'created_on', 'modified_on', 'drawings']
        


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password',
            'role'
        )

    def create(self, validated_data):
        auth_user = User.objects.create_user(**validated_data)
        return auth_user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)

    def create(self, validated_date):
        pass

    def update(self, instance, validated_data):
        pass

    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            update_last_login(None, user)

            validation = {
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email,
                'role': user.role,
            }

            return validation
        except settings.AUTH_USER_MODEL.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = (
            'email',
            'role'
        )


class DrawingsGetSerializer(serializers.ModelSerializer):
    selected = serializers.BooleanField(source='use_ai', read_only=True)
    url = serializers.CharField(source='ai_creative_url')
    useAI = serializers.BooleanField(source='use_ai')

    class Meta:
        model = Drawings  # Replace with your actual model
        fields = ['id', 'selected', 'subject', 'school', 'created_by', 'url', 'useAI', 'is_active', 'created_on', 'modified_on']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_on'] = instance.created_on.strftime("%Y-%m-%d")
        representation['modified_on'] = instance.modified_on.strftime("%Y-%m-%d")
        representation['selected'] = False
        return representation
