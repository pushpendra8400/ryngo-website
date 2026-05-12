import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/SessionProvider';
import ThemeProvider from '@/components/ThemeProvider';
import AIChatBot from '@/components/AIChatBot';
import { BookingProvider } from '@/context/BookingContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Ryngo | Premium Ride Booking',
  description: 'Experience the premium standard of ride booking with Ryngo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased text-[#0B132B] bg-[#ECF4E8] min-h-screen flex flex-col`}>
        <AuthProvider>
          <ThemeProvider>
            <BookingProvider>
              <Navbar />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
              <AIChatBot />
            </BookingProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
