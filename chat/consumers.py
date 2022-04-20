import json
from urllib.parse import unquote

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):

        self.room_group_name = "chat"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.user = self.scope["url_route"]["kwargs"]["user"]
        self.accept()

        data = {
            "type": "log_message",
            "author": unquote(self.user.capitalize()),
            "online": True,
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            data,
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "log_message",
                "author": unquote(self.user.capitalize()),
                "online": False,
            },
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]
        author = data["author"]
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {"type": "send_message", "message": message, "author": author},
        )

    def send_message(self, evt):
        message = evt["message"]
        author = evt["author"]

        self.send(
            text_data=json.dumps(
                {"type": "send_message", "message": message, "author": author}
            )
        )

    def log_message(self, evt):
        author = evt["author"]
        self.send(
            text_data=json.dumps(
                {
                    "type": "log_message",
                    "author": author,
                    "message": "entrou" if evt["online"] else "saiu",
                }
            )
        )
