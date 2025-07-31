export default function sitemap() {
  const baseUrl = process.env.SITE_URL || "https://www.cityiasacademy.com";

  // Get current date for lastModified
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/course-delivery`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: currentDate,
    },
  ];
}
