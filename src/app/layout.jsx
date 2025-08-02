import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./home/Header/page";
import Footer from "./home/Footer/page";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default:
      "City IAS Academy - Best IAS & PCS Coaching in Aligarh | Top UPSC Preparation",
    template: "%s | City IAS Academy - Best IAS & PCS Coaching Aligarh",
  },
  description:
    "City IAS Academy - #1 IAS & PCS Coaching in Aligarh. Best UPSC preparation with expert faculty, comprehensive study materials, and proven success. Join Aligarh's top IAS academy for Civil Services preparation. Free Foundation Batch available.",
  keywords: [
    "city ias",
    "city ias pcs",
    "pcs coaching aligarh",
    "pcs keywords",
    "city ias academy",
    "city ias pcs academy",
    "best IAS coaching in Aligarh",
    "IAS coaching Aligarh",
    "UPSC coaching Aligarh",
    "best IAS coaching Kela Nagar",
    "City IAS Academy Aligarh",
    "Civil Services coaching Aligarh",
    "IAS preparation Aligarh",
    "top IAS coaching Uttar Pradesh",
    "best UPSC coaching Aligarh",
    "IAS coaching near me Aligarh",
    "Aligarh IAS academy",
    "PCS coaching Aligarh",
    "VISION IAS Aligarh",
    "Drishti IAS Aligarh",
    "Plutus IAS Aligarh",
    "best IAS coaching Aligarh vs VISION",
    "IAS coaching comparison Aligarh",
    "IAS coaching fees Aligarh 2024",
    "UPSC coaching near AMU Aligarh",
    "IAS preparation course Aligarh",
    "Civil Services coaching Kela Nagar",
    "IAS interview preparation Aligarh",
    "UPSC prelims coaching Aligarh",
    "IAS mains coaching Aligarh",
    "best IAS faculty Aligarh",
    "IAS study material Aligarh",
    "UPSC current affairs Aligarh",
    "UPSC 2024 coaching Aligarh",
    "CSE 2024 preparation Aligarh",
    "IAS 2024 batch Aligarh",
    "UPSC prelims 2024 Aligarh",
    "Pratistha IAS Academy Aligarh",
    "Katara Academy Aligarh",
    "JMD Academy Aligarh",
    "Unacademy Centre Aligarh",
    "Residential Coaching Academy AMU",
    "CS IAS Academy Aligarh",
    "Organon Classes Aligarh",
    "DRISHTI Classes Aligarh",
    "CARE IAS Aligarh",
    "Achievers Academy Aligarh",
    "NCA Law Classes Aligarh",
    "ICS Coaching Centre Aligarh",
    "JANNAT Academy Aligarh",
    "Chandra's Civil Institute Aligarh",
    "Dr. B.R. Ambedkar IAS Coaching Aligarh",
    "Aligarh Coaching Centre",
    "Pratistha vs City IAS Academy Aligarh",
    "Katara Academy vs City IAS",
    "best IAS coaching Aligarh 2024 comparison",
    "IAS coaching fees Aligarh comparison",
    "UPSC coaching near Meenakshi Flyover",
    "IAS coaching near AMU campus",
    "IAS coaching Ramghat Road Aligarh",
    "IAS coaching Marris Road Aligarh",
    "IAS coaching Kela Nagar Aligarh",
    "IAS coaching near Kela Nagar",
    "UPSC coaching E-11 Aligarh",
    "IAS coaching near Meenakshi Bridge",
    "IAS coaching GT Road Aligarh",
    "IAS coaching Darshan Vihar Colony",
    "IAS coaching with hostel facility Aligarh",
    "24/7 IAS coaching Aligarh",
    "IAS coaching with personal mentoring",
    "IAS coaching with experienced faculty Aligarh",
    "IAS coaching with study material Aligarh",
    "IAS coaching with interview preparation",
    "IAS coaching with current affairs",
    "IAS coaching with mock tests Aligarh",
    "RCA Aligarh",
    "Residential Coaching Academy Aligarh",
    "RCA vs City IAS Academy",
    "Residential Coaching Academy vs City IAS",
    "RCA fees Aligarh",
    "Residential Coaching Academy fees",
    "RCA location Aligarh",
    "Residential Coaching Academy location",
    "RCA interview preparation",
    "Residential Coaching Academy interview",
    "RCA study material",
    "Residential Coaching Academy study material",
    "best RCA Aligarh",
    "top RCA Aligarh",
    "RCA coaching Aligarh",
    "Residential Coaching Academy coaching Aligarh",
    "RCA hostel facilities",
    "Residential Coaching Academy hostel",
    "RCA 24/7 coaching",
    "Residential Coaching Academy 24/7",
    "RCA personal mentoring",
    "Residential Coaching Academy mentoring",
    "RCA success rate",
    "Residential Coaching Academy success rate",
    "RCA vs other coaching institutes",
    "Residential Coaching Academy vs other institutes",
  ],
  authors: [
    { name: "City IAS/PCS Academy", url: "https://www.cityiasacademy.com" },
  ],
  creator: "City IAS/PCS Academy",
  publisher: "City IAS/PCS Academy",
  category: "Education",
  classification: "IAS Coaching Institute",
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
    locale: "en_IN",
    url: "https://www.cityiasacademy.com",
    siteName: "City IAS Academy",
    title:
      "City IAS Academy - Best IAS & PCS Coaching in Aligarh | Top UPSC Preparation",
    description:
      "City IAS Academy - #1 IAS & PCS Coaching in Aligarh. Expert faculty, comprehensive materials, proven UPSC success. Free Foundation Batch available.",
    images: [
      {
        url: "https://www.cityiasacademy.com/favicon_io/android-chrome-192x192.png?v=2",
        width: 192,
        height: 192,
        alt: "City IAS/PCS Academy - Best IAS Coaching in Aligarh",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "City IAS Academy - Best IAS & PCS Coaching in Aligarh",
    description:
      "City IAS Academy - #1 IAS & PCS Coaching in Aligarh. Expert faculty, comprehensive materials, proven UPSC success. Free Foundation Batch available.",
    images: [
      "https://www.cityiasacademy.com/favicon_io/android-chrome-192x192.png?v=2",
    ],
    // creator: "@cityiasacademy", // Add your actual Twitter handle
    // site: "@cityiasacademy", // Add your actual Twitter handle
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com",
    languages: {
      "en-IN": "https://www.cityiasacademy.com",
      // "hi-IN": "https://www.cityiasacademy.com/hi",
    },
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
    title: "City IAS Academy",
    startUpImage: "/favicon_io/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    // google: "your-google-search-console-verification-code", // Add your actual Google Search Console verification code
    // yandex: "your-yandex-verification-code", // Optional - Add if using Yandex
    // yahoo: "your-yahoo-verification-code", // Optional - Add if using Yahoo
    // other: {
    //   "msvalidate.01": "your-bing-verification-code", // Bing Webmaster Tools - Add if using Bing
    // },
  },
  other: {
    "theme-color": "#1f2937",
    "msapplication-TileColor": "#1f2937",
    "apple-mobile-web-app-title": "City IAS Academy",
    "application-name": "City IAS Academy",
    "msapplication-tooltip": "Best IAS Coaching in Aligarh",
    "geo.region": "IN-UP",
    "geo.placename": "Aligarh",
    "geo.position": "27.8974;78.0880", // Approximate coordinates for Aligarh
    ICBM: "27.8974, 78.0880",
    "DC.title": "City IAS/PCS Academy - Best IAS Coaching in Aligarh",
    "DC.creator": "City IAS/PCS Academy",
    "DC.subject": "IAS Coaching, UPSC Preparation, Civil Services",
    "DC.description": "Leading IAS coaching institute in Kela Nagar, Aligarh",
    "DC.publisher": "City IAS/PCS Academy",
    "DC.contributor": "Expert IAS Faculty",
    "DC.date": new Date().toISOString().split("T")[0],
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": "https://www.cityiasacademy.com",
    "DC.language": "en-IN",
    "DC.coverage": "Aligarh, Uttar Pradesh, India",
    "DC.rights": "Copyright City IAS/PCS Academy",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />

        {/* Additional local business specific meta tags */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Aligarh, Uttar Pradesh" />
        <meta name="geo.position" content="27.8974;78.0880" />
        <meta name="ICBM" content="27.8974, 78.0880" />
        <meta name="locality" content="Kela Nagar" />
        <meta name="region" content="Uttar Pradesh" />
        <meta name="country-name" content="India" />

        {/* Educational Institution specific tags */}
        <meta name="education.type" content="Coaching Institute" />
        <meta name="education.level" content="Higher Education" />
        <meta name="education.subject" content="Civil Services Preparation" />

        {/* Business category */}
        <meta name="business.category" content="Educational Services" />
        <meta name="business.type" content="Coaching Institute" />

        {/* Competitor targeting meta tags */}
        <meta
          name="competitor.keywords"
          content="Pratistha IAS Academy, Katara Academy, JMD Academy, Unacademy Centre Aligarh, RCA, Residential Coaching Academy"
        />
        <meta
          name="local.competitors"
          content="Pratistha IAS Academy, Katara Academy, JMD Academy, CS IAS Academy, Organon Classes, DRISHTI Classes, CARE IAS, Achievers Academy, NCA Law Classes, ICS Coaching Centre, JANNAT Academy, Chandra's Civil Institute, Dr. B.R. Ambedkar IAS Coaching, Aligarh Coaching Centre"
        />
        <meta
          name="location.keywords"
          content="Kela Nagar, Ramghat Road, Marris Road, AMU Campus, Meenakshi Flyover, E-11, GT Road, Darshan Vihar Colony, Diggi Road, Dodhpur Road, Khalsa Complex, Mukundpur"
        />
        <meta
          name="service.differentiation"
          content="24/7 coaching, personal mentoring, hostel facility, expert faculty, RCA status, residential coaching academy, complete study material, mock tests, interview preparation"
        />
        <meta
          name="rca.keywords"
          content="RCA Aligarh, Residential Coaching Academy Aligarh, RCA vs City IAS, Residential Coaching Academy vs City IAS Academy, RCA fees, RCA location, RCA interview preparation"
        />

        {/* WhatsApp-specific meta tags */}
        <meta
          property="og:image"
          content="https://www.cityiasacademy.com/favicon_io/android-chrome-192x192.png?v=2"
        />
        <meta property="og:image:width" content="192" />
        <meta property="og:image:height" content="192" />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content="City IAS/PCS Academy - Best IAS Coaching in Aligarh"
        />

        {/* Additional WhatsApp optimization */}
        <meta
          name="twitter:image"
          content="https://www.cityiasacademy.com/favicon_io/android-chrome-192x192.png?v=2"
        />
        <meta
          name="twitter:image:alt"
          content="City IAS/PCS Academy - Best IAS Coaching in Aligarh"
        />

        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="JeWkUtIJ6x6oW1eT4HTS4-ZlipkeO7ADKcLebQJcwUI"
        />
      </head>

      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {/* Google Analytics - Uncomment and add your GA4 ID */}
        {/* <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA-ID`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR-GA-ID', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script> */}

        {/* Google Custom Search - Uncomment and add your Search Engine ID */}
        {/* <Script id="google-search-console" strategy="afterInteractive">
          {`
            (function() {
              var gcse = document.createElement('script');
              gcse.type = 'text/javascript';
              gcse.async = true;
              gcse.src = 'https://cse.google.com/cse.js?cx=YOUR-SEARCH-ENGINE-ID';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(gcse, s);
            })();
          `}
        </Script> */}

        {/* LocalBusiness Schema Markup */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://www.cityiasacademy.com/#organization",
              name: "City IAS/PCS Academy",
              alternateName: "City IAS Academy",
              description:
                "Leading IAS coaching institute in Kela Nagar, Aligarh, Uttar Pradesh. Providing comprehensive UPSC Civil Services preparation with expert faculty and proven teaching methodology.",
              url: "https://www.cityiasacademy.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.cityiasacademy.com/CityIASLOGO.png",
                width: 400,
                height: 400,
              },
              image: [
                "https://www.cityiasacademy.com/favicon_io/android-chrome-192x192.png?v=2",
                "https://www.cityiasacademy.com/CityIASLOGO.png",
                // "https://www.cityiasacademy.com/academy-building.jpg",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kela Nagar",
                addressLocality: "Aligarh",
                addressRegion: "Uttar Pradesh",
                postalCode: "202001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "27.8974",
                longitude: "78.0880",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 86307 03335",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
                areaServed: "Aligarh",
              },
              openingHours: ["Mo-Sa 11:00-19:00"],
              foundingDate: "2020",
              founder: {
                "@type": "Person",
                name: "Mr. M.R. Khan",
              },
              areaServed: [
                {
                  "@type": "Place",
                  name: "Aligarh",
                },
                {
                  "@type": "Place",
                  name: "Hathras",
                },
                {
                  "@type": "Place",
                  name: "Etah",
                },
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "27.8974",
                  longitude: "78.0880",
                },
                geoRadius: "50000",
              },
              knowsAbout: [
                "IAS Preparation",
                "UPSC Civil Services",
                "General Studies",
                "Current Affairs",
                "Essay Writing",
                "Interview Preparation",
                "Optional Subjects",
                "Prelims Preparation",
                "Mains Preparation",
              ],
              makesOffer: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "EducationalOccupationalProgram",
                  name: "IAS/PCS Coaching Program",
                  description:
                    "Comprehensive UPSC Civil Services preparation program",
                  provider: {
                    "@type": "EducationalOrganization",
                    name: "City IAS/PCS Academy",
                  },
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Saniya Siddiqui",
                  },
                  datePublished: "2024-01-15",
                  reviewBody:
                    "Excellent coaching institute with experienced faculty and comprehensive study materials. The personalized mentoring helped me clear my doubts effectively.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                    worstRating: "1",
                  },
                  itemReviewed: {
                    "@type": "EducationalOrganization",
                    name: "City IAS Academy",
                  },
                },
              ],
              sameAs: [
                // "https://www.facebook.com/cityiasacademy", // Add your actual Facebook page
                // "https://www.twitter.com/cityiasacademy", // Add your actual Twitter handle
                // "https://www.instagram.com/cityiasacademy", // Add your actual Instagram handle
                // "https://www.youtube.com/c/cityiasacademy", // Add your actual YouTube channel
                // "https://www.linkedin.com/company/city-ias-academy", // Add your actual LinkedIn page
              ],
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.cityiasacademy.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Course Schema Markup */}
        <Script
          id="course-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: "IAS/PCS Foundation Course",
              description:
                "Comprehensive UPSC Civil Services preparation course covering all stages - Prelims, Mains, and Interview",
              provider: {
                "@type": "EducationalOrganization",
                name: "City IAS/PCS Academy",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Kela Nagar",
                  addressLocality: "Aligarh",
                  addressRegion: "Uttar Pradesh",
                  postalCode: "202001",
                  addressCountry: "IN",
                },
              },
              offers: {
                "@type": "Offer",
                category: "Education",
                priceCurrency: "INR",
                price: "30000",
                availability: "https://schema.org/InStock",
              },
              courseMode: "Blended",
              educationalLevel: "Higher Education",
              teaches: [
                "General Studies",
                "Current Affairs",
                "Essay Writing",
                "Optional Subjects",
                "Interview Skills",
              ],
              hasCourseInstance: {
                "@type": "CourseInstance",
                name: "IAS/PCS Foundation Course 2024-25",
                courseMode: "Blended",
                startDate: "2024-09-01",
                endDate: "2025-08-31",
                courseSchedule: {
                  "@type": "Schedule",
                  byDay: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  startTime: "11:00",
                  endTime: "19:00",
                  timeZone: "Asia/Kolkata",
                },
                instructor: {
                  "@type": "Person",
                  name: "Mr. M.R. Khan",
                  jobTitle: "Director",
                },
                location: {
                  "@type": "Place",
                  name: "City IAS Academy",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Kela Nagar",
                    addressLocality: "Aligarh",
                    addressRegion: "Uttar Pradesh",
                    postalCode: "202001",
                    addressCountry: "IN",
                  },
                },
              },
            }),
          }}
        />

        {/* Website Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "City IAS/PCS Academy",
              url: "https://www.cityiasacademy.com",
              description:
                "Best IAS coaching institute in Aligarh, Uttar Pradesh",
              publisher: {
                "@type": "EducationalOrganization",
                name: "City IAS/PCS Academy",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.cityiasacademy.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: [
                // "https://www.facebook.com/cityiasacademy", // Add your actual Facebook page
                // "https://www.twitter.com/cityiasacademy", // Add your actual Twitter handle
                // "https://www.instagram.com/cityiasacademy", // Add your actual Instagram handle
              ],
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.cityiasacademy.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "IAS Coaching Aligarh",
                  item: "https://www.cityiasacademy.com/ias-coaching-aligarh",
                },
              ],
            }),
          }}
        />

        {/* FAQ Schema Markup */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Which is the best IAS coaching in Aligarh?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "City IAS Academy is the best IAS coaching institute in Aligarh with expert faculty, comprehensive study materials, and proven success rate. Located in Kela Nagar, we offer personalized mentoring and 24/7 support.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does City IAS Academy compare to Pratistha IAS Academy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "While Pratistha IAS Academy has good ratings, City IAS Academy offers better personalized attention, smaller batch sizes, and more comprehensive study materials. Our location in Kela Nagar is more accessible for students.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which IAS coaching is better - Katara Academy or City IAS Academy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "City IAS Academy provides better value with experienced faculty, comprehensive study materials, and personalized mentoring. Our success rate and student satisfaction are higher than Katara Academy.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the IAS coaching fees in Aligarh?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "City IAS Academy offers competitive fees with FREE coaching program (₹100 application fee + ₹1000 registration) and Foundation Batch for ₹30,000 (10 months). We provide better value compared to other institutes with comprehensive study materials and expert faculty included.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there IAS coaching near AMU campus?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, City IAS Academy is conveniently located near Kela Nagar, easily accessible from AMU campus. We also offer hostel facilities for outstation students.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is RCA in Aligarh?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "RCA stands for Residential Coaching Academy. City IAS Academy is also an RCA, offering complete residential coaching with hostel facilities, 24/7 support, and comprehensive study materials for UPSC preparation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which is better - RCA or City IAS Academy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "City IAS Academy is also an RCA (Residential Coaching Academy) and offers better personalized attention, smaller batch sizes, and more comprehensive study materials compared to other RCAs in Aligarh.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does City IAS Academy offer hostel facilities?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, City IAS Academy offers complete hostel facilities as part of our RCA (Residential Coaching Academy) program. We provide comfortable accommodation, 24/7 study support, and comprehensive coaching.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Competitor Comparison Schema Markup */}
        <Script
          id="competitor-comparison-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ComparisonPage",
              name: "Best IAS Coaching in Aligarh - Complete Comparison 2024",
              description:
                "Compare top IAS coaching institutes in Aligarh: City IAS Academy, Pratistha IAS Academy, Katara Academy, JMD Academy, and more. Find the best UPSC coaching with expert faculty and proven results.",
              url: "https://www.cityiasacademy.com/ias-coaching-comparison-aligarh",
              mainEntity: [
                {
                  "@type": "EducationalOrganization",
                  name: "City IAS Academy",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Kela Nagar",
                    addressLocality: "Aligarh",
                    addressRegion: "Uttar Pradesh",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "200",
                  },
                  priceRange: "₹₹",
                  description:
                    "Leading IAS coaching institute with expert faculty and comprehensive study materials. Offers FREE coaching program and Foundation Batch for ₹30,000.",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Pratistha IAS Academy",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Near Meenakshi Flyover, Ramghat Rd",
                    addressLocality: "Aligarh",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "649",
                  },
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Katara Academy",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Ramghat Rd, Near Meenakshi Bridge",
                    addressLocality: "Aligarh",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.7",
                    reviewCount: "671",
                  },
                },
              ],
            }),
          }}
        />

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
