"use client";
import { NavLink } from '@mantine/core';
import { IconWriting, IconUser, IconBook } from '@tabler/icons-react';
import styles from "./nav-sponsor.module.css";

function NavBar({ activePage, navHandler }) {
  return (
    <>
      <NavLink
        label="Books"
        leftSection={<IconWriting size="1rem" stroke={1.5} />}
        variant="filled"
        active={activePage === 'books' || activePage === 'payment'}
        onClick={() => navHandler('books')}
      />
      {/* <NavLink
        label="Profile"
        leftSection={<IconUser size="1rem" stroke={1.5} />}
        variant="filled"
        active={activePage === 'profile'}
        onClick={() => navHandler('profile')}
      /> */}
    </>
  );
}

export default NavBar;