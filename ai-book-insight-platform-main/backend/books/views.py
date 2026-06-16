from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer
from .ai import get_embedding, cosine_similarity


# Create your views here.
@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def ask_question(request):
    question = request.data.get("question")

    if not question:
        return Response({"answer": "Please ask a valid question."})

    question_embedding = get_embedding(question)

    books = Book.objects.all()

    scored_books = []

    for book in books:
        text = book.title + " " + book.description
        book_embedding = get_embedding(text)

        score = cosine_similarity(question_embedding, book_embedding)
        scored_books.append((score, book))

    # Sort by similarity
    scored_books.sort(reverse=True, key=lambda x: x[0])

    # Take top 3 relevant books
    top_books = [b for _, b in scored_books[:3]]

    # Build answer
    answer_text = "Based on the most relevant books:\n\n"

    for b in top_books:
        answer_text += f"- {b.title}: {b.description}\n"

    answer_text += f"\nAnswer to your question: {question}"

    return Response({"answer": answer_text})


@api_view(['GET'])
def recommend_books(request):
    books = Book.objects.all()[:5]

    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)