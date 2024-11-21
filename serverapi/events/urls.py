from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_event, name='create_event'),
    path('', views.list_events, name='list_events'),
    path('<int:event_id>/join/', views.join_event, name='join_event'),
    path('<int:event_id>/leave/', views.leave_event, name='leave_event'),
    path('<int:event_id>/status/', views.update_event_status, name='update_event_status'),
    path('my-events/', views.list_user_events, name='list_user_events'),
]
