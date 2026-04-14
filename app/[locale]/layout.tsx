import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'
import { FeedbackButton } from '@/components/FeedbackButton'

export const metadata: Metadata = {
  title: {
    default: 'Ceasefire Watch | Real-Time Intelligence',
    template: '%s | Ceasefire Watch'
  },
  description: 'Tracking active ceasefire negotiations, peace agreements, and violation reports in conflict zones worldwide',
  keywords: 'ceasefire watch, peace negotiations, armistice, ceasefire violations, conflict resolution',
  openGraph: {
    type: 'website',
    siteName: 'Ceasefire Watch',
    title: 'Ceasefire Watch | Real-Time Intelligence',
    description: 'Tracking active ceasefire negotiations, peace agreements, and violation reports in conflict zones worldwide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceasefire Watch',
    description: 'Tracking active ceasefire negotiations, peace agreements, and violation reports in conflict zones worldwide',
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
    'indexnow-key': 'ceasefire-watch-2025',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ceasefire Watch",
              "url": "https://ceasefire-watch.vercel.app",
              "description": "Tracking active ceasefire negotiations, peace agreements, and violation reports in conflict zones worldwide",
              "publisher": {
                "@type": "Organization",
                "name": "Ceasefire Watch",
                "url": "https://ceasefire-watch.vercel.app"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://ceasefire-watch.vercel.app/?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <FeedbackButton siteName="Ceasefire Watch" siteUrl="https://ceasefire-watch.vercel.app" />
      </body>
    </html>
  )
}
