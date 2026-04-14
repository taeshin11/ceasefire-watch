import { MetadataRoute } from 'next'
import talks from '@/public/data/talks.json'

const BASE_URL = 'https://ceasefire-watch.vercel.app'
const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    entries.push({ url: `${BASE_URL}/${locale}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 })
    entries.push({ url: `${BASE_URL}/${locale}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 })
    for (const talk of talks) {
      entries.push({ url: `${BASE_URL}/${locale}/talks/${talk.id}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 })
    }
  }

  return entries
}
