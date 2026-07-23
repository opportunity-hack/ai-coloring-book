"use client";
import { useEffect, useState } from 'react';
import { Skeleton } from '@mantine/core';
import chrome from '@/components/admin/page-chrome.module.css';
import BooksGrid from '../books-grid/BooksGrid';
import { getBooks } from '@/lib/api';

function PublishPage({ notify, onDownload }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();

        const transformedBooks = response.data.map(book => ({
          id: book.id,
          label: book.name,
          url: book.cover_url,
          book_url: book.url,
          current_sponsors: book.current_sponsors || 0,
          total_sponsors: book.total_sponsors || 0,
          created_on: book.created_on,
          modified_on: book.modified_on,
          drawings: book.drawings,
          sponsors: book.sponsors,
        }));

        const sortedBooks = transformedBooks.sort((a, b) => b.created_on.localeCompare(a.created_on));
        setBooks(sortedBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
        notify('Could not load books. Please refresh and try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteBook = (bookId) => {
    setBooks((current) => current.filter(book => book.id !== bookId));
  };

  return (
    <section>
      <header className={chrome.pageHead}>
        <h1 className={chrome.pageTitle}>Books</h1>
        <p className={chrome.pageSub}>
          Every book you assemble from drawings lands here. Download the
          print-ready PDF, or delete drafts you no longer need.
        </p>
      </header>

      {isLoading ? (
        <div className={chrome.skeletonGrid} aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} height={300} radius={12} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className={chrome.emptyState}>
          <p className={chrome.emptyTitle}>No books yet</p>
          <p className={chrome.emptyText}>
            Pick drawings on the Drawings tab and press “Create book” to make
            your first one.
          </p>
        </div>
      ) : (
        <BooksGrid
          books={books}
          notify={notify}
          handleDeleteBook={handleDeleteBook}
          onDownload={onDownload}
        />
      )}
    </section>
  );
}

export default PublishPage;
