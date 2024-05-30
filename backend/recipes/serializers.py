from rest_framework_mongoengine import serializers
from .models import Recipes,Ingredient_recipes,Ingredients

class IngredientSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'

class IngredientRecipeSerializer(serializers.DocumentSerializer):
    ingredient = IngredientSerializer(read_only=True)

    class Meta:
        model = Ingredient_recipes
        fields = '__all__'

class RecipeSerializer(serializers.DocumentSerializer):
    ingredient_recipes = IngredientRecipeSerializer(many=True, read_only=True)

    class Meta:
        model = Recipes
        fields = '__all__'