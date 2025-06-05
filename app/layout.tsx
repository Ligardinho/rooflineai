import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roofline AI",
  description: "Save hours with an AI assistant that replies to leads, writes listings, books appointments, and follows up — so you can sell more and stress less.",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Adjust as needed
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
