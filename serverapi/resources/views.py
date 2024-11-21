from rest_framework import generics
from .models import Book, Article, Case, DoDont, ContractPaper, NegotiationFAQ
from .serializers import BookSerializer, ArticleSerializer, CaseSerializer, DoDontSerializer, ContractPaperSerializer, NegotiationFAQSerializer

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class CaseListCreateView(generics.ListCreateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class CaseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class DoDontListCreateView(generics.ListCreateAPIView):
    queryset = DoDont.objects.all()
    serializer_class = DoDontSerializer

class DoDontDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DoDont.objects.all()
    serializer_class = DoDontSerializer


class ContractPaperListCreateView(generics.ListCreateAPIView):
    queryset = ContractPaper.objects.all()
    serializer_class = ContractPaperSerializer

class ContractPaperDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContractPaper.objects.all()
    serializer_class = ContractPaperSerializer

# Negotiation FAQs
class NegotiationFAQListCreateView(generics.ListCreateAPIView):
    queryset = NegotiationFAQ.objects.all()
    serializer_class = NegotiationFAQSerializer

class NegotiationFAQDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NegotiationFAQ.objects.all()
    serializer_class = NegotiationFAQSerializer
