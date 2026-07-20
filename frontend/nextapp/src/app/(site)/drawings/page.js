"use client";
import { useState, useEffect } from 'react';
import { Button, TextInput, Group, Text, rem, Select, NavLink, Notification } from '@mantine/core';
import { IconRefresh, IconHeart, IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import styles from "./page.module.css";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Captcha from '@/components/captcha/Captcha';
import Link from 'next/link';
import { uploadDrawing } from '@/lib/api';
import { generateCaptcha, validateCaptcha } from '@/lib/captcha';

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

  const [supportedSchools] = useState(
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
    setFile(droppedFile);
    setUploadStatus(`Attached ${droppedFile.name}`);
  };

  const handleUpload = async () => {
    setUploadStatus(null);
    if (!file) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    if (!validateCaptcha(userCaptchaInput, captchaValue)) {
      setUploadStatus('Incorrect CAPTCHA. Please try again.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('subject', subject);
      formData.append('school', school);
      formData.append('created_by', createdBy);

      await uploadDrawing(formData);

      setUploadStatus(`Uploaded: ${file.name}`);
      setIsNotificationActive(true);
      setNotificationMessage("Drawing uploaded! Thank you for taking the time to send us this drawing. We will add it to our collection and use it to create a coloring book to support kids in need.");
      setSubject('');
      setCreatedBy('');
      setFile(null);
      setUserCaptchaInput('');

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
        <Text size="xl" fw={700}>Upload a drawing</Text>
        <Text size="sm" c="dimmed">Add your drawing to our collection.  Drawings will be combined into a coloring book to support kids in need.</Text>

        <Dropzone
          onDrop={handleDrop}
          onReject={() =>
            {
              setUploadStatus(<Text>File rejected. Please upload a file that is less than 5MB and is an image file. You can use <Link target='_blank' href="https://squoosh.app/">squoosh.app</Link> to compress the image to make it smaller.</Text>);
            }
          }
          maxSize={ 5 * 1024 * 1024 }
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
                Attach drawing here
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Images should not exceed 5 MB
              </Text>
            </div>
          </Group>
        </Dropzone>

        {uploadStatus}

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
          <Captcha value={userCaptchaInput} onChange={handleUserCaptchaChange} captchaValue={captchaValue} />
          <IconRefresh
            onClick={() => handleCaptchaChange(generateCaptcha())} className={styles.refreshCaptcha}
                style={{ cursor: "pointer", color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
                aria-label="Get a new CAPTCHA"
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
