"use client";
import { useState } from 'react';
import { Button, Input, PasswordInput, Select } from '@mantine/core';
import styles from "./users.module.css";
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Users(props) {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [organization, setOrganization] = useState('');

    // setIsNotificationActive={setIsNotificationActive}
    // setNotificationMessage={setNotificationMessage}

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.error("Passwords don't match");
            return;
        }

        const registerData = {
            email,
            password,
            role: role === 'Admin' ? 1 : 2,
            organization: organization,
        };

        try {
            // Register the user
            const response = await axios.post(
                `${apiUrl}/api/register`,
                registerData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
            }
            );
            console.log("User registered successfully");
            console.log(response.data);
            props.setIsNotificationActive(true);
            props.setNotificationMessage("User created")
            
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <>
            <div className={styles.usersContainer}>
                <div className={styles.createUserForm}>
                    <h1>Users</h1>
                    <form onSubmit={handleSubmit}>
                        <Select
                            label="Role"
                            placeholder="User role"
                            data={['Admin', 'Sponsor']}
                            value={role}
                            onChange={setRole}
                            className={styles.inputItem}
                        />
                        <Input.Wrapper label="Email">
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                className={styles.inputItem}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="Password">
                            <PasswordInput
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                className={styles.inputItem}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="Confirm password">
                            <PasswordInput
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                className={styles.inputItem}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="Organization">
                            <Input
                                placeholder="Organization"
                                value={organization}
                                onChange={(e) => setOrganization(e.currentTarget.value)}
                                className={styles.inputItem}
                                disabled={role != "Sponsor"}
                            />
                        </Input.Wrapper>
                        <Button type="submit">Create</Button>
                    </form>
                </div>
            </div>
        </>
    );
}
