"use client";
import { NavLink } from '@mantine/core';
import { IconWriting, IconUsers, IconBook } from '@tabler/icons-react';
import styles from "./nav.module.css";

function NavBar({ activePage, navHandler }) {
  return (
    <>
      <NavLink
        label="Drawings"
        leftSection={<IconWriting size="1rem" stroke={1.5} />}
        variant="filled"
        active={activePage === 'drawings'}
        onClick={() => navHandler('drawings')}
      />
      <NavLink
        label="Publish book"
        leftSection={<IconBook size="1rem" stroke={1.5} />}
        variant="filled"
        active={activePage === 'publish'}
        onClick={() => navHandler('publish')}
      />
      <NavLink
        label="User management"
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
        variant="filled"
        active={activePage === 'users'}
        onClick={() => navHandler('users')}
      />
    </>
  );
}

export default NavBar;