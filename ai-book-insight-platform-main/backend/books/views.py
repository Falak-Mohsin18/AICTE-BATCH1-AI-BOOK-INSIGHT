from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer


@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ask_question(request):
    question = request.data.get("question", "")

    return Response({
        "answer": f"Deployment test successful. Your question was: {question}"
    })


@api_view(['GET'])
def recommend_books(request):
    books = Book.objects.all()[:5]
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)