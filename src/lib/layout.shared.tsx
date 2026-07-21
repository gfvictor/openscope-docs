import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { OpenScopeLogo } from '@/components/ui/openscope-logo'

export function baseOptions(lang?: string): BaseLayoutProps {
  const navUrl = lang && lang !== 'ja' ? `/${lang}` : '/'
  const isPt = !lang || lang === 'pt'
  const officialSiteText = isPt ? 'Site Oficial' : lang === 'ja' ? '公式サイト' : 'Official Site'
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
          { text: 'Rakudash', url: 'https://demo.rakudash.com' },
          { text: 'EnTori', url: 'https://demo.entori.rakudash.com' },
          { text: 'WanSpot', url: 'https://demo.wanspot.rakudash.com' },
        ],
      },
    ],
  }
}
