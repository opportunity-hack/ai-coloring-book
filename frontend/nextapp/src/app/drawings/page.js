"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextInput, Group, Text, rem, Image, Select, NavLink } from '@mantine/core';
import { IconLogout2, IconRefresh, IconHeart } from '@tabler/icons-react';
import styles from "./page.module.css";
import SponsorBookSteps from '../../../components/sponsor-book-steps/sponsor-book-steps.module.js';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import axios from 'axios';
import Captcha from '../../../components/captcha/captcha.module.js';
import { Notification } from '@mantine/core';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UploadDrawings() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("Upload an image and tell us about it.");
  const [subject, setSubject] = useState('');
  const [school, setSchool] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const [supportedSchools, setSupportedSchools] = useState(
    ['Maurice M. Wilde Elementary School',
    'Margaret I. Susick Elementary School',
    'John H. Siersma Elementary School',
    'Pearl O. Lean Elementary School', 'Pinewood Elementary School',
    'Briarwood Elementary School', 'Great Oaks Academy', 'Michigan Mathematics and Science Academy (MMSA)']
);


  const handleUserCaptchaChange = (e) => {
    setUserCaptchaInput(e.currentTarget.value);
  };
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    //   return "ABCS";
    return result;
  };


  useEffect(() => {
    handleCaptchaChange(generateCaptcha());
    setIsNotificationActive(false);
    setNotificationMessage("");
  }, []);


  const handleNotificationDismiss = () => {
    setIsNotificationActive(false);
  };

  const handleDrop = (files) => {
    const droppedFile = files[0];
    setFile(droppedFile); // Set the first file (assuming single file upload)
    setUploadStatus(`Attached ${droppedFile.name}`);
    console.log("file uploaded");
  };

  const handleUpload = async () => {
    // Print file, subject, school, createdBy
    console.log("file", file);
    console.log("subject", subject);
    console.log("school", school);
    console.log("createdBy", createdBy);
    console.log("captchaValue", captchaValue);

    setUploadStatus(null);
    if (!file) {
      alert('Please select a file to upload');
      setUploadStatus('Please select a file to upload');
      return;
    }

    if (userCaptchaInput !== captchaValue) {
      alert(`Incorrect CAPTCHA. Please try again. ${userCaptchaInput} ${captchaValue}`);
      setUploadStatus('Incorrect CAPTCHA. Please try again.');
      return;
    }
   

    try {            
      const formData = new FormData();
      formData.append('image', file);
      formData.append('subject', subject);
      formData.append('school', school);
      formData.append('created_by', createdBy);

      const response = await axios.post(`${apiUrl}/api/upload_drawings/`, formData);

      
      console.log(response.data);
      setUploadStatus(`Uploaded: ${file.name}`);
      console.log(response.data);
      setIsNotificationActive(true);
      setNotificationMessage("Drawing uploaded");
      handleCaptchaChange(generateCaptcha());

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error in file upload');
    }
  };
  return (
    <>
      <div className={styles.topNav}>
       <NavLink href="/" label="Home" leftSection={<IconHeart size="1rem" stroke={1.5} />} variant="link" />        
      </div>
      <div className={styles.rootContainer}>
        <Text size="xl" weight={700}>Upload a drawing</Text>
        <Text size="sm" c="dimmed">Add your drawing to our collection.  Drawings will be combined into a coloring book to support kids in need.</Text>

        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => 
            {              
              setUploadStatus("File rejected. Please upload a file that is less than 1mb and is an image file.");              
            }
          }                     

          maxSize={1 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          className={styles.dropZone}
        >
          <Group justify="center" gap="xl" mih={150} style={{ pointerEvents: 'none' }}>
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
        
        <TextInput
            placeholder="Title of drawing"
            label="Title"
            description="What do you call your work of art? What is in the drawing?"
            value={subject}
            onChange={(e) => setSubject(e.currentTarget.value)}
            className={styles.formInput}
        />
        
        
          <Select
            placeholder="School"
            description="Which school is this drawing for?"
            label="School"
            value={school}
            onChange={(value) => setSchool(value)}
            data={supportedSchools}
            className={styles.formInput}
            searchable
          />
        
        <TextInput
            placeholder="Artist name (optional)"
            description="Name of the artist who created the drawing"
            label="Created by"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.currentTarget.value)}
            className={styles.formInput}
        />
        <div style={{ display: "flex", width: "200px", marginTop: "10px" }}>

          <Captcha value={userCaptchaInput} onChange={handleUserCaptchaChange}
            handleCaptchaChange={handleCaptchaChange} captchaValue={captchaValue} generateCaptcha={generateCaptcha} />
          <IconRefresh
            onClick={() => handleCaptchaChange(generateCaptcha())} className={styles.refreshCaptcha}
                style={{ cursor: "pointer", color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
        </div>
        <div>
          <Button onClick={handleUpload} disabled={uploadStatus === null}>Upload</Button>
        </div>
        
        {isNotificationActive && (
            <div className={styles.notificationContainer}>
              <Notification color="green" title="Notification" onClose={handleNotificationDismiss}>
                {notificationMessage}
              </Notification>
            </div>
          )}
        
      </div> 
    </>
  );
}
