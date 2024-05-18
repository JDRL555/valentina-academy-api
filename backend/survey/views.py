from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Surveys

from .serializers import SurveySerializer

from api.utils.mongo import connectToMongo 
from courses.models import Courses

import os

# Create your views here.

@api_view(["GET"])
def get_surveys(request):
  try:
    connectToMongo(
      db=os.environ.get("MONGO_DB_NAME"),
      host=os.environ.get("MONGO_DB_HOST"),
      port=int(os.environ.get("MONGO_DB_PORT")),
    )
  except Exception as err:
    return Response({ "error": f"Error trying to connect with db: {err}" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
  surveys = Surveys.objects()
  return Response({ "surveys": surveys })

@api_view(['POST'])
def create_survey(request):
  try:
    try:
      connectToMongo(
        db=os.environ.get("MONGO_DB_NAME"),
        host=os.environ.get("MONGO_DB_HOST"),
        port=int(os.environ.get("MONGO_DB_PORT")),
      )
    except Exception as err:
      return Response({ "error": f"Error trying to connect with db: {err}" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    serializer = SurveySerializer(data=request.data)
    global course
    
    try:
      course = Courses.objects.get(id=int(request.data["course_id"]))
    except:
      return Response({ "msg": "Course doesn't not exists" }, status=status.HTTP_400_BAD_REQUEST)
    
    if serializer.is_valid():
      serializer.save()
      
      return Response({ "msg": "Survey created successfully!", "survey": request.data }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_201_CREATED)
    
  except Exception as err:
    return Response({ "error": f"There was an error: {err}" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)