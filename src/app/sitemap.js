export default function sitemap() {
  const baseUrl = process.env.SITE_URL || "https://www.cityiasacademy.com";

  // Get current date for lastModified
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/course-delivery`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // Core Service Pages (High Priority)
    {
      url: `${baseUrl}/ias-coaching-aligarh`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/upsc-coaching-aligarh`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ias-preparation-course`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ias-interview-preparation`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ias-study-material`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ias-coaching-fees-aligarh`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Competitor Comparison Pages (Medium Priority)
    {
      url: `${baseUrl}/ias-coaching-comparison-aligarh`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pratistha-ias-academy-vs-city-ias`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/katara-academy-vs-city-ias`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/jmd-academy-vs-city-ias`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/best-ias-coaching-aligarh-2024`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Location-specific Pages (High Priority)
    {
      url: `${baseUrl}/ias-coaching-kela-nagar`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ias-coaching-near-amu-campus`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ias-coaching-ramghat-road`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ias-coaching-marris-road`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Service Differentiation Pages (Medium Priority)
    {
      url: `${baseUrl}/ias-coaching-with-hostel`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/24-7-ias-coaching-aligarh`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ias-coaching-with-mentoring`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ias-coaching-success-stories`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // PCS Coaching Page (High Priority)
    {
      url: `${baseUrl}/pcs-coaching-aligarh`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
