"use client";
import styles from "./page.module.css";
import { Button, Grid, Text, Title } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.loginContainer}>
        <Title order={3} textWrap="wrap">Welcome to Susie Q&apos;s Books</Title>
        <Text>by <Link target="_blank" href="https://susieqskids.org/">Susie Q&apos;s Kids</Link></Text>

        <Grid>
          <Grid.Col span="auto">
            <Button component={Link} href="/drawings" variant="filled" color="green">
              Upload drawing
            </Button>
          </Grid.Col>

          <Grid.Col span="auto">
            <Button component={Link} href="/sponsor" variant="filled" color="blue">
              Sponsor a book
            </Button>
          </Grid.Col>
        </Grid>
      </div>

      <div className={styles.loginContainer} style={{ marginTop: "20px", padding: "10px" }}>
        <Text style={{ padding: "10px" }}>Help us create books from your sketches to support our mission. Each bag we give to a child will include this coloring book, crayons, a soft bear to cuddle, a fuzzy blanket to stay warm, hygiene items to refresh them as they start their new day, inspirational items to motivate them, and journals, games, to make the moments easier to manage.</Text>
      </div>

      <div style={{ marginTop: "20px", padding: "10px" }}>
        <Button component={Link} href="/admin" variant="filled" color="grape">
          Admin
        </Button>
      </div>
    </div>
  );
}
