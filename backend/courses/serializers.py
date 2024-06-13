from rest_framework import serializers
from .models import Courses, Category, Purchased_course, Courses_media

from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ["name"]

class CourseSerializer(serializers.ModelSerializer):
  category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=True)
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
  
  class Meta:
    model = Courses
    fields = [
      "id", "title", "description", "duration", "price", "user", "category", "recipe", "created_at"
    ]

class CourseMediaSerializer(serializers.ModelSerializer):
  course = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all(), required=True)
  
  class Meta:
    model = Courses_media
    fields = [
      "url_video", "url_cover", "course"
    ]
    
class PurchasedCourseSerializer(serializers.ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
  course = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all(), required=True)
  
  class Meta:
    model = Purchased_course
    fields = [
      "course", "user", "is_purchased", "completed", "purchased_at"
    ]
