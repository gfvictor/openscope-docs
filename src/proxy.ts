import { NextRequest, NextResponse } from 'next/server'
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation'
import { docsContentRoute, docsRoute } from '@/lib/shared'
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware'
import { i18n } from '@/lib/i18n'

const i18nMiddleware = createI18nMiddleware(i18n)

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
)
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
)

export default function proxy(request: NextRequest, event: any) {
  console.log('MIDDLEWARE EXECUTING FOR:', request.nextUrl.pathname)
  const resultSuffix = rewriteSuffix(request.nextUrl.pathname)
  if (resultSuffix) {
    return NextResponse.rewrite(new URL(resultSuffix, request.nextUrl))
  }

  if (isMarkdownPreferred(request)) {
    const resultDocs = rewriteDocs(request.nextUrl.pathname)
    if (resultDocs) {
      return NextResponse.rewrite(new URL(resultDocs, request.nextUrl))
    }
  }

  return i18nMiddleware(request, event)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg|icon.png).*)'],
}
