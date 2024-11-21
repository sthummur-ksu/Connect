from rest_framework import generics
from .models import Suggestion
from .serializers import SuggestionSerializer

class SuggestionListCreateView(generics.ListCreateAPIView):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer

class SuggestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer
