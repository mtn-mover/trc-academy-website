import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://trctrainingacademy.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/teacher/',
          '/student/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
