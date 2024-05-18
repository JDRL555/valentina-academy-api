from rest_framework_mongoengine import serializers
from .models import Surveys, Questions

class SurveySerializer(serializers.DocumentSerializer):
  class Meta:
    model = Surveys
    fields = ["title", "description", "course_id", "created_at"]
    
class QuestionSerializer(serializers.DocumentSerializer):
  class Meta:
    model = Questions
    fields = ["survey_id", "question", "is_correct"]