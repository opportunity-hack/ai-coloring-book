"use client";
import React from 'react';
import styles from './profile.module.css'; // Import specific styles for this page
import { Button, FileInput, Input } from '@mantine/core';


function ProfilePage() {
  return (
    <div className={styles.publishPage}>
      
      <div className={styles.profileContainer}>
        <h1>Profile</h1>
        <div className={styles.profileImgUpload}>
          <FileInput
            variant="filled"
            size="xl"
            radius="xl"
            placeholder=""
            className={styles.profileImgUploadd}
          />
        </div>
        
        <Input placeholder="Organization name" />
        <Button variant="filled" color={"green"}>Save</Button>
      </div>

    </div>
  );
}
export default ProfilePage;

