import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://ceasefire-watch.vercel.app/sitemap.xml' }
}
