from django.urls import path
from . import views

app_name = 'path_finder'

urlpatterns = [
    path('', views.index, name='index')
]
