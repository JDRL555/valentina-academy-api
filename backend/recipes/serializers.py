from rest_framework_mongoengine import serializers
from .models import Recipes,Ingredient_recipes,Ingredients

class IngredientSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'


class RecipeSerializer(serializers.DocumentSerializer):

    class Meta:
        model = Recipes
        fields = '__all__'

class IngredientRecipeSerializer(serializers.DocumentSerializer):

    class Meta:
        model = Ingredient_recipes
        fields = "__all__"