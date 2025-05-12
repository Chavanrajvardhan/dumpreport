'use client';

import React, { useEffect, useState } from 'react';
import AppCard from '@/components/AppCard/AppCard';
import { AppWithToken } from '@/schema/types';
import stylecss from './page.module.css';
import Image from 'next/image';
import LogoutProp from '@/components/Logout/LogoutProp';
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
// import { set } from 'react-hook-form';




export default function ApplicationsPage() {
  const [appCardsWithTokens, setAppCardsWithTokens] = useState<AppWithToken[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchApps = async () => {
      try {
        const res = await fetch('/api/AppValidation/Applications');
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Unknown error');
        }

        const data = await res.json();
        setAppCardsWithTokens(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Fetch error:', err.message);
        setError(err.message || 'Error loading applications');
      }
    };

    fetchApps();
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (

    <>
      {loading && <LoadingScreen />}
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
    </>
  );
}
