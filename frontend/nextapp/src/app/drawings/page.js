"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Group, Text, rem, Image } from '@mantine/core';
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
  const [uploadStatus, setUploadStatus] = useState('');
  const [subject, setSubject] = useState('');
  const [school, setSchool] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

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
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    if (userCaptchaInput !== captchaValue) {
      alert(`Incorrect CAPTCHA. Please try again. ${userCaptchaInput} ${captchaValue}`);
      return;
    }
   

    const formData = new FormData();
    formData.append('image', file);
    formData.append('subject', subject);
    formData.append('school', school);
    formData.append('created_by', createdBy);

    try {
      console.log(file)
      console.log(formData)
      const response = await axios.post(
        `${apiUrl}/api/upload_drawings/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          },
      });
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
      </div>
      <div className={styles.rootContainer}>
        <h1> Upload drawings</h1>
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
            placeholder="Drawing subject"
            value={subject}
            onChange={(e) => setSubject(e.currentTarget.value)}
            className={styles.subject}
        />
        <Input
            placeholder="School"
            value={school}
            onChange={(e) => setSchool(e.currentTarget.value)}
            className={styles.subject}
        />
        <Input
            placeholder="Create by :)"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.currentTarget.value)}
            className={styles.subject}
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
          <Button onClick={handleUpload}>Upload</Button>
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
