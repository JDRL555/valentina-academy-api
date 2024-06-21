import cloudinary.uploader
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User
from django.http import HttpResponse

from django.db.models import Q

from jinja2 import Environment, FileSystemLoader

import pdfkit

import cloudinary

import os

from recipes.models import Recipes

from .serializers import CourseSerializer, CourseMediaSerializer, PurchasedCourseSerializer, CategorySerializer

from .models import Courses, Category, Courses_media, Purchased_course


from users.validators import is_admin 


# Create your views here.


class CourseViewSet(ModelViewSet):
  queryset = Courses.objects.select_related("user", "category", "media")
  serializer_class = CourseSerializer
  trailing_slash = False
  
  def create(self, request):
    serializer = CourseSerializer(data=request.data)
    
    if serializer.is_valid():
      try:
        Recipes.objects.get(id=request.data["recipe"])
      except Exception as error:
        print(error)
        return Response({ "error": "La receta no existe" }, status=404)
      
      serializer.save()
      return Response({ "course": serializer.data }, status=201)
    return Response(serializer.errors, status=400)
  
  def list(self, request):
    global queryset
    if request.query_params:
      filter_q = Q()
      for key, value in request.query_params.items():
        
        related_fields = { 
          "user": int, 
          "category": int, 
          "media": int, 
          "recipe": str 
        }
        
        if hasattr(Courses, key):
          if key in related_fields.keys():
            
            try:
              value = int(value)
            except:
              pass
            
            if type(value) == related_fields[key]:
              filter_q &= Q(**{key: value})
            else:
              return Response(
                { "error": f"El filtro {value} no coincide con el valor {related_fields[key]}" },
                status=400
              )
          else:
            filter_q &= Q(**{key: value[0]})
        else:
          return Response({ "error": "Columna no encontrada a filtrar" }, status=400)
        
      queryset = list(self.queryset.filter(filter_q).values())
    else:
      queryset = list(self.queryset.values())
      
    if len(queryset) == 0:
      return Response(queryset)

    for course in queryset:
      user = User.objects.get(id=course["user_id"])
      category = Category.objects.get(id=course["category_id"])
      media = Courses_media.objects.get(id=course["media_id"])
      recipe = Recipes.objects.get(id=course["recipe"])
      
      course["user"] = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
      }
      
      course["category"] = {
        "id": category.id,
        "name": category.name,
      }
      
      course["media"] = {
        "id": media.id,
        "url_cover": media.url_cover,
        "url_video": media.url_video,
      }
      
      course["recipe"] = {
        "id": str(recipe.id),
        "name": recipe.name,
        "description": recipe.description,
        "steps": recipe.steps,
        "ingredient": [
          { 
            "id": str(ingredient.id), 
            "name": ingredient.name 
          } for ingredient in recipe.ingredient
        ],
      }
      
      del course["user_id"]
      del course["category_id"]
      del course["media_id"]
      
    return Response(queryset)

  def retrieve(self, request, *args, **kwargs):
    obj = self.get_object()
    serializer = self.get_serializer(obj)
    course = serializer.data

    user = User.objects.get(id=course["user"])
    category = Category.objects.get(id=course["category"])
    media = Courses_media.objects.get(id=course["media"])
    recipe = Recipes.objects.get(id=course["recipe"])
    
    course["user"] = {
      "id": user.id,
      "username": user.username,
      "email": user.email,
    }
    
    course["category"] = {
      "id": category.id,
      "name": category.name
    }
    
    course["media"] = {
      "id": media.id,
      "url_cover": media.url_cover,
      "url_video": media.url_video,
    }
    
    course["recipe"] = {
      "id": str(recipe.id),
      "name": recipe.name,
      "description": recipe.description,
      "steps": recipe.steps,
      "ingredient": [
        { 
          "id": str(ingredient.id), 
          "name": ingredient.name 
        } for ingredient in recipe.ingredient
      ],
    }
    
    return Response(course)

  @action(detail=False, methods=['POST'])
  def export_certificate(self, request):
    datos = User.objects.all()

    current_dir = os.path.dirname(__file__)
    template_dir = os.path.join(current_dir,"template")

    config = pdfkit.configuration(wkhtmltopdf=r"C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe")

    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template("index_pdf.html")

    html = template.render({
      "datos" : datos
    })

    pdfkit.from_string(
      html,
      "certificado.pdf",
      configuration=config
    )

    return HttpResponse(content_type='application/pdf')

