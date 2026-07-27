"use client";
import { useEffect, useState } from 'react';
import { Alert, Badge, Button, PasswordInput, Select, Skeleton, Table, TextInput } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import styles from "./users.module.css";
import chrome from '@/components/admin/page-chrome.module.css';
import { getUsers, registerUser } from '@/lib/api';
import { ROLES } from '@/lib/auth';
import { SCHOOL_GROUPS } from '@/data/schools';
import { formatShortDate } from '@/lib/dates';

const ROLE_OPTIONS = {
    'Admin': ROLES.ADMIN,
    'School admin': ROLES.SCHOOL_ADMIN,
    'Sponsor': ROLES.SPONSOR,
};

const ROLE_BADGES = {
    [ROLES.ADMIN]: { label: 'Admin', color: 'brand' },
    [ROLES.SCHOOL_ADMIN]: { label: 'School admin', color: 'sunshine' },
    [ROLES.SPONSOR]: { label: 'Sponsor', color: 'gray' },
};

export default function Users({ notify }) {
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [school, setSchool] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data.users || []);
        } catch (err) {
            console.error('Failed to fetch users:', err);
            notify('Could not load the user list. Please refresh and try again.', 'error');
        } finally {
            setIsLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            fetchUsers();
        } catch (err) {
            console.error('Error:', err);
            setError('Could not create the user. Please check the details and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderUserList = () => {
        if (isLoadingUsers) {
            return <Skeleton height={220} radius={12} />;
        }

        if (users.length === 0) {
            return (
                <div className={chrome.emptyState}>
                    <p className={chrome.emptyTitle}>No users yet</p>
                    <p className={chrome.emptyText}>
                        Create the first account with the form.
                    </p>
                </div>
            );
        }

        return (
            <div className={styles.tableCard}>
                <Table verticalSpacing="sm" highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>School / organization</Table.Th>
                            <Table.Th>Added</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {users.map((user) => {
                            const badge = ROLE_BADGES[user.role] || { label: 'Unknown', color: 'gray' };
                            return (
                                <Table.Tr key={user.id}>
                                    <Table.Td className={styles.emailCell}>{user.email}</Table.Td>
                                    <Table.Td>
                                        <Badge variant="light" color={badge.color}>
                                            {badge.label}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>{user.school || user.organization || '—'}</Table.Td>
                                    <Table.Td>
                                        {user.date_joined ? formatShortDate(user.date_joined) : '—'}
                                    </Table.Td>
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </div>
        );
    };

    return (
        <section>
            <header className={chrome.pageHead}>
                <h1 className={chrome.pageTitle}>Users</h1>
                <p className={chrome.pageSub}>
                    Everyone who can sign in, and a form to add more — other admins,
                    school admins, or sponsors who want to follow their books.
                </p>
            </header>

            <div className={styles.layout}>
                <div className={styles.listColumn}>{renderUserList()}</div>

                <form onSubmit={handleSubmit} className={styles.card}>
                    <h2 className={styles.formTitle}>Create a user</h2>
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
            </div>
        </section>
    );
}
