# routing.py
from django.urls import path
from PathwayApp.consumers import ResultConsumer


websocket_urlpatterns = [
    path('ws/result/', ResultConsumer.as_asgi()),
]
