from django.contrib import admin

from .models import *
# Register your models here.
admin.site.register(Category)
admin.site.register(Courses)
admin.site.register(Courses_media)
admin.site.register(Purchased_course)