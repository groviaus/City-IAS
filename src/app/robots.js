export default function robots() {
  const baseUrl = process.env.SITE_URL || "https://www.cityiasacademy.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
