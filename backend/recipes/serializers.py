from rest_framework_mongoengine import serializers

from mongoengine import StringField

from .models import Recipes, Ingredients

class IngredientSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'

class RecipeIngredientSerializer(serializers.DocumentSerializer):
    name = StringField(source='ingredients.name')
    quantity = StringField(source='ingredient_quantity')

class RecipeSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Recipes
        fields = '__all__'


