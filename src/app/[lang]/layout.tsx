import '../global.css'
import { Inter, Geist } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://docs.rakudash.com'
  ),
  title: 'OpenScope Docs',
  description: 'Rakudash - Official Product Documentation',
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }> | { lang: string }
}) {
  const resolvedParams = await Promise.resolve(params)

  return (
    <html lang={resolvedParams.lang} className={`${inter.variable} ${geistSans.variable} ${geistSans.className}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          i18n={{
            locale: resolvedParams.lang,
            locales: [
              { locale: 'pt', name: 'Português' },
              { locale: 'en', name: 'English' },
              { locale: 'ja', name: '日本語' },
            ]
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
