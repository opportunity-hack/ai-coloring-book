"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { Input, Button } from '@mantine/core';
import axios from 'axios'; // make sure to install axios if you haven't already
import Link from 'next/link';
import { Stack } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Text, Title } from '@mantine/core';


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
    <div className={styles.main}>      

      <div className={styles.loginContainer}>
        <Title order={3} textWrap="wrap" >Welcome to Susie Q&apos;s Books</Title>
        <Text>by <Link target="_blank" href="https://susieqskids.org/" >Susie Q&apos;s Kids</Link></Text>
        
        <Grid>    
        <Grid.Col span="auto">
          <Link href="/drawings">        
            <Button 
              variant="filled" 
              color="green" 
              onClick={handleLogin}
            >
              Upload drawing
            </Button>
          </Link>
        </Grid.Col>

        <Grid.Col span="auto">
          <Link href="/sponsor">        
            <Button 
              variant="filled" 
              color="blue" 
              onClick={handleLogin}
            >
              Sponsor a book
            </Button>
          </Link>
        </Grid.Col>
        </Grid>
        </div>

        <div className={styles.loginContainer} style={  {marginTop: "20px", "padding" : "10px"} }>
        <Text style={ {"padding":"10px" }}>Help us create books from your sketches to support our mission. Each bag we give to a child will include this coloring book, crayons, a soft bear to cuddle, a fuzzy blanket to stay warm, hygiene items to refresh them as they start their new day, inspirational items to motivate them, and journals, games, to make the moments easier to manage.</Text>
        </div>

        <div style={{ marginTop: "20px", padding: "10px" }}>
        <Link href="/admin">
          <Button variant="filled" color="purple">
            Admin
          </Button>
        </Link>
        </div>

        </div>
    
  );
}
