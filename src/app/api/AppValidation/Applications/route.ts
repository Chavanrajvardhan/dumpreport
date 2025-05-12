// app/api/getApplications/route.ts

import { cookies } from 'next/headers';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { ApplicationData, AppWithToken } from '@/schema/types';


export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userId = cookieStore.get('userId')?.value;

    if (!token || !userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Step 1: Get Applications
    const payload = { UserId: userId,token: token };

    const res = await axios.post<ApplicationData[]>('https://testuatgate.rediport.in/api/UserLogin/getactiveapplications', payload);

        const appData: ApplicationData[] = res.data || [];


    // const appData = res.data || [];

    // Step 2: Get Token for each App
    const tokenPromises :Promise<AppWithToken>[] = appData.map(async (app: ApplicationData): Promise<AppWithToken> => {
      const tokenPayload = {
        UserId: userId,
        token : token,
        ApplicationId: app.applicationCode,
      };

      const tokenRes = await axios.post<{token : string}>(
        'https://testuatgate.rediport.in/api/UserLogin/getApplicationURL',
        tokenPayload
      );
     console.log('Token Response:', tokenRes.data);
      return {
        app,
        appToken: tokenRes.data.token,
      };
    });

    const appCardsWithTokens : AppWithToken[]  = await Promise.all(tokenPromises);

    return NextResponse.json(appCardsWithTokens);
  } catch (error) {
    console.error('Error in /api/getApplications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
