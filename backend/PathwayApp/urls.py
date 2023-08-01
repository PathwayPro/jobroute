from django.urls import path
from . import views

urlpatterns = [
    # path('example/', views.example_view, name='example-view'),
    path('example/', views.get_result, name='get_result'),


]
