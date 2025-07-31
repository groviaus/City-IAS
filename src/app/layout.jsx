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
    "City IAS/PCS Academy is a leading platform for IAS/PCS aspirants to prepare for the Civil Services examination with expert guidance and comprehensive study materials.",
  keywords: [
    "IAS",
    "PCS",
    "Civil Services",
    "UPSC",
    "Exam Preparation",
    "Academy",
    "Coaching",
    "Government Jobs",
    "Civil Service Exam",
    "IAS Coaching",
    "PCS Coaching",
  ],
  authors: [{ name: "City IAS/PCS Academy" }],
  creator: "City IAS/PCS Academy",
  publisher: "City IAS/PCS Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.cityiasacademy.com",
    siteName: "City IAS/PCS Academy",
    title: "City IAS/PCS Academy - Premier IAS/PCS Coaching Institute",
    description:
      "City IAS/PCS Academy is a leading platform for IAS/PCS aspirants to prepare for the Civil Services examination with expert guidance and comprehensive study materials.",
    images: [
      {
        url: "https://www.cityiasacademy.com/CityIASLOGO.png",
        width: 1200,
        height: 630,
        alt: "City IAS/PCS Academy Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "City IAS/PCS Academy - Premier IAS/PCS Coaching Institute",
    description:
      "City IAS/PCS Academy is a leading platform for IAS/PCS aspirants to prepare for the Civil Services examination.",
    images: ["https://www.cityiasacademy.com/CityIASLOGO.png"],
    creator: "@cityias",
    site: "@cityias",
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com",
  },
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        url: "/favicon_io/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "City IAS/PCS Academy",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code", // Replace with your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Optional: Replace with your Yandex verification code
    yahoo: "your-yahoo-verification-code", // Optional: Replace with your Yahoo verification code
  },
  other: {
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
  },
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
