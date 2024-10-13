import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/write', '/profile(.*)',]);

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {

  if (isProtectedRoute(req)) {
      auth().protect();
  }
  if(isAdminRoute(req) && auth().sessionClaims?.metadata.role!=="ADMIN"){
     const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
  
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes,
    '/(api|trpc)(.*)',
  ],
};
