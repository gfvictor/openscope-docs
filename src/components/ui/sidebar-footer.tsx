'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const locales = [
  { code: 'en', label: 'en' },
  { code: 'ja', label: 'ja' },
  { code: 'pt', label: 'pt' },
]

export function SidebarFooter() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const defaultLocale = 'ja'

  const getLocalizedPath = (newLocale: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    const hasLocalePrefix = segments.length > 1 && locales.some((l) => l.code === segments[1])

    if (hasLocalePrefix) {
      if (newLocale === defaultLocale) {
        segments.splice(1, 1)
        return segments.join('/') || '/'
      }
      segments[1] = newLocale
      return segments.join('/')
    }

    if (newLocale === defaultLocale) return pathname
    return `/${newLocale}${pathname === '/' ? '' : pathname}`
  }

  const segments = pathname ? pathname.split('/') : []
  const currentLocale =
    segments.length > 1 && locales.some((l) => l.code === segments[1]) ? segments[1] : defaultLocale

  return (
    <div className="mt-auto flex flex-row items-center justify-between border-t px-8 py-4">
      <div className="flex gap-2">
        {locales.map((locale) => {
          const isActive = currentLocale === locale.code
          return (
            <Link
              key={locale.code}
              href={getLocalizedPath(locale.code)}
              className={`px-2 py-1 text-xs font-semibold uppercase transition-colors ${isActive ? 'text-fd-foreground border-fd-primary border-b' : 'text-fd-muted-foreground hover:text-fd-foreground'}`}
            >
              {locale.label}
            </Link>
          )
        })}
      </div>

      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent rounded-md p-1.5 transition-colors"
        aria-label="Toggle theme"
      >
        {mounted && theme === 'dark' ? (
          <Moon className="h-4 w-4" fill="currentColor" />
        ) : (
          <Sun className="h-4 w-4" fill="currentColor" />
        )}
      </button>
    </div>
  )
}
