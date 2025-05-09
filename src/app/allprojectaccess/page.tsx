// src/app/allprojectaccess/page.tsx
import Image from 'next/image';
import AppCard from '../../components/AppCard/AppCard';
import stylecss from './page.module.css';
import LogoutProp from '../../components/Logout/LogoutProp';
import axios from 'axios';
import { cookies } from 'next/headers';

async function getData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userId = cookieStore.get('userId')?.value;
 
    const response = await axios.post("http://localhost:3000/api/AppValidation/getactiveapplications", { token,userId });
 
    if (response.status != 200) {
      console.log("Error fetching data");
    }
    // console.log("after api hit");
   
    // console.log(response.data.data);
   
    return response.data.data;
 
  } catch (error: any) {
    console.log("Error in getData:", error.message);
    return [];
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <div className={stylecss.background}>
      <div className={stylecss.header}>
        <Image src={"/image.png"} alt={"jaj image"} width={145} height={40} className={stylecss.image} />
        <LogoutProp />
      </div>
      <div className={stylecss.main}>
        {data.map((item: any, index: number) => (
          <AppCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
