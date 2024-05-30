from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

from .serializers import CourseSerializer, CourseMediaSerializer, PurchasedCourseSerializer

from .models import Courses, Category, Courses_media, Purchased_course


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
  
class PurchasedCourseViewSet(ModelViewSet):
  queryset = Purchased_course.objects.all()
  serializer_class = PurchasedCourseSerializer
  
  @action(detail=False, methods=['POST'])
  def subscribe(self, request):
    purchased_serialize = PurchasedCourseSerializer(data=request.data)
    
    if purchased_serialize.is_valid():
      
      try:
        Purchased_course.objects.get(**request.data)
        return Response({ "details": "The purchase already exists" }, status=400)
      except:
        purchased_serialize.save()
        return Response(purchased_serialize.data, status=201)
    else:
      return Response(purchased_serialize.errors, status=400)

class CourseMediaViewSet(ModelViewSet):
  queryset = Courses_media.objects.all()
  serializer_class = CourseMediaSerializer
  trailing_slash = False
  
  @action(detail=False, methods=['POST'])
  def create_media(self, request):
    
    serializer = CourseMediaSerializer(data=request.data)
    
    if serializer.is_valid():
      errors = {}
      
      try:
        validate = URLValidator()
        validate(request.data["url_video"])
      except ValidationError as err:
        errors["url_video"] = err
        
      try:
        validate = URLValidator()
        validate(request.data["url_cover"])
      except ValidationError as err:
        errors["url_cover"] = err
        
      if len(errors.keys()) > 0:
        return Response(errors, status=400)
      
      serializer.save()
      return Response(serializer.data, status=201)
      
    return Response(serializer.errors, status=400)