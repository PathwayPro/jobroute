from django.urls import path
from . import views, summary,info,combinedSkills,cards

urlpatterns = [
  
    path('overview/', summary.role_summary, name='summary'),
    path('info/', info.get_info, name='info'),
    path('cards/', cards.get_cards, name='cards'),
    path('combinedSkills/', combinedSkills.hardAndSoftSkills, name='combined_skills'),
    
    
    path('education/', cards.get_Education, name='education'),
    path('salary/', info.get_salary, name='salary'),
    path('degree/', info.get_degree, name='degree'),
    path('hardSkills/', combinedSkills.get_hard_skills, name='hard_skills'),
    path('softSkills/', combinedSkills.get_soft_skills, name='soft_skills'),
    path('workType/', info.get_workType_info, name='workType'),
    path('credentials/', info.credential_validation, name='credentials'),
    path('languageReq/', info.language_req, name='language'),
    path('networking/', cards.get_networking, name='networking'),
    path('experience/', cards.get_Experience, name='experience'),
    path('license/', cards.get_License, name='license'),
    path('regulated/', cards.regulation_check, name='regulated'),
    
]
