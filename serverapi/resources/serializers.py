from rest_framework import serializers
from .models import Book, Article, Case, DoDont, ContractPaper, NegotiationFAQ

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = '__all__'

class DoDontSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoDont
        fields = '__all__'

class ContractPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractPaper
        fields = '__all__'

class NegotiationFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = NegotiationFAQ
        fields = '__all__'
