from django.shortcuts import redirect
from django.views.generic import TemplateView


class ChatView(TemplateView):

    template_name = "chat/chat.html"


def redirect_view(request):
    response = redirect("/")
    return response
