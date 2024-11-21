from django.urls import path
from . import views

urlpatterns = [
    path('suggestions/', views.SuggestionListCreateView.as_view(), name='suggestion-list-create'),
    path('suggestions/<int:pk>/', views.SuggestionDetailView.as_view(), name='suggestion-detail'),
]
