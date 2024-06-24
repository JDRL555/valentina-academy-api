from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import CourseViewSet, PurchasedCourseViewSet, CourseMediaViewSet, CategoryViewSet

router = SimpleRouter()
router.register(r"courses", CourseViewSet)
router.register(r"purchased", PurchasedCourseViewSet)
router.register(r"courses_media", CourseMediaViewSet)
router.register(r"category", CategoryViewSet)

urlpatterns = [
  path("courses/subscribe/", PurchasedCourseViewSet.as_view({ "post": "subscribe" }), name="subscribe"),
  path("courses/export_certificate/", CourseViewSet.as_view({ "post": "export_certificate" }), name="pdf"),
  path("courses/complete/", PurchasedCourseViewSet.as_view({ "post": "complete_course" }), name="complete")
] + router.urls