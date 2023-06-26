from django.db import models

# Create your models here.
class ExampleModel(models.Model):
    field1 = models.CharField(max_length=100)
    field2 = models.TextField()

    def __str__(self):
        return self.field1