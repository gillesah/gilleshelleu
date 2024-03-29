"""
URL configuration for gilleshelleu project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from gh import views
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('projets/', views.liste_projets, name='liste_projets'),
    path('articles/<slug:slug>/', views.post_single, name='list_articles'),
    path('articles/', views.list_articles, name='list_articles'),

    path('experience/', views.experience, name='experience'),
    path('education/', views.education, name='education'),
    path('contact/', views.contact, name='contact'),
    re_path(r'^zenflow/(?P<path>.*)$', serve,
            {'document_root': settings.ZENFLOW_ROOT}),
    path("lorem/", TemplateView.as_view(template_name="lorem.html")),
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),


]
if settings.DEBUG:  # seulement en mode développement
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
