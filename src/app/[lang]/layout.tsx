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
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://docs.rakudash.com',
  ),
  title: {
    template: 'Docs | %s',
    default: 'Docs | Rakudash',
  },
  description: 'Rakudash - Official Product Documentation',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }> | { lang: string }
}) {
  const resolvedParams = await Promise.resolve(params)

  const translationsMap: Record<string, any> = {
    pt: {
      'Search(search trigger)': 'Buscar',
      'Search(search dialog)': 'Buscar na documentação',
      'On this page(table of contents)': 'Nesta página',
      'No results found(search dialog)': 'Nenhum resultado',
      'Choose a language(language switcher)': 'Escolha o idioma',
    },
    en: {
      'Search(search trigger)': 'Search',
      'Search(search dialog)': 'Search documentation',
      'On this page(table of contents)': 'On this page',
      'No results found(search dialog)': 'No results found',
      'Choose a language(language switcher)': 'Choose language',
    },
    ja: {
      'Search(search trigger)': '検索',
      'Search(search dialog)': 'ドキュメントを検索',
      'On this page(table of contents)': '目次',
      'No results found(search dialog)': '結果がありません',
      'Choose a language(language switcher)': '言語を選択',
    },
  }

  return (
    <html
      lang={resolvedParams.lang}
      className={`${inter.variable} ${geistSans.variable} ${geistSans.className}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          i18n={{
            locale: resolvedParams.lang,
            locales: [
              { locale: 'pt', name: 'Português' },
              { locale: 'en', name: 'English' },
              { locale: 'ja', name: '日本語' },
            ],
            translations: translationsMap[resolvedParams.lang],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
