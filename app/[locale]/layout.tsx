import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'

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
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
