import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { baseOptions } from '@/lib/layout.shared'

import { SidebarFooter } from '@/components/ui/sidebar-footer'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      {...baseOptions()}
      sidebar={{
        className: 'items-start w-[260px]',
        footer: <SidebarFooter />,
      }}
    >
      {children}
    </DocsLayout>
  )
}