class PurchasedCourseViewSet(ModelViewSet):
  queryset = Purchased_course.objects.all()
  serializer_class = PurchasedCourseSerializer
  trailing_slash = False
  
  def list(self, request):
    global queryset
    if request.query_params:
      filter_q = Q()
      for key, value in request.query_params.items():
        
        related_fields = { 
          "user_id": int 
        }
        
        if hasattr(Purchased_course, key):
          if key in related_fields.keys():
            try:
              value = int(value)
            except:
              pass
            
            if type(value) == related_fields[key]:
              filter_q &= Q(**{key: value})
            else:
              return Response(
                { "error": f"El filtro {value} no coincide con el valor {related_fields[key]}" },
                status=400
              )
          else:
            filter_q &= Q(**{key: value[0]})
        else:
          return Response({ "error": "Columna no encontrada a filtrar" }, status=400)
        
      queryset = list(self.queryset.filter(filter_q).values())
    else:
      queryset = list(self.queryset.values())
      
    if len(queryset) == 0:
      return Response(queryset)
    
    for payment in queryset:
      course = Courses.objects.get(id=payment["course_id"])
      media = Courses_media.objects.get(id=course.media_id)
      
      payment["course"] = {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "price": course.price,
        "media": {
          "id": media.id,
          "url_cover": media.url_cover,
          "url_video": media.url_video,
        }
      }
      
      del payment["course_id"]
    
    return Response(queryset)
  
  @action(detail=False, methods=['POST'])
  def subscribe(self, request):
    global course
    global user
    
    errors = {}
    
    if not request.data.get("course"): 
      errors["course"] = "El id del curso es requerido"
    
    if not request.data.get("user"):
      errors["user"] = "El id del usuario es requerido"
      
    if len(errors.keys()) != 0:
      return Response(errors, status=400)
    
    try:
      user = User.objects.get(id=request.data["user"])
    except:
      return Response({ "error": "Usuario no encontrado" }, status=404)
    
    try:
      course = Courses.objects.get(id=request.data["course"])
    except:
      return Response({ "error": "Curso no encontrado" }, status=404)
    
    try:
      Purchased_course.objects.get(course_id=course.id, user_id=user.id)
      return Response({ "error": "La compra ya existe" }, status=400)
    except:
      purchased_serialize = self.serializer_class(data=request.data)
      purchased_serialize.is_valid(raise_exception=True)
      purchased_serialize.save()
      return Response(purchased_serialize.data, status=201)
    
  @action(detail=False, methods=['POST'])
  def complete_course(self, request):
    
    global course
    global purchased
    
    errors = {}
    
    if not request.data.get("course_id"): 
      errors["course_id"] = "El id del curso es requerido"
    
    if not request.data.get("user_id"):
      errors["user_id"] = "El id del usuario es requerido"
      
    if len(errors.keys()) != 0:
      return Response(errors, status=400)
    
    try:
      course = Courses.objects.get(id=request.data["course_id"])
    except:
      return Response({ "error": "Curso no encontrado" }, status=404)
    
    try:
      purchased = Purchased_course.objects.get(course=course.id, user=request.data["user_id"])
    except:
      return Response({ "error": "Compra no encontrada" }, status=404)
    
    if not purchased.is_purchased:
      return Response({ "error": "El curso debe ser comprado" }, status=401)
    
    if purchased.completed:
      return Response({ "error": "El curso ya esta completado" }, status=401)
    
    serializer = self.serializer_class(purchased, data={ "completed": True }, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response({ "purchased": serializer.data })
    
class CourseMediaViewSet(ModelViewSet):
  queryset = Courses_media.objects.all()
  serializer_class = CourseMediaSerializer
  trailing_slash = False
  
  @action(detail=False, methods=['POST'])
  def create_media(self, request):
    
    cover = request.FILES.get("cover")
    video = request.FILES.get("video")
    
    global cover_response
    global video_response
    
    try:
      cover_response = cloudinary.uploader.upload(file=cover, resource_type='image')
      video_response = cloudinary.uploader.upload(file=video, resource_type='video')
    except Exception as err:
      return Response({ "error": f"ERROR: {err}" }, status=400)
    
    serializer = CourseMediaSerializer(data={
      "url_cover": cover_response["secure_url"],
      "url_video": video_response["secure_url"],
    })
    
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class CategoryViewSet(ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  trailing_slash = False