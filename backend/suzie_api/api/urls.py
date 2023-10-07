from api.views import NonProfitsViewSet, DrawingsViewSet
from django.urls import include, path
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'nonprofits', NonProfitsViewSet, basename="nonprofits")
router.register(r'drawings', DrawingsViewSet, basename="drawings")

urlpatterns = [
    path('', include(router.urls)),
]
