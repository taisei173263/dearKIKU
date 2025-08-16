import './globals.css';
import type { Metadata } from 'next';
import { Nunito, Open_Sans } from 'next/font/google';
import { Providers } from './providers';

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
});

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'ファミリーマインドブリッジ',
  description: '親子関係強化と脳トレを組み合わせたWebアプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${nunito.variable} ${openSans.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}