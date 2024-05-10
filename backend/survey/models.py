from django.db import models

import datetime

# Create your models here.
class Surveys(models.Model):
  title = models.CharField(max_length=100)
  description = models.TextField()
  course_id = models.IntegerField()
  created_at = models.DateField(default=datetime.datetime.now())
  
class Questions(models.Model):
  survey_id = models.ForeignKey(Surveys, on_delete=models.CASCADE)
  question = models.CharField(max_length=100)
  is_correct = models.BooleanField(default=False)