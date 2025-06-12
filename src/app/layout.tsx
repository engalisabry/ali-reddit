import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/Sonner';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import KeepAlive from '@/components/KeepAlive';

export const metadata = {
  title: 'Ali Reddit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
  icons: {
    icon: '/logo.svg',
  },
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
      <body className="min-h-screen pt-70 bg-slate-50 antialiased">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />

          {authModel}

          <div className="container max-w-7xl mx-auto h-full pt-15">
            {children}
          </div>
          <Toaster />
          <KeepAlive />
        </Providers>
      </body>
    </html>
  );
}
