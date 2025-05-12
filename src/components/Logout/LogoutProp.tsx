'use client'

import React from 'react'
import Image from 'next/image'
import { logoutAction } from '../../app/api/user/logout/route'; // adjust path as needed
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

const LogoutProp = () => {
  const route = useRouter();
  const handleLogout = async () => {
    await logoutAction();
    route.push("/login"); // Redirect to login page after logout
  }
  return (
    <>


<Box
  onClick={handleLogout}
  sx={{
    width: 40,
    height: 40,
    borderRadius: '50%',
    // backgroundColor: '#fff', // light circle
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#ebebeb',          // slightly brighter
      '& img': {
        filter: 'brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(7476%) hue-rotate(358deg) brightness(98%) contrast(114%)' // red tone
      }
    }
  }}
>
  <Image src="/logout.svg" alt="logout image" width={18} height={18} />
</Box>
    </>
  )
}

export default LogoutProp