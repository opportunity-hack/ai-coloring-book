"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, NumberInput, Notification, Skeleton } from '@mantine/core';
import { IconLogout2, IconPalette, IconBook2, IconUsers } from '@tabler/icons-react';
import styles from "./page.module.css";
import chrome from '@/components/admin/page-chrome.module.css';
import HeartDoodle from '@/components/heart-doodle/HeartDoodle';
import PublishPage from '@/components/publish/PublishPage';
import Drawing from '@/components/drawing/Drawing';
import Users from '@/components/users/Users';
import { getDrawings, createBook as apiCreateBook } from '@/lib/api';
import { clearSession, getSession, ROLES } from '@/lib/auth';
import { trackBookPdfDownload } from '@/lib/analytics';
import { groupByGrade } from '@/data/grades';

// The Users tab is site-admin only; school admins manage just their school's
// drawings and books.
const TABS = [
  { key: 'drawings', label: 'Drawings', icon: IconPalette },
  { key: 'publish', label: 'Books', icon: IconBook2 },
  { key: 'users', label: 'Users', icon: IconUsers, adminOnly: true },
];

export default function Admin() {
  const router = useRouter();
  const [drawings, setDrawings] = useState([]);
  const [isLoadingDrawings, setIsLoadingDrawings] = useState(true);
  const [activePage, setActivePage] = useState('drawings');
  const [totalSponsors, setTotalSponsors] = useState(1);
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const [notification, setNotification] = useState(null);
  const [session, setSessionInfo] = useState(null);

  const notify = (message, type = 'success') => setNotification({ message, type });

  useEffect(() => {
    setSessionInfo(getSession());
  }, []);

  const isSchoolAdmin = session?.role === ROLES.SCHOOL_ADMIN;
  const visibleTabs = TABS.filter((tab) => !tab.adminOnly || !isSchoolAdmin);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = setTimeout(() => setNotification(null), 6000);
    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const response = await getDrawings();
        setDrawings(response.data);
      } catch (error) {
        console.error('Failed to fetch drawings:', error);
        notify('Could not load drawings. Please refresh and try again.', 'error');
      } finally {
        setIsLoadingDrawings(false);
      }
    };

    fetchDrawings();
  }, []);

  const handleCardClick = (id) => {
    setDrawings((current) =>
      current.map((drawing) =>
        drawing.id === id ? { ...drawing, selected: !drawing.selected } : drawing
      )
    );
  };

  const handleAiToggle = (id) => {
    setDrawings((current) =>
      current.map((drawing) =>
        drawing.id === id ? { ...drawing, useAI: !drawing.useAI } : drawing
      )
    );
  };

  const selectedCount = drawings.filter((drawing) => drawing.selected).length;

  const createBook = async () => {
    const selectedDrawings = drawings.filter((drawing) => drawing.selected);
    const requestBody = {
      drawings: selectedDrawings,
      totalSponsors: totalSponsors,
    };

    setIsCreatingBook(true);
    try {
      await apiCreateBook(requestBody);
      setDrawings((current) =>
        current.map((drawing) => ({ ...drawing, selected: false }))
      );
      notify('Book created! Open the Books tab to download the PDF.');
    } catch (error) {
      console.error('Failed to create book:', error);
      notify('Could not create the book. Please try again.', 'error');
    } finally {
      setIsCreatingBook(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  const renderDrawings = () => {
    if (isLoadingDrawings) {
      return (
        <div className={styles.gradeGrid} aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} height={252} radius={12} />
          ))}
        </div>
      );
    }

    if (drawings.length === 0) {
      return (
        <div className={chrome.emptyState}>
          <p className={chrome.emptyTitle}>No drawings yet</p>
          <p className={chrome.emptyText}>
            Share the upload page with your classrooms to start collecting art.
          </p>
          <Button component={Link} href="/drawings" variant="light">
            Open the upload page
          </Button>
        </div>
      );
    }

    return (
      <>
        <div className={styles.gradeSections}>
          {groupByGrade(drawings, (drawing) => drawing.grade).map((group) => (
            <section key={group.grade} className={styles.gradeSection}>
              <h2 className={styles.gradeHeader}>
                {group.grade}
                <span className={styles.gradeCount}>
                  {group.items.length} drawing{group.items.length === 1 ? '' : 's'}
                </span>
              </h2>
              <div className={styles.gradeGrid}>
                {group.items.map((drawing) => (
                  <Drawing
                    key={drawing.id}
                    drawing={drawing}
                    handleCardClick={() => handleCardClick(drawing.id)}
                    handleCheckboxChange={() => handleAiToggle(drawing.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.actionBar}>
          <p className={styles.selectionCount}>
            <strong>{selectedCount}</strong> drawing{selectedCount === 1 ? '' : 's'} selected
          </p>
          <NumberInput
            label="Total sponsors"
            min={1}
            max={100}
            value={totalSponsors}
            onChange={setTotalSponsors}
            className={styles.sponsorInput}
          />
          <Button
            onClick={createBook}
            loading={isCreatingBook}
            disabled={selectedCount === 0}
          >
            Create book
          </Button>
        </div>
      </>
    );
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'drawings':
        return (
          <section>
            <header className={chrome.pageHead}>
              <h1 className={chrome.pageTitle}>Drawings</h1>
              <p className={chrome.pageSub}>
                Tap drawings to pick which ones go into the next book. The switch on
                each card controls whether the AI-traced coloring page is used.
              </p>
            </header>
            {renderDrawings()}
          </section>
        );
      case 'publish':
        return (
          <PublishPage
            notify={notify}
            onDownload={(book) => trackBookPdfDownload({ bookId: book.id, bookName: book.label })}
          />
        );
      case 'users':
        return <Users notify={notify} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.wordmark}>
            <HeartDoodle size={20} />
            <span>Susie Q&apos;s Books</span>
          </Link>
          <span className={styles.adminBadge}>
            {isSchoolAdmin && session?.school ? session.school : 'Admin'}
          </span>
          <div className={styles.topBarRight}>
            {session?.email && <span className={styles.userEmail}>{session.email}</span>}
            <Button
              variant="subtle"
              color="gray"
              size="compact-sm"
              leftSection={<IconLogout2 size={16} stroke={1.8} />}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </div>
        <nav className={styles.tabs} aria-label="Admin sections">
          {visibleTabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className={`${styles.tab} ${activePage === key ? styles.tabActive : ''}`}
              aria-current={activePage === key ? 'page' : undefined}
              onClick={() => setActivePage(key)}
            >
              <Icon size={17} stroke={1.8} />
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className={styles.main}>{renderActivePage()}</main>

      {notification && (
        <div className={styles.notificationContainer}>
          <Notification
            color={notification.type === 'error' ? 'red' : 'brand'}
            title={notification.type === 'error' ? 'Something went wrong' : 'Done!'}
            withBorder
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        </div>
      )}
    </div>
  );
}
