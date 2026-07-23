"use client";
import { useState } from 'react';
import { ActionIcon, Badge, Button, Image, Popover, Progress, Text } from '@mantine/core';
import { IconTrash, IconDownload, IconCalendarEvent } from '@tabler/icons-react';
import styles from "./book.module.css";
import { generateBook, deleteBook as apiDeleteBook } from '@/lib/api';
import { formatBookDate } from '@/lib/dates';

function Book({ book, notify, handleDeleteBook, onDownload }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    notify("Generating the PDF — the download starts automatically in about ten seconds.");
    try {
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
      notify("Something went wrong while generating the book. Please try again.", 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const deleteBook = async () => {
    setConfirmOpen(false);
    try {
      await apiDeleteBook(book.id);
      notify(`Book ${book.label} deleted.`);
      handleDeleteBook(book.id);
    } catch (error) {
      console.error('Failed to delete the file:', error);
      notify(`Could not delete ${book.label}. Please try again.`, 'error');
    }
  };

  const progressPercentage = book.current_sponsors && book.total_sponsors
                              ? (book.current_sponsors / book.total_sponsors) * 100
                              : 0;

  return (
    <article className={styles.card}>
      <div className={styles.coverWrap}>
        <Image
          src={book.url}
          alt={book.label ? `Cover of ${book.label}` : 'Coloring book cover'}
          h={150}
          fit="cover"
        />
      </div>

      <div className={styles.body}>
        <Text fw={600} size="sm" lineClamp={1} title={book.label}>
          {book.label}
        </Text>

        <div className={styles.meta}>
          <span className={styles.metaDate}>
            <IconCalendarEvent size={14} stroke={1.8} />
            {formatBookDate(book.created_on)}
          </span>
          {book.drawings && (
            <Badge variant="light" color="sunshine" c="#8a5d00">
              {book.drawings.length} drawing{book.drawings.length === 1 ? '' : 's'}
            </Badge>
          )}
        </div>

        <div className={styles.sponsors}>
          <Text size="xs" c="dimmed">
            Sponsors · {book.current_sponsors}/{book.total_sponsors}
          </Text>
          <Progress value={progressPercentage} size="md" radius="xl" />
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          size="xs"
          leftSection={<IconDownload size={14} stroke={2} />}
          loading={isDownloading}
          onClick={handleDownload}
        >
          Download PDF
        </Button>
        <Popover
          opened={confirmOpen}
          onChange={setConfirmOpen}
          width={230}
          position="top-end"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <ActionIcon
              variant="subtle"
              color="red"
              aria-label={`Delete ${book.label}`}
              onClick={() => setConfirmOpen((o) => !o)}
            >
              <IconTrash size={16} stroke={1.8} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">Delete this book? This can&apos;t be undone.</Text>
            <Button size="xs" color="red" fullWidth mt="xs" onClick={deleteBook}>
              Delete book
            </Button>
          </Popover.Dropdown>
        </Popover>
      </div>
    </article>
  );
}

export default Book;
