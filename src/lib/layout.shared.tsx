import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { OpenScopeLogo } from '@/components/ui/openscope-logo'

export function baseOptions(): BaseLayoutProps {
  return {
    i18n: false,
    themeSwitch: { enabled: false },
    nav: {
      title: (
        <OpenScopeLogo className="text-foreground mt-2 mb-2 h-10 w-auto shrink-0 transition-transform hover:scale-105" />
      ),
    },
    links: [
      {
        text: 'Official Site',
        url: 'https://openscope-systems.com',
        active: 'nested-url',
      },
      {
        type: 'menu',
        text: 'Demos',
        items: [
          { text: 'Rakudash', url: 'https://demo.rakudash.com' },
          { text: 'EnTori', url: 'https://demo.entori.rakudash.com' },
          { text: 'WanSpot', url: 'https://demo.wanspot.rakudash.com' },
        ],
      },
    ],
  }
}
