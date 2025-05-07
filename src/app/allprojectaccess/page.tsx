"use client";

import React, { useEffect, useState } from 'react'
import stylecss from './page.module.css'
import Image from 'next/image'
import AppCard from '@/component/AppCard/AppCard'
import axios from 'axios'

const page = () => {

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEYXRhIjoieGVVOFVWalBVWml3dENRcUkyMENwMXJ6T3doaVFkQ2UzejJqWXhtQy9aU3BiSWZubUdxeEM5dDcyVkJ6TkZnR2dKaTVIemhEQlFUaGErd053TFJjK0oxRmtVWTlSVGdMbzkyaDdveWFTMXBxdzhrZExtSWVHNzBzZmt0NlpaYnRtRnJDOVdwd0VKNm9JWHdtM3A5WHd3PT0iLCJuYmYiOjE3NDY1MjkzNzgsImV4cCI6MTc0NjU0NzM3OCwiaWF0IjoxNzQ2NTI5Mzc4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2OSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQzNjkifQ.ltKBVdP1LMmPP3vovgNoQtV3onpQfKxtoQUiaK_s0YU";

        localStorage.setItem("token", token);
        const token1 = localStorage.getItem("token");

        if (token1) {
          const data = {
            UserId: 3,
            token: token1,
          };

          const response = await axios.post("api/allprojectaccess", data);
          if (
            response?.data?.message === "Success" || response.status === 200) {
            // console.log(response.data);
            setData(response.data);
          } else {
            console.log("Unexpected response:", response);
          }
        } else {
          console.log("Token not found");
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className={stylecss.background}>
        <div className={stylecss.header}>
          <Image src={"/image.png"} alt={"jaj image"} width={145} height={40} className={stylecss.image} />
          <Image src={"/logout.svg"} alt={"logout image"} width={18} height={18} />
        </div >
        <div className={stylecss.main}>
          {data.map((item: any, index: number) => (
            <AppCard key={index} item={item} />
          ))}
        </div>

      </div>
    </>
  )
}

export default page