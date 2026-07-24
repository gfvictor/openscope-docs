import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { OpenScopeLogo } from '@/components/ui/openscope-logo'
import { ExternalLink } from 'lucide-react'

export function baseOptions(lang?: string): BaseLayoutProps {
  const navUrl = lang && lang !== 'ja' ? `/${lang}` : '/'
  const isPt = !lang || lang === 'pt'
  const officialSiteText = (
    <span className="flex items-center gap-2">
      {isPt ? 'Site Oficial' : lang === 'ja' ? '公式サイト' : 'Official Site'}
      <ExternalLink className="h-3.5 w-3.5 opacity-40 text-fd-muted-foreground" />
    </span>
  )
  const demosText = isPt ? 'Demonstrações' : lang === 'ja' ? 'デモ' : 'Demos'

  return {
    i18n: false,
    themeSwitch: { enabled: false },
    nav: {
      url: navUrl,
      title: (
        <OpenScopeLogo className="text-foreground mt-2 mb-2 h-10 w-auto shrink-0 transition-transform hover:scale-105" />
      ),
    },
    links: [
      {
        text: officialSiteText,
        url: 'https://openscope-systems.com',
        active: 'nested-url',
      },
      {
        type: 'menu',
        text: demosText,
        items: [
          { 
            text: (
              <span key="entori" className="flex items-center gap-2">
                <img src="/img/entori-logo.png" alt="" className="h-4 w-4 opacity-70 dark:invert" />
                EnTori <ExternalLink className="h-3.5 w-3.5 opacity-40 text-fd-muted-foreground" />
              </span>
            ), 
            url: 'https://demo.entori.rakudash.com' 
          },
          { 
            text: (
              <span key="rakudash" className="flex items-center gap-2">
                <img src="/img/rakudash-logo.svg" alt="" className="h-4 w-4 opacity-70 dark:invert" />
                Rakudash <ExternalLink className="h-3.5 w-3.5 opacity-40 text-fd-muted-foreground" />
              </span>
            ), 
            url: 'https://demo.rakudash.com' 
          },
          { 
            text: (
              <span key="wanspot" className="flex items-center gap-2">
                <img src="/img/wanspot-logo.svg" alt="" className="h-4 w-4 opacity-70 dark:invert" />
                WanSpot <ExternalLink className="h-3.5 w-3.5 opacity-40 text-fd-muted-foreground" />
              </span>
            ), 
            url: 'https://demo.wanspot.rakudash.com' 
          },
        ],
      },
    ],
  }
}
