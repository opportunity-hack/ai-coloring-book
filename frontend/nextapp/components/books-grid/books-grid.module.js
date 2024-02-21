"use client";
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import styles from "./books-grid.module.css";
import Book from '../book/book.module.js';

export default function BooksGrid(props) {
    return (
        <>
            <div className={styles.booksContainer}>
                {
                    props.books.map(book => (
                            <Book
                            key={book.id}
                            book={book}
                            handleCardClick={() => props.handleCardClick(book.id)}
                            setIsNotificationActive={props.setIsNotificationActive}
                            setNotificationMessage={props.setNotificationMessage}
                            handleDeleteBook={props.handleDeleteBook}
                            isSponsor={props.isSponsor}
                            />
                        )
                    )
                }
            </div>
        </>
          
    );
}