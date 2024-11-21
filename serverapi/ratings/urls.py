from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_rating, name='create_rating'),
    path('user/<int:user_id>/', views.list_ratings, name='list_ratings'),
]
