from django.urls import path
from . import views

urlpatterns = [
    # path('example/', views.example_view, name='example-view'),
    path('example/', views.get_result, name='get_result'),
    path('', views.get_result, name='home'),
    # path('example/', views.get_NOC, name='get_NOC'),
    # path('example/', views.get_Education, name='get_Education'),


]
