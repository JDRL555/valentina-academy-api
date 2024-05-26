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
    return Response(queryset)
  
  @action(detail=False, methods=['GET'])
  def buy_course(self, request):
    return Response({ "data": [] })