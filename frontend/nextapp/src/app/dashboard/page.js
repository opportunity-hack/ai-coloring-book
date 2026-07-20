"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, NumberInput, Notification } from '@mantine/core';
import { IconLogout2, IconMenu2 } from '@tabler/icons-react';
import styles from "./page.module.css";
import PublishPage from '@/components/publish/PublishPage';
import NavBar from '@/components/nav-bar/NavBar';
import Drawing from '@/components/drawing/Drawing';
import Users from '@/components/users/Users';
import { getDrawings, createBook as apiCreateBook } from '@/lib/api';
import { clearSession } from '@/lib/auth';

export default function Admin() {
  const router = useRouter();
  const [drawings, setDrawings] = useState([]);
  const [activePage, setActivePage] = useState('drawings');
  const [totalSponsors, setTotalSponsors] = useState(1);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const response = await getDrawings();
        setDrawings(response.data);
      } catch (error) {
        console.error('Failed to fetch drawings:', error);
        setIsNotificationActive(true);
        setNotificationMessage('Could not load drawings. Please refresh and try again.');
      }
    };

    fetchDrawings();
  }, []);

  // Function to handle card selection
  const handleCardClick = (id) => {
    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === id) {
        return { ...drawing, selected: !drawing.selected };
      }
      return drawing;
    });
    setDrawings(updatedDrawings);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === id) {
        return { ...drawing, useAI: !drawing.useAI };
      }
      return drawing;
    });
    setDrawings(updatedDrawings);
  };

  const handleTotalSponsorsChange = (value) => {
    setTotalSponsors(value);
  };

  const createBook = async () => {
    const selectedDrawings = drawings.filter(drawing => drawing.selected);
    const requestBody = {
      drawings: selectedDrawings,
      totalSponsors: totalSponsors,
    };

    try {
      await apiCreateBook(requestBody);
      setIsNotificationActive(true);
      setNotificationMessage("Book created, go to download page next!");
    } catch (error) {
      console.error('Failed to create book:', error);
      setIsNotificationActive(true);
      setNotificationMessage('Could not create the book. Please try again.');
    }
  };

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  const handleNotificationDismiss = () => {
    setIsNotificationActive(false);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'drawings':
        return (
          <>
            <h1>Drawings</h1>
            <div className={styles.main}>
              <div className={styles.drawingsContainer}>
                {drawings.map(drawing => (
                    <Drawing
                      key={drawing.id}
                      drawing={drawing}
                      handleCardClick={() => handleCardClick(drawing.id)}
                      handleCheckboxChange={() => handleCheckboxChange(drawing.id)}
                    />
                  ))}
              </div>
              <div className={styles.submitContainer}>
                <NumberInput
                  label="Total sponsors"
                  placeholder="Sponsors"
                  min={1}
                  max={100}
                  value={totalSponsors}
                  onChange={handleTotalSponsorsChange}
                />
                <Button
                  className={styles.createBookButton}
                  onClick={createBook}
                  disabled={drawings.filter(drawing => drawing.selected).length <= 0}
                >
                  Create book
                </Button>
              </div>
            </div>
          </>
        );
      case 'publish':
        return <PublishPage
                  setIsNotificationActive={setIsNotificationActive}
                  setNotificationMessage={setNotificationMessage}
                />;
      case 'users':
        return <Users
                  setIsNotificationActive={setIsNotificationActive}
                  setNotificationMessage={setNotificationMessage}
                />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.topNav}>
        <IconMenu2 className={styles.hamburger} size={32} onClick={handleMenuToggle} />
        <IconLogout2 size="2rem" stroke={1.5} color='black' className={styles.logoutButton} onClick={handleLogout} aria-label="Log out" />
      </div>

      <div className={styles.rootContainer}>
        {isMenuOpen && (
        <div className={styles.sideNav}>
          <NavBar activePage={activePage} navHandler={handleNavClick} />
        </div>
      )}
        <div className={styles.main}>
          {isNotificationActive && (
            <div className={styles.notificationContainer}>
              <Notification color="green" title="Notification" onClose={handleNotificationDismiss}>
                {notificationMessage}
              </Notification>
            </div>
          )}

          {renderActivePage()}
        </div>
      </div>
    </>
  );
}
