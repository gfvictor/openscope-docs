import './global.css'
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
  title: 'OpenScope Docs',
  description: 'Rakudash - Official Product Documentation',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${geistSans.variable} ${geistSans.className}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
