// 'use client';

// import React, { useEffect, useState } from 'react';
// import AppCard from '@/components/AppCard/AppCard';
// import { AppWithToken } from '@/schema/types';
// import stylecss from './page.module.css';
// import Image from 'next/image';
// import LogoutProp from '@/components/Logout/LogoutProp';
// import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
// // import { set } from 'react-hook-form';




// export default function ApplicationsPage() {
//   const [appCardsWithTokens, setAppCardsWithTokens] = useState<AppWithToken[]>([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const fetchApps = async () => {
//       try {
//         const res = await fetch('/api/AppValidation/Applications');
//         if (!res.ok) {
//           const err = await res.json();
//           throw new Error(err.error || 'Unknown error');
//         }
        
//         const data = await res.json();
//         setAppCardsWithTokens(data);
//         setLoading(false);
//       } catch (err: any) {
//         console.error('Fetch error:', err.message);
//         setError(err.message || 'Error loading applications');
//       }
//     };

//     fetchApps();
//   }, []);

//   if (error) return <div style={{ color: 'red' }}>{error}</div>;

//   return (

//     <>
//       {loading && <LoadingScreen />}
//       <div className={stylecss.background}>
//         <div className={stylecss.header}>
//           <Image src="/image.png" alt="Logo" width={145} height={40} className={stylecss.image} />
//           <LogoutProp />
//         </div>
//         <div className={stylecss.main}>
//           {appCardsWithTokens.map(({ app, appToken }, index) => (
//             <AppCard key={index} item={app} appToken={appToken} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import AppCard from '@/components/AppCard/AppCard';
import { ApplicationData } from '@/schema/types';
import stylecss from './page.module.css';
import Image from 'next/image';
import LogoutProp from '@/components/Logout/LogoutProp';
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { set } from 'react-hook-form';




export default function ApplicationsPage() {
  const [data, setData] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post('/api/AppValidation/getactiveapplications'); 
        if (res.status === 200) {
          setData(res.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.error("Error fetching data");
        }
      } catch (error: any) {
        setLoading(false);
        console.error("Error in fetching data:", error.message);
        router.push('/error'); // Redirect to error page
      }
    };

    fetchData();
  }, []);



  return (

    <>
      {loading && <LoadingScreen />}
       <div className={stylecss.background}>
      <div className={stylecss.header}>
        <Image src={"/image.png"} alt={"jaj image"} width={145} height={40} className={stylecss.image} />
        <LogoutProp />
      </div>
      <div className={stylecss.main}>
        {data.map((item, index) => (
          <AppCard key={index} item={item} />
        ))}
      </div>
    </div>
    </>
  );
}
