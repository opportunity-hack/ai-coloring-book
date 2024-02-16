"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import styles from './publish.module.css';
import { FileInput, Button } from '@mantine/core';
import Book from '../book/book.module.js';
import BooksGrid from '../books-grid/books-grid.module.js';
import { IconLogout2, IconHeart } from '@tabler/icons-react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function PublishPage(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      console.log("getting books..")
      try {
        const response = await axios.get(`${apiUrl}/api/books/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
          },
        });

        const transformedBooks = response.data.map(book => ({
          id: book.id,
          selected: false,
          label: book.name,
          useAI: true, // Assuming all books use AI, adjust as necessary
          url: book.cover_url,
          book_url: book.url,
          current_sponsors: book.current_sponsors || 0, // Add current sponsors
          total_sponsors: book.total_sponsors || 0, // Add total sponsors
          created_on: book.created_on,
          modified_on: book.modified_on,
          drawings: book.drawings,
          sponsors: book.sponsors,
        }));

        const sortedBooks = transformedBooks.sort((a, b) => b.created_on.localeCompare(a.created_on));
        setBooks(sortedBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
        // Handle error here
      }
    };

    fetchBooks();
  }, []);
  
  const [activePage, setActivePage] = useState('books');

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


  const createBook = () => {
  const selectedBook = books.find(book => book.selected);

  if (selectedBook) {
    // Open a new tab and navigate to the GoFundMe page
    window.open('https://www.gofundme.com/create/fundraiser/', '_blank');
  } else {
    console.log('No book selected');
  }
  };
  

  const handleDeleteBook = (bookId) => {
    console.log("UPDATING BOOKS")
        const updatedBooks = books.filter(book => book.id !== bookId);
        setBooks(updatedBooks);
    };

  return (
    <div className={styles.publishPage}>
        <div className={styles.main}>
          <h1>Publish Your Book</h1>
          <div className={styles.booksGridContainer}>
          <BooksGrid
            books={books} handleCardClick={handleCardClick}
            setIsNotificationActive={props.setIsNotificationActive}
            setNotificationMessage={props.setNotificationMessage}
            handleDeleteBook={handleDeleteBook}
          ></BooksGrid>
          </div>
          <div className={styles.publishButton}>
            <Button className={styles.createBookButton} onClick={createBook} color={"pink"}> 
              Publish!
            </Button>
          </div>
        </div>
    </div>
  );
}

export default PublishPage;

