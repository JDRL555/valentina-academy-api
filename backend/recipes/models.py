from django.db import models

import datetime

# Create your models here.
class Recipes(models.Model):
  name = models.CharField(max_length=200)
  description = models.TextField(max_length=250)
  created_at = models.DateField(default=datetime.datetime.now())

class Ingredients(models.Model):
  name = models.CharField(max_length=200)

class Ingredient_recipes(models.Model):
  recipe_id = models.ForeignKey(Recipes, on_delete=models.CASCADE)
  ingredient_id = models.ForeignKey(Ingredients, on_delete=models.CASCADE)
  ingredient_quantity = models.IntegerField()