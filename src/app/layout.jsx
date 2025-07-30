import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./home/Header/page";
import Footer from "./home/Footer/page";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "City IAS/PCS Academy",
  description:
    "City IAS/PCS Academy is a platform for IAS/PCS aspirants to prepare for the IAS/PCS exam.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
