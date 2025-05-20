import * as React from 'react';
import { Box, Typography, Avatar, Divider } from '@mui/material';
import { useSession } from '@toolpad/core/useSession';
import { Session } from '@toolpad/core/AppProvider';

export interface CustomSession extends Session {
  org: {
    name: string;
    url: string;
    logo: string;
  };
}

export function UserOrg() {
  const session = useSession<CustomSession>();

  if (!session?.user) {
    return <Typography>No user session available</Typography>;
  }

  const { name, image } = session.user;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
      <Avatar
        alt={name}
        src={image}
        sx={{
          width: 45,
          height: 45,
          bgcolor: '#e3e2e2',         
          borderRadius: '999px',         
        }}
      />
      <Typography variant="subtitle1" fontWeight="bold" fontSize='14px'>
        {name}
      </Typography>
      <Typography variant="caption" color="text.secondary"  fontSize='12px'>
        J&J COE
      </Typography>
    </Box>
  );
}
