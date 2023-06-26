from django.shortcuts import render
from django.http import JsonResponse
from .models import ExampleModel

def example_view(request):
    data = ExampleModel.objects.all().values()
    return JsonResponse(list(data), safe=False)
