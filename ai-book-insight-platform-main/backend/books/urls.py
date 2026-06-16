from django.urls import path
from .views import get_books, ask_question,recommend_books

urlpatterns = [
    path('books/', get_books),
    path('ask/', ask_question),
    path('recommend/', recommend_books),
]