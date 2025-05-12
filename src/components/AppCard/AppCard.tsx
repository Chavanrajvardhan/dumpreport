// components/AppCard/AppCard.tsx
'use client';

import React from 'react';
import stylecss from './AppCard.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ApplicationData } from '../../schema/types';

interface AppCardProps {
  item: ApplicationData;
  appToken: string;
}

const AppCard: React.FC<AppCardProps> = ({ item, appToken }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const payload = {
        ApplicationToken: appToken,
        AppId: item.applicationCode,
        RoleName: item.applicationRole,
        DistributorCode: item.distributorCode ?? '',
        WWID: item.wwid ?? '',
      };

      const validApp = await fetch('/api/AppValidation/ValidateEntGateLoginApplicationToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const validAppData = await validApp.json();

      if (validAppData.status === 200 && validAppData.message === 'Success') {
        router.push('/dashboard');
      } else {
        alert('You are not authorized to access this application');
      }

    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <div onClick={handleClick} className={stylecss.card}>
      <Image className={stylecss.image} src="/jnj_logo.png" alt="jaj_logo" width={65} height={20} />
      <div className={stylecss.text}>
        <div className={stylecss.font1}>{item.applicationName}</div>
        <div className={stylecss.font2}>{item.applicationRole}</div>
        <div className={stylecss.font3}>{item.applicationDescription}</div>
      </div>
    </div>
  );
};

export default AppCard;
