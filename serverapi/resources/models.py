from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title

class Article(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title

class Case(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title

class DoDont(models.Model):
    content_type = models.CharField(max_length=10, choices=[('Do', 'Do'), ('Don\'t', 'Don\'t')])
    content = models.TextField()

    def __str__(self):
        return f"{self.content_type}: {self.content[:50]}"
class ContractPaper(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title

class NegotiationFAQ(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title
