from rest_framework.decorators import api_view
from rest_framework_mongoengine import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Surveys, Answers, Questions, AnswersQuestion
from .serializers import SurveySerializer, QuestionSerializer, AnswersSerializer, AnswersQuestionSerializer 

from api.utils.mongo import connectToMongo 
from courses.models import Courses

import os

# Create your views here.

class SurveysViewSet(viewsets.ModelViewSet):
    queryset = Surveys.objects()
    serializer_class = SurveySerializer
class AnswersQuestionViewSet(viewsets.ModelViewSet):
    queryset = AnswersQuestion.objects()
    serializer_class = AnswersQuestionSerializer
class AnswersViewSet(viewsets.ModelViewSet):
    queryset = Answers.objects()
    serializer_class = AnswersSerializer

class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Questions.objects()
    serializer_class = QuestionSerializer





# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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