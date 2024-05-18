from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from django.contrib.auth.models import User

from .serializers import UserSerializer

@api_view(['POST'])
def login(request):
  global user
  
  try:
    user = User.objects.get(username=request.data['username'])
  except:
    return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)
  
  if not user.check_password(request.data['password']):
    return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
  
  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer(instance=user)

  return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
  serializer = UserSerializer(data=request.data)
  
  if serializer.is_valid():
    serializer.save()
    
    user = User.objects.get(username=serializer.data['username'])
    user.set_password(serializer.data['password'])
    user.save()
    
    token = Token.objects.create(user=user)
    return Response({'token': token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
  
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_users(request):
  users = User.objects.all()
  return Response({'users': users})

@api_view(['GET'])
def user_id(request, id):
    try:
        user_id = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    serializador = UserSerializer(user_id)
    return Response(serializador.data)

def is_user_active(user_id): # Aqui tienes que cambiar el status del usuario, no devolver su estado
    try:
        user = User.objects.get(pk=user_id)
        return user.is_active
    except User.DoesNotExist:
        return False

