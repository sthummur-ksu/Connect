from django.contrib import admin
from .models import Book, Article, Case, DoDont, ContractPaper, NegotiationFAQ

admin.site.register(Book)
admin.site.register(Article)
admin.site.register(Case)
admin.site.register(DoDont)
admin.site.register(ContractPaper)
admin.site.register(NegotiationFAQ)
