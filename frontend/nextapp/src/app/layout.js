import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SusieQ's Books",
  description: "From sketches to smiles, SusieQ's Books is a place where kids can share their drawings and stories with the world.",
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
