from django.db import models

# Create your models here.
class Jobroute(models.Model):
    '''
    Model for fields that would be stored in the database
    All fields must be nullable to ensure random filling of fields
    '''
    title = models.CharField(null=True,max_length=255)
    province = models.CharField(null=True,max_length=255)
    NOC = models.TextField(null=True)
    overview = models.TextField(null=True)
    educational_requirement = models.TextField(null=True)
    skills = models.TextField(null=True)
    networking = models.TextField(null=True)
    info = models.TextField(null=True)
    qualification = models.TextField(null=True)
    #upskilling = models.TextField()

    class Meta:
        unique_together = (('title', 'province'))

    # def __str__(self):
    #     return self.field1