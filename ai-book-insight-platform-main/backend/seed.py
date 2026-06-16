import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from scraper import scrape_books
from books.models import Book

def seed():
    print("Scraping books...")
    try:
        books_data = scrape_books()
        print(f"Scraped {len(books_data)} books.")
    except Exception as e:
        print(f"Error scraping books: {e}")
        return

    print("Saving books to database...")
    created_count = 0
    for item in books_data:
        book, created = Book.objects.get_or_create(
            title=item['title'],
            defaults={
                'author': item['author'],
                'description': item['description'],
                'rating': item['rating'],
                'url': item['url']
            }
        )
        if created:
            created_count += 1

    print(f"Done! Created {created_count} new books. Total books in DB: {Book.objects.count()}")

if __name__ == '__main__':
    seed()
