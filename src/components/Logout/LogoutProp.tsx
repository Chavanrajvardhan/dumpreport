'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import LogoutModal from '../LogoutPage/LogoutPage'; // renamed for clarity
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const LogoutProp = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoading(true);
    setIsModalOpen(false);
    const { logoutAction } = await import('../../app/api/user/logout/route');
    await logoutAction();
    router.push('/login');
    // setIsLoading(false);
  };

  return (
    <>
    {isLoading && <LoadingScreen />}
      <Box
        onClick={handleLogoutClick}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#ebebeb',
            '& img': {
              filter:
                'brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(7476%) hue-rotate(358deg) brightness(98%) contrast(114%)',
            },
          },
        }}
      >
        <Image src="/logout.svg" alt="logout" width={18} height={18} />
      </Box>

      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default LogoutProp;
