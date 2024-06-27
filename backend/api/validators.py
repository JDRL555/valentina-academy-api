from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS
from rolepermissions.checkers import has_permission,has_role
from .roles import Student,Teacher,Admin

class StudentPermission(permissions.BasePermission):
    def has_permission(self, request, view=None):
        if not request.user.is_authenticated:
            return False
        if not has_role(request.user, Student):
            return False
        if not has_permission(request.user, 'get_courses'):
            return False
        if not request.method in SAFE_METHODS:
            return False
        return True

class TeacherPermission(permissions.BasePermission):

    allowed_path = ["/courses/", "/courses_media/"]
    allowed_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    def has_permission(self, request, view=None):
        print(request.path)
        if not request.user.is_authenticated:
            return False
        
        if not has_role(request.user,Teacher):
            return False

        if request.path not in self.allowed_path and request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return False
        
        if request.method not in self.allowed_methods:
            return False
        return True 

class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view=None):
        if not request.user.is_authenticated:
            return False

        if not has_role(request.user, Admin):
            return False
        
        allowed_methods = {
            'GET': True,
            'POST': True,
            'PUT': True,
            'DELETE': True,
            'PATCH': True,
        }

        if request.method not in allowed_methods:
            return False
        return True
    