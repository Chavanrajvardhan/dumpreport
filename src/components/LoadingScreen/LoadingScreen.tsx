'use client';
 
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import "./spinner.css"
 
// Fullscreen semi-transparent black background
const Overlay = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}));

// Centered white box
const WhiteBox = styled(Box)(() => ({
  width: 320,
  height: 225,
  backgroundColor: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
}));

export default function LoadingScreen() {
  return (
    <Overlay>
      <WhiteBox>
        <div className="lds-spinner">
          <div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <div style={{color:"#1c4c5b", fontSize:"14px",marginTop:"10px"}}>

          Please wait...
        </div>
      </WhiteBox>
    </Overlay>
  );
}