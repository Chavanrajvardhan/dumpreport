'use client'

import React from 'react'
import stylecss from './AppCard.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const AppCard = ({ item }: { item: any }) => {

  const router = useRouter()
  
  
  const handleClick = async () => {
    const ApplicationID = item.applicationCode; ;
    // console.log("ApplicationID", ApplicationID);
    try {
      const res :any = await axios.post("api/AppValidation/getApplicationURL", {ApplicationID} );

      console.log("Token generate successfully");
      // console.log("Response:", res.data.result.token);
      if(res.status != 200) {
        throw new Error("Failed to fetch project data");
      }
      
      const token = res.data.result.token;
      // console.log("Token:", token);
      const payload = {
        ApplicationToken: token,
        AppId: item.applicationCode,
        RoleName: item.applicationRole,
        DistributorCode: item.distributorCode,
        WWID: item.wwid
      };
      const validApp : any = await axios.post("api/AppValidation/ValidateEntGateLoginApplicationToken", payload)
      console.log("Response:", validApp);
      if(validApp.data.status != 200) {
        throw new Error("Failed to fetch project data");
      }
      

      if(validApp.data.message === "Success") {
        router.push("/dashboard");
      }else{
        alert("You are not authorized to access this application")
      }
    }
    catch (error) {
      console.error("Error while validating access:", error);
    }

  };
  return (
      <div onClick={handleClick} className={stylecss.card}>
        <Image className={stylecss.image} src={"/jnj_logo.png"} alt={"jaj_logo"} width={65} height={20} />
        <div className={stylecss.text}>
          <div className={stylecss.font1}>{item.applicationName}</div>
          <div className={stylecss.font2}>{item.applicationRole}</div>
          <div className={stylecss.font3}>{item.applicationDescription}</div>
        </div>
      </div>
   
    
  )
}
export default AppCard