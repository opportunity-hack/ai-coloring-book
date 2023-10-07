from django.urls import path
# from .views.metarView import MetarView

urlpatterns = [
    path('', MetarView.as_view())
]