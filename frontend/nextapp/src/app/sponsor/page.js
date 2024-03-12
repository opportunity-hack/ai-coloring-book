"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Group, Text, rem, Notification } from '@mantine/core';
import { IconLogout2, IconHeart, IconUpload, IconPhoto, IconX, IconConfetti } from '@tabler/icons-react';
import styles from "./page.module.css";
import SponsorBookSteps from '../../../components/sponsor-book-steps/sponsor-book-steps.module.js';
import NavBar from '../../../components/nav-bar-sponsor/nav-sponsor.module.js';
import BooksGrid from '../../../components/books-grid/books-grid.module.js';
import axios from 'axios';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const paypalClientID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const donationAmountPerBook = parseInt(process.env.NEXT_PUBLIC_DONATION_AMOUNT_PER_BOOK, 10);

const initialOptions = {
    clientId: paypalClientID,
    currency: "USD",
    intent: "capture",
};


function TopNavigation(props) {
  return (
    <>
      <div className={styles.navGrid}>
        <div style={{backgroundColor: "white", marginRight: "140px"}}>
          <Button onClick={props.prevStep} className={styles.backButton}>Back</Button>
        </div>
        <SponsorBookSteps active={props.active} setActive={props.setActive} />
      </div>
    </>
  );

}

function ThankYouMessage() {
  const router = useRouter();
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

function UploadLogo(props) {
  return (
    <>
      <Button className={styles.sponsorBookButton} onClick={props.uploadBook} color={"pink"}>
        <IconHeart size="1.5rem" stroke={1.5} color='white' fill='white' className={styles.heartDonate} /> Sponsor
      </Button>
    
    </>
  )
  
}

function PaymentPage( {selectedBooks, thankyouPage, imgFile, sponsorName} ) {
  // Assuming each book costs $10
  console.log('Selected Books Length:', selectedBooks.length);
  const totalAmount = selectedBooks.length * donationAmountPerBook;
  console.log('Total Amount:', totalAmount);
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
    console.log("Payment Successful:", details);
    console.log("I")
    // Prepare data for the POST request
    const postData = {
      books: selectedBooks.map(book => book.id), // assuming 'id' is the identifier for books
      donation_amount: totalAmount
    };

    console.log("II")

    const formData = new FormData();
    formData.append('file', imgFile);
    formData.append('books', postData.books);
    formData.append('donation_amount', totalAmount.toString());
    formData.append('name', sponsorName);

    console.log("III")
    console.log(formData)
    try {
      
      console.log("IV")
      const response = await axios.post(
        `${apiUrl}/api/sponsor_pay`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
          },
      });
      console.log(response.data.url);
      // Update to navigate to thank you page
      thankyouPage();
   
    } catch (error) {
      console.error('Failed to send payment confirmation:', error);
    }
    console.log("V")
  });
};


  return (
    <>
    <Text size="xl" weight={700} align="center" mt={20} mb={20}>      
        You are sponsoring {selectedBooks.length} book{selectedBooks.length > 1 ? 's' : ''}  <IconConfetti/>
    </Text>
    <Text size="xl" weight={700} align="center" mt={20} mb={20}>      
          Total Amount: ${totalAmount}
    </Text>
        <PayPalScriptProvider options={{ clientId: initialOptions.clientId, components: "buttons", currency: "USD" }}>
          
          <PayPalButtons
            // initialOptions={initialOptions}
            createOrder={createOrder}
            onApprove={onApprove}
              
        />
        </PayPalScriptProvider>
 
    
    </>
    
  );
}

export default function Sponsor() {
  const router = useRouter();
  const [activePage, setActivePage] = useState('books');
  const [books, setBooks] = useState([]);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sponsorName, setsponsorName] = useState('');
  
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

      const transformedBooks = response.data
        .filter(book => book.current_sponsors !== book.total_sponsors) // Filter books
        .map(book => ({
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
          drawings: book.drawings || [],
          sponsors: book.sponsors || [],
        }));

      console.log(transformedBooks)
      setBooks(transformedBooks);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      // Handle error here
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
    const selectedBooks = books.filter(book => book.selected);
    console.log('Selected books for Book:', selectedBooks);
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

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  

  const [active, setActive] = useState(0);
  let nextStep = () => {
    console.log("going to next page..")
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
            <TopNavigation prevStep={prevStep} active={active} setActive={setActive} />
            
            <Text size="xl" weight={700} align="center" mt={20} mb={20}>
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
            <TopNavigation prevStep={prevStep} active={active} setActive={setActive} />
            <div className={styles.paymentContainerMain}>
              <PaymentPage selectedBooks={selectedBooks} thankyouPage={thankyouPage} imgFile={file} sponsorName={sponsorName} />
            </div>
           
          </>
        );
      case 'upload-logo':
        return (
          <>
             <TopNavigation prevStep={prevStep} active={active} setActive={setActive}/>
            
            <Text size="xl" inline>
               Upload logo
            </Text>
            <div className={styles.uploadContainerMain}>
             
              <Dropzone
                onDrop={handleDrop}
                onReject={(files) => console.log('rejected files', files)}
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
                      Attach drawing here, file should not exceed 1mb
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
            <TopNavigation prevStep={prevStep} active={active} setActive={setActive} />
            <div className={styles.thankyouContainerMain}>
              <ThankYouMessage />
            </div>
            
          </>
          
        )
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };


  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleDrop = (files) => {
    const droppedFile = files[0];
    setFile(droppedFile); // Set the first file (assuming single file upload)
    setUploadStatus(`Attached ${droppedFile.name}`);
    console.log("file uploaded");
  };

  const handleUpload = async () => {
    uploadBook();
    // if (!file) {
    //   alert('Please select a file to upload');
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('file', file);

    // try {
    //   console.log(file)
    //   console.log(formData)
    //   const response = await axios.post(
    //     `${apiUrl}/api/sponsor_img`, formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    //       },
    //   });
    //   console.log(response.data.url);
    //   setUploadStatus(`Uploaded: ${file.name}`);
    //   if (response.data.url) {
    //     uploadBook();
        
    //   }
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    //   setUploadStatus('Error in file upload');
    // }
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
        {/* <IconLogout2 size="2rem" stroke={1.5} color='black' className={styles.logoutButton} onClick={handleLogout}/> */}
      </div>
      <div className={styles.rootContainer}>
        {/* <div className={styles.sideNav}>
          <NavBar activePage={activePage} navHandler={handleNavClick} />
        </div> */}
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
