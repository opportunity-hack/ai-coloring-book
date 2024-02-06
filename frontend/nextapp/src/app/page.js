"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { Input, Button } from '@mantine/core';
import axios from 'axios'; // make sure to install axios if you haven't already

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password
      });

      // Check if the login was successful
      if (response.data && response.data.success) {
        // Store the role, email, and access token in local storage
        console.log(response.data)
        localStorage.setItem('user_id', response.data.authenticatedUser.id);
        localStorage.setItem('role', response.data.authenticatedUser.role);
        localStorage.setItem('email', response.data.authenticatedUser.email);
        localStorage.setItem('accessToken', response.data.access);

        if (localStorage.getItem("role") == 1) {
          console.log("Admin logged in successfully");
          router.push('/dashboard');
        } else {
          console.log("Sponsor logged in successfully");
          router.push('/sponsor');
          
        }
      } else {
        console.error("Login failed: ", response.data.message);
        // Handle login failure
      }
    } catch (error) {
      console.error("An error occurred during login: ", error.response ? error.response.data : error.message);
      // Handle errors from the server or network issues
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <h3>Login</h3>
          <Input 
            size="sm" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            size="sm" 
            placeholder="Password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            variant="filled" 
            color="teal" 
            onClick={handleLogin}
          >
            Login
          </Button>
          <a href="/drawings">Upload here!</a>


        </div>
      </div>
    </>
  );
}
