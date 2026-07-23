"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextInput, PasswordInput, Button, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import styles from "./page.module.css";
import HeartDoodle from '@/components/heart-doodle/HeartDoodle';
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
          school: response.data.authenticatedUser.school,
        });

        const role = Number(response.data.authenticatedUser.role);
        if (role === ROLES.ADMIN || role === ROLES.SCHOOL_ADMIN) {
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
    <main className={styles.main}>
      <Link href="/" className={styles.wordmark}>
        <HeartDoodle />
        <span>Susie Q&apos;s Books</span>
      </Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>
          Sign in to manage drawings, books, and sponsors.
        </p>

        <form onSubmit={handleLogin} className={styles.form}>
          <TextInput
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.org"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            autoComplete="current-password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert
              color="red"
              variant="light"
              icon={<IconAlertCircle size={16} />}
            >
              {error}
            </Alert>
          )}
          <Button type="submit" fullWidth size="md" loading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </div>

      <Link href="/" className={styles.backLink}>
        ← Back to susieqsbooks.org
      </Link>
    </main>
  );
}
