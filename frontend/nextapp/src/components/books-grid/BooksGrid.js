"use client";
import styles from "./books-grid.module.css";
import Book from '../book/Book';

export default function BooksGrid(props) {
    return (
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
                        onDownload={props.onDownload}
                    />
                ))
            }
        </div>
    );
}
