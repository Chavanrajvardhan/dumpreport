
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    

    const path = request.nextUrl.pathname

    const isPublicPath = path === '/'


    //get token from local storage 
    const token = request.cookies.get('token')?.value;
    

    // if(isPublicPath && token ){
    //     return NextResponse.redirect(new URL('/home', request.url))
    // }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/home',
    '/dashboard',
    '/allprojectaccess',
  ],

}