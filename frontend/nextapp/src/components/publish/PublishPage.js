"use client";
import { useEffect, useState } from 'react';
import styles from './publish.module.css';
import BooksGrid from '../books-grid/BooksGrid';
import { getBooks } from '@/lib/api';

function PublishPage(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();

        const transformedBooks = response.data.map(book => ({
          id: book.id,
          selected: false,
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
        props.setIsNotificationActive(true);
        props.setNotificationMessage('Could not load books. Please refresh and try again.');
      }
    };

    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle card selection
  const handleCardClick = (id) => {
    const updatedBooks = books.map(book => {
      return {
        ...book,
        selected: book.id === id ? !book.selected : false
      };
    });
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
  };

  return (
    <>
      <h1>Download Book</h1>

      <div className={styles.main}>
        <BooksGrid
          books={books} handleCardClick={handleCardClick}
          setIsNotificationActive={props.setIsNotificationActive}
          setNotificationMessage={props.setNotificationMessage}
          handleDeleteBook={handleDeleteBook}
          isSponsor={false}
          onDownload={props.onDownload}
        />
      </div>
    </>
  );
}

export default PublishPage;
