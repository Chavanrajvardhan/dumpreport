// 'use client';
 
// import React, { useState } from 'react';
// import stylecss from './AppCard.module.css';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { AppCardProps } from '../../schema/types';
// import LoadingScreen from '../LoadingScreen/LoadingScreen';
 

 
// const AppCard: React.FC<AppCardProps> = ({ item, appToken }) => {
//   const router = useRouter();
//   const [loading,setLoading] = useState(false);
 
//   const handleClick = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         ApplicationToken: appToken,
//         AppId: item.applicationCode,
//         RoleName: item.applicationRole,
//         DistributorCode: item.distributorCode ?? '',
//         WWID: item.wwid ?? '',
//       };
 
//       const validApp = await fetch('/api/AppValidation/ValidateEntGateLoginApplicationToken', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
 
//       const validAppData = await validApp.json();
 
//       if (validAppData.status === 200 && validAppData.message === 'Success') {
//         router.push('/dashboard');
//         setLoading(false);
//       } else {
//         alert('You are not authorized to access this application');
//         setLoading(false);
//       }
 
//     } catch (error) {
//       console.error('Validation error:', error);
//       setLoading(false);
//     }
//   };
 
//   return (
//     <>
//     {loading && <LoadingScreen/>}
//     <div onClick={handleClick} className={stylecss.card}>
//       <Image className={stylecss.image} src="/jnj_logo.png" alt="jaj_logo" width={65} height={20} />
//       <div className={stylecss.text}>
//         <div className={stylecss.font1}>{item.applicationName}</div>
//         <div className={stylecss.font2}>{item.applicationRole}</div>
//         <div className={stylecss.font3}>{item.applicationDescription}</div>
//       </div>
//     </div>
//     </>
//   );
// };
 
// export default AppCard;



'use client'

import React from 'react';
import stylecss from './AppCard.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ApplicationData } from '../../schema/types'; // adjust path
import LoadingScreen from '../LoadingScreen/LoadingScreen';

interface TokenResponse {
  result: {
    token: string;
  };
  status: number;
}

interface ValidationResponse {
  status: number;
  message: string;
}

const AppCard: React.FC<{ item: ApplicationData }> = ({ item }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {

      setLoading(true);
      const ApplicationID = item.applicationCode;

      const res = await axios.post<TokenResponse>("api/AppValidation/getApplicationURL", {
        ApplicationID
      });

      if (res.status !== 200) {
        setLoading(false);
        throw new Error("Failed to fetch project data");
      }

      const token = res.data.result.token;

      const payload = {
        ApplicationToken: token,
        AppId: item.applicationCode,
        RoleName: item.applicationRole,
        DistributorCode: item.distributorCode ?? "",
        WWID: item.wwid ?? ""
      };

      const validApp = await axios.post<ValidationResponse>("api/AppValidation/ValidateEntGateLoginApplicationToken", payload);

      if (validApp.data.status !== 200) {
        setLoading(false);
        throw new Error("Failed to validate project data");
      }

      if (validApp.data.message === "Success") {
        router.push("/coe/report");
      } else {
        setLoading(false);
        alert("You are not authorized to access this application");
      }

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error while validating access:", message);
      // throw new Error("Error while validating access");
      router.push("/error");
    }
  };

  return (

    <>
    {loading && <LoadingScreen/>}
    <div onClick={handleClick} className={stylecss.card}>
      <Image className={stylecss.image} src={"/jnj_logo.png"} alt={"jaj_logo"} width={65} height={20} />
      <div className={stylecss.text}>
        <div className={stylecss.font1}>{item.applicationName}</div>
        <div className={stylecss.font2}>{item.applicationRole}</div>
        <div className={stylecss.font3}>{item.applicationDescription}</div>
      </div>
    </div>
    </>
  );
};

export default AppCard;