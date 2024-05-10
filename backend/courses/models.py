from django.db import models
from django.contrib.auth.models import User

import datetime

# Create your models here.

class Category(models.Model):
  name = models.CharField(max_length=200)

class Courses(models.Model):
  title = models.CharField(max_length=200)
  description = models.TextField(max_length=250)
  duration = models.IntegerField()
  price = models.DecimalField(max_digits=20, decimal_places=20)
  user_id = models.ForeignKey(User, on_delete=models.CASCADE)
  category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
  recipe = models.CharField(max_length=500, null=True)
  created_at = models.DateField(default=datetime.datetime.now())
  
class Courses_media(models.Model):
  url_video = models.TextField(max_length=800)
  url_cover = models.TextField(max_length=800)
  course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)
  
class Purchased_course(models.Model):
  course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)
  user_id = models.ForeignKey(User, on_delete=models.CASCADE)
  is_purchased = models.BooleanField(default=False)
  completed = models.BooleanField()
  purchased_at = models.DateField(default=datetime.datetime.now())