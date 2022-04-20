from django.urls import re_path

from . import consumers

websocket_urlspatterns = [
    re_path(r"ws/chat/(?P<user>[\w|\W]+)/$", consumers.ChatConsumer.as_asgi()),
]
