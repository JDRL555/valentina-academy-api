from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .serializers import CourseSerializer

from .models import Courses

# Create your views here.
class CourseListView(ViewSet):
  queryset = Courses.objects.select_related("user", "category")
  serializer_class = CourseSerializer

  def list(self, request):
    courses = Courses.objects.select_related("user", "category")
    serializer = CourseSerializer(courses, many=True)
    
    return Response(serializer.data)