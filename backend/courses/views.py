from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import CourseSerializer

from .models import Courses

# Create your views here.
class CourseViewSet(ModelViewSet):
  queryset = Courses.objects.select_related("user", "category")
  serializer_class = CourseSerializer
  
  @action(detail=False, methods=['GET'])
  def buy_course(self, request):
    return Response({ "data": [] })