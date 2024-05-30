from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import CourseViewSet, PurchasedCourseViewSet, CourseMediaViewSet

router = SimpleRouter()
router.register(r"courses", CourseViewSet)
router.register(r"purchased", PurchasedCourseViewSet)
router.register(r"courses_media", CourseMediaViewSet)

urlpatterns = [
  path("courses/subscribe/", PurchasedCourseViewSet.as_view({ "post": "subscribe" }), name="subscribe"),
  path("courses/create_media/", CourseMediaViewSet.as_view({ "post": "create_media" }), name="create_media")
] + router.urls