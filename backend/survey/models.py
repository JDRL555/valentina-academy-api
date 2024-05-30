from mongoengine import Document, StringField, IntField, DateField, BooleanField, ReferenceField

import datetime

# Create your models here.
class Surveys(Document):
  title = StringField(required=True, max_length=50)
  description = StringField(max_length=100)
  course_id = IntField(required=True)
  created_at = DateField(default=datetime.datetime.now())
  
class Questions(Document):
  survey_id = ReferenceField(Surveys)
  question = StringField(max_length=300)
  is_correct = BooleanField(default=False)