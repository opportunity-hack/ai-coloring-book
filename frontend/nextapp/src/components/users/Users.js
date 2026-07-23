"use client";
import { useState } from 'react';
import { Alert, Button, PasswordInput, Select, TextInput } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import styles from "./users.module.css";
import chrome from '@/components/admin/page-chrome.module.css';
import { registerUser } from '@/lib/api';
import { ROLES } from '@/lib/auth';
import { SCHOOL_GROUPS } from '@/data/schools';

const ROLE_OPTIONS = {
    'Admin': ROLES.ADMIN,
    'School admin': ROLES.SCHOOL_ADMIN,
    'Sponsor': ROLES.SPONSOR,
};

export default function Users({ notify }) {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [school, setSchool] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (role === 'School admin' && !school) {
            setError('Pick the school this admin will manage.');
            return;
        }

        const registerData = {
            email,
            password,
            role: ROLE_OPTIONS[role],
            organization: organization,
            school: role === 'School admin' ? school : null,
        };

        setIsSubmitting(true);
        try {
            await registerUser(registerData);
            notify(`Account created — ${email} can sign in right away.`);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setOrganization('');
            setSchool(null);
        } catch (err) {
            console.error('Error:', err);
            setError('Could not create the user. Please check the details and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section>
            <header className={chrome.pageHead}>
                <h1 className={chrome.pageTitle}>Users</h1>
                <p className={chrome.pageSub}>
                    Create sign-ins for other admins, or for sponsors who want to
                    follow the books they&apos;ve supported.
                </p>
            </header>

            <form onSubmit={handleSubmit} className={styles.card}>
                <Select
                    label="Role"
                    placeholder="Choose a role"
                    description="Admins manage everything; school admins manage one school's drawings and books; sponsors only see their books."
                    data={Object.keys(ROLE_OPTIONS)}
                    value={role}
                    onChange={setRole}
                    required
                />
                {role === 'School admin' && (
                    <Select
                        label="School"
                        placeholder="Pick their school"
                        description="They'll only see drawings and books for this school."
                        data={SCHOOL_GROUPS}
                        value={school}
                        onChange={setSchool}
                        searchable
                        required
                    />
                )}
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="name@example.org"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <PasswordInput
                    label="Password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <PasswordInput
                    label="Confirm password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                />
                <TextInput
                    label="Organization"
                    placeholder="Business or group name"
                    description="Only needed for sponsors."
                    value={organization}
                    onChange={(e) => setOrganization(e.currentTarget.value)}
                    disabled={role !== "Sponsor"}
                />
                {error && (
                    <Alert color="red" variant="light" icon={<IconAlertCircle size={16} />}>
                        {error}
                    </Alert>
                )}
                <Button type="submit" loading={isSubmitting} className={styles.submit}>
                    Create user
                </Button>
            </form>
        </section>
    );
}
