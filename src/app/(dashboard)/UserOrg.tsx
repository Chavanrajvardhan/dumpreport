import * as React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useSession } from '@toolpad/core/useSession';
import { Session } from '@toolpad/core/AppProvider';
import PersonIcon from '@mui/icons-material/Person';

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

  const { name } = session.user;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '8px' }}>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: '#e3e2e2',
          borderRadius: '999px',
        }}
      >
        <PersonIcon sx={{ color: 'rgb(110, 103, 103)', fontSize: 30 }} />
      </Avatar>
      <Typography variant="subtitle1" fontWeight="bold" fontSize="14px">
        {name}
      </Typography>
      <Typography variant="caption" fontSize="12px">
        J&J COE
      </Typography>
    </Box>
  );
}
