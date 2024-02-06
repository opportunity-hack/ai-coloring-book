import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Suzie Q's kids",
  description: "Sketched to Smiles",
};

export default function RootLayout({children,}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
