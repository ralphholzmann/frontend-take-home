import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryProvider } from './lib/ReactQueryProvider';
import Toast, { ToastProvider } from './components/Toast';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'WorkOS Frontend Take Home',
  description: 'WorkOS Frontend Take Home',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastProvider>
          <Suspense fallback={<div />}>
            <ReactQueryProvider>
              {children}
              <Toast />
            </ReactQueryProvider>
          </Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}
