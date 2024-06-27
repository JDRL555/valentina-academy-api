from rest_framework import permissions

class StudentPermission(permissions.BasePermission):
    def has_permission(self, request, view=None):
        return request.user.groups.filter(name='student').exists()

class TeacherPermission(permissions.BasePermission):
    def has_permission(self, request, view=None):
        return request.user.groups.filter(name='teacher').exists()

class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view=None):
        return request.user.groups.filter(name='admin').exists()