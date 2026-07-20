"use client";
import { useEffect, useState } from 'react';
import { Button, Input, Group, Text, rem, Notification } from '@mantine/core';
import { IconHeart, IconUpload, IconPhoto, IconX, IconConfetti } from '@tabler/icons-react';
import styles from "./page.module.css";
import SponsorBookSteps from '@/components/sponsor-book-steps/SponsorBookSteps';
import BooksGrid from '@/components/books-grid/BooksGrid';
import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { getBooks, sponsorPay } from '@/lib/api';

const paypalClientID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const donationAmountPerBook = parseInt(process.env.NEXT_PUBLIC_DONATION_AMOUNT_PER_BOOK, 10);

function TopNavigation(props) {
  return (
      <div className={styles.navGrid}>
        <div style={{backgroundColor: "white", marginRight: "140px"}}>
          <Button onClick={props.prevStep} className={styles.backButton}>Back</Button>
        </div>
        <SponsorBookSteps active={props.active} />
      </div>
  );
}

function ThankYouMessage() {
  return (
      <>
        <h3> Thank you for Supporting 🎉 </h3>

        <div>Your contribution is greatly appreciated and will make a big difference.</div>

        <Button className={styles.sponsorBookButton} onClick={() => window.location.reload()} color={"pink"}>
          Home
        </Button>
      </>
  );
}

function PaymentPage( {selectedBooks, thankyouPage, imgFile, sponsorName} ) {
  const totalAmount = selectedBooks.length * donationAmountPerBook;
  if (isNaN(totalAmount) || totalAmount <= 0) {
    console.error('Invalid amount:', totalAmount);
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toString(), // Dynamic total amount
          },
        },
      ],
    });
  };

  // Custom logic for onApprove
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      const formData = new FormData();
      if (imgFile) {
        formData.append('file', imgFile);
      }
      formData.append('books', selectedBooks.map(book => book.id));
      formData.append('donation_amount', totalAmount.toString());
      formData.append('name', sponsorName);

      try {
        await sponsorPay(formData);
        thankyouPage();
      } catch (error) {
        console.error('Failed to send payment confirmation:', error);
      }
    });
  };

  return (
    <>
      <Text size="xl" fw={700} ta="center" mt={20} mb={20}>
          You are sponsoring {selectedBooks.length} book{selectedBooks.length > 1 ? 's' : ''}  <IconConfetti/>
      </Text>
      <Text size="xl" fw={700} ta="center" mt={20} mb={20}>
            Total Amount: ${totalAmount}
      </Text>
      <PayPalScriptProvider options={{ clientId: paypalClientID, components: "buttons", currency: "USD" }}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </>
  );
}

export default function Sponsor() {
  const [activePage, setActivePage] = useState('books');
  const [books, setBooks] = useState([]);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sponsorName, setsponsorName] = useState('');

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await getBooks();

      const transformedBooks = response.data
        .filter(book => book.current_sponsors !== book.total_sponsors) // Filter books
        .map(book => ({
          id: book.id,
          selected: false,
          label: book.name,
          url: book.cover_url,
          book_url: book.url,
          current_sponsors: book.current_sponsors || 0,
          total_sponsors: book.total_sponsors || 0,
          created_on: book.created_on,
          modified_on: book.modified_on,
          drawings: book.drawings || [],
          sponsors: book.sponsors || [],
        }));

      setBooks(transformedBooks);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setIsNotificationActive(true);
      setNotificationMessage('Could not load books. Please refresh and try again.');
    }
  };

  fetchBooks();
  }, []);

  const handleCardClick = (id) => {
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return { ...book, selected: !book.selected };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const createBook = () => {
    setActivePage('upload-logo');
    nextStep();
  };

  const uploadBook = () => {
    setActivePage('payment');
    nextStep();
  };

  const thankyouPage = () => {
    setActivePage('thank-you');
    nextStep();
  }

  const [active, setActive] = useState(0);
  let nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current))
  };
   let prevStep = () => {
    setActive((current) => {
      const newStep = current > 0 ? current - 1 : current;
      switch (newStep) {
        case 0:
          setActivePage('books');
          break;
        case 1:
          setActivePage('upload-logo');
          break;
        case 2:
          setActivePage('payment');
          break;
        default:
          break;
      }
      return newStep;
    });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'books':
        return (
          <>
            <TopNavigation prevStep={prevStep} active={active} />

            <Text size="xl" fw={700} ta="center" mt={20} mb={20}>
                Select books to sponsor!
              </Text>
            <div className={styles.booksGridContainer}>
              <BooksGrid books={books} handleCardClick={handleCardClick}
                setIsNotificationActive={setIsNotificationActive}
                setNotificationMessage={setNotificationMessage}
                isSponsor={true}
              />
            </div>
            <div className={styles.publishButton}>
              <Button className={styles.sponsorBookButton} onClick={createBook} color={"pink"}>
                <IconHeart size="1.5rem" stroke={1.5} color='white' fill='white' className={styles.heartDonate} /> Sponsor
              </Button>
            </div>
          </>
        )
      case 'payment':
        const selectedBooks = books.filter(book => book.selected);
        return (
          <>
            <TopNavigation prevStep={prevStep} active={active} />
            <div className={styles.paymentContainerMain}>
              <PaymentPage selectedBooks={selectedBooks} thankyouPage={thankyouPage} imgFile={file} sponsorName={sponsorName} />
            </div>
          </>
        );
      case 'upload-logo':
        return (
          <>
            <TopNavigation prevStep={prevStep} active={active} />

            <Text size="xl" inline>
               Upload logo
            </Text>
            <div className={styles.uploadContainerMain}>
              <Dropzone
                onDrop={handleDrop}
                onReject={() => setUploadStatus('File rejected. Please upload an image under 1MB.')}
                maxSize={1 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                className={styles.dropZone}
              >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach your logo here, file should not exceed 1mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
              {<Text>{uploadStatus}</Text>}

              <Input
                placeholder="Sponsor name"
                value={sponsorName}
                onChange={(e) => {setsponsorName(e.target.value)}}
              />

              <Button onClick={handleUpload}>Upload</Button>
            </div>
          </>
        );
      case 'thank-you':
        return (
          <>
            <TopNavigation prevStep={prevStep} active={active} />
            <div className={styles.thankyouContainerMain}>
              <ThankYouMessage />
            </div>
          </>
        )
      default:
        return null;
    }
  };

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleDrop = (files) => {
    const droppedFile = files[0];
    setFile(droppedFile);
    setUploadStatus(`Attached ${droppedFile.name}`);
  };

  const handleUpload = async () => {
    uploadBook();
  };

  useEffect(() => {
    setIsNotificationActive(false);
    setNotificationMessage("");
  }, []);

  const handleNotificationDismiss = () => {
    setIsNotificationActive(false);
  };

  return (
    <>
      <div className={styles.topNav}>
      </div>
      <div className={styles.rootContainer}>
        <div className={styles.main}>
          {isNotificationActive && (
            <div className={styles.notificationContainer}>
              <Notification color="green" title="Notification" onClose={handleNotificationDismiss}>
                {notificationMessage}
              </Notification>
            </div>
          )}
          {renderActivePage()}
        </div>
      </div>
    </>
  );
}
