// app/applications/page.tsx
import axios from 'axios';
import AppCard from '@/components/AppCard/AppCard';
import { cookies } from 'next/headers';
import { ApplicationData } from '@/schema/types';
import stylecss from './page.module.css';
import Image from 'next/image';
import LogoutProp from '@/components/Logout/LogoutProp';

export const dynamic = 'force-dynamic';

interface TokenResponse {
  token: string;
  status: number;
}

export default async function ApplicationsPage() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('token')?.value;
  const userId = cookieStore.get('userId')?.value;

  if (!token || !userId) {
    return <div style={{ color: 'red' }}>Not authenticated</div>;
  }

  let appData: ApplicationData[] = [];
  let appCardsWithTokens: { app: ApplicationData; appToken: string }[] = [];

  try {
    // Step 1: Get Applications
    const payload = { UserId: userId, token };
    const res = await axios.post('https://testuatgate.rediport.in/api/UserLogin/getactiveapplications', payload);
    appData = res.data || [];
    console.log('Application Data:', appData);

    // Step 2: Get Token for each App using Axios
    const tokenPromises = appData.map(async (app) => {
      const tokenPayload = {
        UserId: userId,
        token: token,
        ApplicationId: app.applicationCode,
      };

      const tokenRes = await axios.post<TokenResponse>(
        'https://testuatgate.rediport.in/api/UserLogin/getApplicationURL',
        tokenPayload
      );
      console.log('Token Response:', tokenRes.data);

      return {
        app,
        appToken: tokenRes.data.token,
      };
    });

    appCardsWithTokens = await Promise.all(tokenPromises);

  } catch (error) {
    console.error('Error fetching apps or tokens:', error);
    return <div style={{ color: 'red' }}>Error loading applications</div>;
  }

  return (
    <div className={stylecss.background}>
      <div className={stylecss.header}>
        <Image src="/image.png" alt="Logo" width={145} height={40} className={stylecss.image} />
        <LogoutProp />
      </div>
      <div className={stylecss.main}>
        {appCardsWithTokens.map(({ app, appToken }, index) => (
          <AppCard key={index} item={app} appToken={appToken} />
        ))}
      </div>
    </div>
  );
}
