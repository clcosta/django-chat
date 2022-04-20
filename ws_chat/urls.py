from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("pages.urls"), name="pages"),
    path("chat/", include("chat.urls"), name="chat"),
]
