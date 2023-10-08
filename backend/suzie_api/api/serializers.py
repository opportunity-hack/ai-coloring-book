from rest_framework import serializers
from api.models import NonProfits, Drawings


class NonProfitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonProfits
        fields = '__all__'


class DrawingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawings
        fields = '__all__'

