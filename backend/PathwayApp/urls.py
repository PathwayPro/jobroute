from django.urls import path
from . import views

urlpatterns = [
    # path('example/', views.example_view, name='example-view'),
    path('example/', views.get_result, name='get_result'),
    # path('', views.get_result, name='home'),
    # path('', views.get_NOC, name='home'),
    path('', views.websocket_check, name='home'),
    # path('', views.hardAndSoftSkills, name='home'),
    # path('example/', views.get_NOC, name='get_NOC'),
    # path('example/', views.get_Education, name='get_Education'),
    path('overview/', views.role_summary, name='summary'),
    # path('info/', views.get_Education, name='get_Education'),
    # path('skills/', views.get_Education, name='get_Education'),
    # path('education/', views.get_Education, name='get_Education'),
    # path('experience/', views.get_Education, name='get_Education'),
    # path('networking/', views.get_Education, name='get_Education'),


]
