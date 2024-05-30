from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User

from .serializers import CourseSerializer

from .models import Courses, Category


# Create your views here.
class CourseViewSet(ModelViewSet):
  queryset = Courses.objects.select_related("user", "category")
  serializer_class = CourseSerializer
  trailing_slash = False
  
  def list(self, request):
    queryset = list(self.queryset.values())
    for course in queryset:
      user = User.objects.get(id=course["user_id"])
      category = Category.objects.get(id=course["category_id"])
      
      course["user"] = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
      }
      
      course["category"] = {
        "name": category.name
      }
      
      del course["user_id"]
      del course["category_id"]
      
    return Response(queryset)
  
  def retrieve(self, request, *args, **kwargs):
    obj = self.get_object()
    serializer = self.get_serializer(obj)
    course = serializer.data

    user = User.objects.get(id=course["user"])
    category = Category.objects.get(id=course["category"])
    
    course["user"] = {
      "id": user.id,
      "username": user.username,
      "email": user.email,
    }
    
    course["category"] = {
      "name": category.name
    }
    
    return Response(course)
  
  @action(detail=False, methods=['GET'])
  def buy_course(self, request):
    return Response({ "data": [] })