"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { Input, Button, Text } from '@mantine/core';
import Link from 'next/link';
import { login } from '@/lib/api';
import { setSession, ROLES } from '@/lib/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (event) => {
    event?.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await login(email, password);

      if (response.data && response.data.success) {
        setSession({
          userId: response.data.authenticatedUser.id,
          role: response.data.authenticatedUser.role,
          email: response.data.authenticatedUser.email,
          accessToken: response.data.access,
        });

        if (Number(response.data.authenticatedUser.role) === ROLES.ADMIN) {
          router.push('/dashboard');
        } else {
          router.push('/sponsor');
        }
      } else {
        setError(response.data?.message || 'Login failed. Please check your email and password.');
      }
    } catch (err) {
      console.error("An error occurred during login: ", err.response ? err.response.data : err.message);
      setError('Login failed. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Admin Login</h1>

      <div style={{ margin: "20px" }}>
        <Button component={Link} href="/" variant="filled" color="green">
          Back to Home
        </Button>
      </div>

      <div className={styles.loginContainer}>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <Input
            size="sm"
            placeholder="Email"
            type="email"
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
          {error && <Text c="red" size="sm">{error}</Text>}
          <Button
            type="submit"
            variant="filled"
            color="teal"
            loading={isSubmitting}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
