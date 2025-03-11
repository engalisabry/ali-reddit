import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/Sonner';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata = {
  title: 'Ali Reddit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  authModel,
}: {
  children: React.ReactNode;
  authModel: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className,
      )}
    >
      <body className="min-h-screen pt-50 bg-slate-50 antialiased">
        {/* @ts-expect-error Server Component */}
        <Navbar />

        {authModel}

        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
