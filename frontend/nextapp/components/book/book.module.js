"use client";
import { Card, Image, Badge, Group } from '@mantine/core';
import { Text } from '@mantine/core';
import styles from "./book.module.css";
import { IconTrash, IconDownload, IconCalendarEvent, IconPhotoFilled} from '@tabler/icons-react';
import { Progress, Tooltip } from '@mantine/core';
import axios from 'axios';
import moment from 'moment';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Book({ book, handleCardClick, setIsNotificationActive, setNotificationMessage, handleDeleteBook }) {
  console.log(book);
  
  const role = localStorage.getItem("role");

  const handleDownload = async (e) => {
    e.stopPropagation(); // Prevents triggering the card's onClick

    try {
        // Using Axios to send a POST request to the backend
        setIsNotificationActive(true);
        setNotificationMessage("Generating your book, this usually takes 10 seconds and will trigger a download automatically. Please wait...");
        const response = await axios.post(
            `${apiUrl}/api/generate_book`, 
            { id: book.id }, // No need to stringify the body with Axios
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token
                },
            }
        );
        
        // Directly use the S3 URL for download
        const downloadUrl = response.data.url; // URL from the backend
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute('download', true); // This may not always enforce download depending on the response headers from S3
        downloadLink.download = book.label.endsWith('.pdf') ? book.label : `${book.label}.pdf`; // Ensure it has a .pdf extension
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } catch (error) {
        console.error('Failed to download the file:', error);
    }
  };


  const deleteBook = async (e) => {
    e.stopPropagation();
    console.log(`Delete book with id: ${book.id}`);
    try {
        const response = await axios.delete(
            `${apiUrl}/api/books/${book.id}/`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        );
        setIsNotificationActive(true);
        setNotificationMessage(`Book ${book.label} deleted `);
        handleDeleteBook(book.id);
    } catch (error) {
        console.error('Failed to delete the file:', error);
    }
};


  const progressPercentage = book.current_sponsors && book.total_sponsors 
                              ? (book.current_sponsors / book.total_sponsors) * 100 
                              : 0;

  return (
    <>
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
            alt={book.label}
            height={100}
          />
        
        
        <Text size="xs"><IconCalendarEvent size={19} />{moment.utc(book.created_on).local().format('MMM Do YYYY h:mm:ssa')}</Text>        
        { book.drawings && <Group><Tooltip label="Drawings in this book"><Badge>{book.drawings.length} drawings</Badge></Tooltip></Group> }
        
        <Text size="xs">{book.label}</Text>
        
        

         <Text>Sponsors</Text>
          <Progress.Root size="l" className={styles.progressBar}>
          <Progress.Section value={progressPercentage} color="cyan">
            <Progress.Label className={styles.progressLabel}>
              {book.current_sponsors}/{book.total_sponsors}
            </Progress.Label>
          </Progress.Section>
        </Progress.Root>
        
        
        

        <div className={styles.actionIcons}>
          <IconDownload size="1.5rem" stroke={1.5} className={styles.iconDownload} onClick={handleDownload} />
          {role !== '2' && 
            <IconTrash size="1.5rem" stroke={1.5} color='red' className={styles.iconTrash} onClick={deleteBook} />
          }
        </div>
      </Card>
    </>
  );
}


export default Book;
