// pages/session-expired.tsx
"use client";
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
 
export default function SessionExpired() {
  const router = useRouter();
 
  const handleLogin =async () => {
    const { logoutAction } = await import('../../app/api/user/logout/route');
    await logoutAction();
    router.push('/login');
    // setIsLoading(false);
  };
 
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#fff8f6"
      textAlign="center"
      px={2}
    >
      <WarningAmberRoundedIcon sx={{ fontSize: 110, color: '#f44336', mb: 2 }} />
 
      <Typography variant="h5" fontWeight={600} color="textPrimary">
        Your session has expired, to continue with the application
      </Typography>
 
      <Typography variant="h5" fontWeight={600} color="textPrimary" mt={1}>
        please click on the <strong >" Login "</strong>.
      </Typography>
 
      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#d32f2f',
          '&:hover': {
            backgroundColor: '#b71c1c',
          },
          borderRadius: '999px',
          textTransform: 'none',
          px: 2,
         
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
}
 
 