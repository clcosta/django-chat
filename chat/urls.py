from django.urls import path

from . import views

urlpatterns = [path("", views.ChatView.as_view()), path("return/", views.redirect_view)]
