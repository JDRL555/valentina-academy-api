from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from django.shortcuts import get_object_or_404

from .serializers import CourseSerializer

from .models import Courses

# Create your views here.
class CourseViewSet(ViewSet):
  queryset = Courses.objects.select_related("user", "category")
  serializer_class = CourseSerializer

  def list(self, request):
    serializer = CourseSerializer(self.queryset, many=True)
    
    return Response(serializer.data)
  
  def retrieve(self, request, pk=None):
    course = get_object_or_404(self.queryset, pk=pk)
    serializer = CourseSerializer(course)
    
    return Response(serializer.data)