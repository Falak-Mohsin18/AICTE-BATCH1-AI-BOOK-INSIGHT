from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    description = models.TextField()
    rating = models.FloatField(null=True, blank=True)
    url = models.URLField()

    def __str__(self):
        return self.title