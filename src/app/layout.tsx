import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dbMigrations from '@/dbMigrations';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Página principal de cursos y apoyos escolares',
  title: 'Cursos',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  dbMigrations();

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
