"use client";
import styles from "./books-grid.module.css";
import Book from '../book/Book';

export default function BooksGrid({ books, notify, handleDeleteBook, onDownload }) {
    return (
        <div className={styles.booksContainer}>
            {books.map(book => (
                <Book
                    key={book.id}
                    book={book}
                    notify={notify}
                    handleDeleteBook={handleDeleteBook}
                    onDownload={onDownload}
                />
            ))}
        </div>
    );
}
