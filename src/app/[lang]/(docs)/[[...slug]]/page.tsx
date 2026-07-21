import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '@/components/mdx'
import type { Metadata } from 'next'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { gitConfig } from '@/lib/shared'

import { ExternalLink } from 'lucide-react'

export default async function Page(props: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()

  const MDX = page.data.body

  const topLevel = page.slugs[0]
  let demoUrl = ''
  let demoName = ''

  const isPt = !params.lang || params.lang === 'pt'
  const isJa = params.lang === 'ja'

  if (topLevel === 'entori') {
    demoUrl = 'https://demo.entori.rakudash.com'
    demoName = isPt ? 'Ver Demo do EnTori' : isJa ? 'EnToriのデモを見る' : 'View EnTori Demo'
  } else if (topLevel === 'wanspot') {
    demoUrl = 'https://demo.wanspot.rakudash.com'
    demoName = isPt ? 'Ver Demo do WanSpot' : isJa ? 'WanSpotのデモを見る' : 'View WanSpot Demo'
  } else if (topLevel === 'rakudash') {
    demoUrl = 'https://demo.rakudash.com'
    demoName = isPt ? 'Ver Demo do Rakudash' : isJa ? 'Rakudashのデモを見る' : 'View Rakudash Demo'
  }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>

      {demoUrl && (
        <div className="mt-4 flex flex-row items-center gap-2 border-b pb-6">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-fd-border text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex items-center gap-1.5 rounded-md border bg-transparent px-3 py-1.5 text-xs font-medium transition-colors"
          >
            {demoName}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  }
}
