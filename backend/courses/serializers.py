from rest_framework import serializers
from .models import Courses, Category, Purchased_course, Courses_media

from users.serializers import UserSerializer


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ["name"]

class CourseSerializer(serializers.ModelSerializer):
  category = CategorySerializer(read_only=True)
  user = UserSerializer(read_only=True)
  
  class Meta:
    model = Courses
    fields = [
      "title", "description", "duration", "price", "user", "category", "recipe", "created_at"
    ]

class CourseMediaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Courses_media
    fields = [
      "url_video", "url_cover", "course"
    ]

    
class PurchasedCourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Purchased_course
    fields = [
      "course", "user", "is_purchased", "completed", "purchased_at"
    ]
