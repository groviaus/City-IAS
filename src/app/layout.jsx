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
  keywords: [
    "IAS",
    "PCS",
    "Civil Services",
    "UPSC",
    "Exam Preparation",
    "Academy",
    "Coaching",
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
    url: "https://www.cityiasacademy.com", // Replace with your actual domain
    siteName: "City IAS/PCS Academy",
    title: "City IAS/PCS Academy - Premier IAS/PCS Coaching Institute",
    description:
      "City IAS/PCS Academy is a leading platform for IAS/PCS aspirants to prepare for the Civil Services examination with expert guidance and comprehensive study materials.",
    images: [
      {
        url: "/CityIASLOGO.png", // Using your existing logo
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
    images: ["/CityIASLOGO.png"], // Using your existing logo
    creator: "@cityias", // Replace with your actual Twitter handle
    site: "@cityias", // Replace with your actual Twitter handle
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com", // Replace with your actual domain
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
    other: [{ url: "/favicon_io/favicon.ico", sizes: "any" }],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon_io/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon_io/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* Additional SEO meta tags */}
        <meta name="author" content="City IAS/PCS Academy" />
        <meta
          name="keywords"
          content="IAS, PCS, Civil Services, UPSC, Exam Preparation, Academy, Coaching"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.cityiasacademy.com" />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://www.cityiasacademy.com" />
        <meta property="og:site_name" content="City IAS/PCS Academy" />
        <meta
          property="og:title"
          content="City IAS/PCS Academy - Premier IAS/PCS Coaching Institute"
        />
        <meta
          property="og:description"
          content="City IAS/PCS Academy is a leading platform for IAS/PCS aspirants to prepare for the Civil Services examination with expert guidance and comprehensive study materials."
        />
        <meta property="og:image" content="/favicon_io/android-chrome-192x192.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="City IAS/PCS Academy Logo" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="City IAS/PCS Academy - Premier IAS/PCS Coaching Institute"
        />
        <meta
          name="twitter:description"
          content="City IAS/PCS Academy is a leading platform for IAS/PCS aspirants to prepare for the Civil Services examination."
        />
        <meta name="twitter:image" content="/CityIASLOGO.png" />
        <meta name="twitter:creator" content="@cityias" />
        <meta name="twitter:site" content="@cityias" />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
