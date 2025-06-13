import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers'
import NavigationBar from '@/components/navigation-bar'
import { SessionProvider } from "next-auth/react"


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Discussion Board",
  description: "This is a discussion board for the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider>
            <NavigationBar />
            <div className="max-w-[1024px] mx-auto p-4 mt-4">
              {children}
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
