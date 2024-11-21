from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', views.BookDetailView.as_view(), name='book-detail'),

    path('articles/', views.ArticleListCreateView.as_view(), name='article-list-create'),
    path('articles/<int:pk>/', views.ArticleDetailView.as_view(), name='article-detail'),

    path('cases/', views.CaseListCreateView.as_view(), name='case-list-create'),
    path('cases/<int:pk>/', views.CaseDetailView.as_view(), name='case-detail'),

    path('dodonts/', views.DoDontListCreateView.as_view(), name='dodont-list-create'),
    path('dodonts/<int:pk>/', views.DoDontDetailView.as_view(), name='dodont-detail'),

    path('contractpapers/', views.ContractPaperListCreateView.as_view(), name='contractpaper-list-create'),
    path('contractpapers/<int:pk>/', views.ContractPaperDetailView.as_view(), name='contractpaper-detail'),

    path('faqs/', views.NegotiationFAQListCreateView.as_view(), name='faq-list-create'),
    path('faqs/<int:pk>/', views.NegotiationFAQDetailView.as_view(), name='faq-detail'),
]
