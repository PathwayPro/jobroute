from django.urls import path
from . import views

urlpatterns = [
  
    path('overview/', views.role_summary, name='summary'),
    path('info/', views.get_info, name='info'),
    path('cards/', views.get_cards, name='cards'),
    path('combinedSkills/', views.hardAndSoftSkills, name='combined_skills'),
    
    
    path('education/', views.get_Education, name='education'),
    path('salary/', views.get_salary, name='salary'),
    path('degree/', views.get_degree, name='degree'),
    path('hardSkills/', views.get_hard_skills, name='hard_skills'),
    path('softSkills/', views.get_soft_skills, name='soft_skills'),
    path('workType/', views.get_workType_info, name='workType'),
    path('credentials/', views.credential_validation, name='credentials'),
    path('languageReq/', views.language_req, name='language'),
    path('networking/', views.get_networking, name='networking'),
    path('experience/', views.get_Experience, name='experience'),
    path('license/', views.get_License, name='license'),
    path('regulated/', views.regulation_check, name='regulated'),
    
]
