"""
URL configuration for serverapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from .views import api_status
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', api_status),
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('authapp.urls')),
    path('api/v1/messaging/', include('messaging.urls')), 
    path('api/v1/achievements/', include('achievements.urls')), 
    path('api/v1/events/', include('events.urls')),
    path('api/v1/ratings/', include('ratings.urls')),
    path('api/v1/matchmaking/', include('matchmaking.urls')),
    path('api/v1/resources/', include('resources.urls')), 
    path('api/v1/suggestions/', include('suggestion.urls')),
]
