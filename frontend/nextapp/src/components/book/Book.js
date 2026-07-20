"use client";
import { Card, Image, Badge, Group, Text, Progress, Tooltip } from '@mantine/core';
import styles from "./book.module.css";
import { IconTrash, IconDownload, IconCalendarEvent } from '@tabler/icons-react';
import { generateBook, deleteBook as apiDeleteBook } from '@/lib/api';
import { formatBookDate } from '@/lib/dates';

function Book({ book, handleCardClick, setIsNotificationActive, setNotificationMessage, handleDeleteBook, isSponsor, onDownload }) {

  const handleDownload = async (e) => {
    e.stopPropagation(); // Prevents triggering the card's onClick

    try {
        setIsNotificationActive(true);
        setNotificationMessage("Generating your book, this usually takes 10 seconds and will trigger a download automatically. Please wait...");
        const response = await generateBook(book.id);

        // Directly use the S3 URL for download
        const downloadUrl = response.data.url;
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute('download', true); // This may not always enforce download depending on the response headers from S3
        downloadLink.download = book.label.endsWith('.pdf') ? book.label : `${book.label}.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        onDownload?.(book);
    } catch (error) {
        console.error('Failed to download the file:', error);
        setIsNotificationActive(true);
        setNotificationMessage("Something went wrong while generating the book. Please try again.");
    }
  };

  const deleteBook = async (e) => {
    e.stopPropagation();
    try {
        await apiDeleteBook(book.id);
        setIsNotificationActive(true);
        setNotificationMessage(`Book ${book.label} deleted`);
        handleDeleteBook(book.id);
    } catch (error) {
        console.error('Failed to delete the file:', error);
        setIsNotificationActive(true);
        setNotificationMessage(`Could not delete ${book.label}. Please try again.`);
    }
  };

  const progressPercentage = book.current_sponsors && book.total_sponsors
                              ? (book.current_sponsors / book.total_sponsors) * 100
                              : 0;

  return (
      <Card
        shadow="sm"
        padding="sm"
        radius="md"
        withBorder
        className={`${styles.card} ${book.selected ? styles.selectedCard : ''}`}
        onClick={handleCardClick}
      >
        <Image
          src={book.url}
          alt={book.label ? `Cover of ${book.label}` : 'Coloring book cover'}
          h={100}
          fit="cover"
        />

        <Text size="xs"><IconCalendarEvent size={19} />{formatBookDate(book.created_on)}</Text>
        { book.drawings && <Group><Tooltip label="Drawings in this book"><Badge>{book.drawings.length} drawings</Badge></Tooltip></Group> }

        <Text size="xs">{book.label}</Text>

        <Text>Sponsors</Text>
        <Progress.Root size="xl" className={styles.progressBar}>
          <Progress.Section value={progressPercentage} color="cyan">
            <Progress.Label className={styles.progressLabel}>
              {book.current_sponsors}/{book.total_sponsors}
            </Progress.Label>
          </Progress.Section>
        </Progress.Root>

        <div className={styles.actionIcons}>
          <IconDownload size="1.5rem" stroke={1.5} className={styles.iconDownload} onClick={handleDownload} aria-label="Download book PDF" />
          {isSponsor !== true &&
            <IconTrash size="1.5rem" stroke={1.5} color='red' className={styles.iconTrash} onClick={deleteBook} aria-label="Delete book" />
          }
        </div>
      </Card>
  );
}

export default Book;
