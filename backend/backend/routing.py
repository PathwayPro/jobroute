# routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from . import consumers

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('ws/results/', consumers.ResultConsumer.as_asgi()),
        # Add more WebSocket paths if needed
    ]),
})
