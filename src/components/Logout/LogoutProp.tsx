'use client'

import React from 'react'
import Image from 'next/image'
import { logoutAction } from '../../app/api/user/logout/route'; // adjust path as needed
import { useRouter } from 'next/navigation';

const LogoutProp = () => {
  const route = useRouter();
  const handleLogout = async () => {
  await logoutAction();
  route.push("/login"); // Redirect to login page after logout
  }
  return (
    <>
            <Image onClick={handleLogout} src={"/logout.svg"} alt={"logout image"} width={18} height={18} />

    </>
  )
}

export default LogoutProp