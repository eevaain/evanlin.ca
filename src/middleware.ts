import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const legacyArticlePaths = new Set([
  '/writing/exploring%20attnres',
  '/writing/exploring attnres',
  '/reading/exploring%20attnres',
  '/reading/exploring attnres',
]);

export function middleware(request: NextRequest) {
  if (legacyArticlePaths.has(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/writing/exploring-attnres';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/writing/:path*', '/reading/:path*'],
};
