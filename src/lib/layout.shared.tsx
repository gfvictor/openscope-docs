import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { OpenScopeLogo } from '@/components/ui/openscope-logo'

export function baseOptions(): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: (
        <OpenScopeLogo className="h-10 w-auto text-foreground transition-transform hover:scale-105" />
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
          { text: 'WanSpot', url: 'https://demo.wanspot.rakudash.com' }
        ]
      }
    ]
  } 
}
