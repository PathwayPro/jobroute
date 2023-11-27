from django.urls import path
from . import views, summary,info,combinedSkills,cards

urlpatterns = [

    #Overview
    path('overview/', views.get_summary, name='summary'),

    #Info card with salary, degreem work type and language
    path('info/', views.get_info1, name='info'),

    #Soft and Hard skills
    path('combinedSkills/', views.get_combined_skills, name='combined_skills'),

    #Educationnal reqiurements
    path('education/', views.get_education, name='education'),

    #Regulated professoin check
    path('regulated/', views.get_regulation, name='regulated'),

    #Networking opportunities
    path('networking/', views.get_networking, name='networking'),

    #Get 5 related roles
    path('relatedRoles/', views.get_related_jobs, name='get_roles'),

    #Get 5 roles for keyword
    path('topRoles/', views.get_top_roles, name='top_roles'),

    #old unused APIs
    # path('overview/', summary.role_summary, name='summary'),
    # path('info/', info.get_info, name='info'),
    # path('combinedSkills/', combinedSkills.hardAndSoftSkills, name='combined_skills'),
    # path('education/', cards.get_Education, name='education'),
    # path('regulated/', cards.regulation_check, name='regulated'),
    # path('networking/', cards.get_networking, name='networking'),


    # path('salary/', info.get_salary, name='salary'),
    # path('degree/', info.get_degree, name='degree'),
    # path('hardSkills/', combinedSkills.get_hard_skills, name='hard_skills'),
    # path('softSkills/', combinedSkills.get_soft_skills, name='soft_skills'),
    # path('workType/', info.get_workType_info, name='workType'),
    # path('credentials/', info.credential_validation, name='credentials'),
    # path('languageReq/', info.language_req, name='language'),

]
