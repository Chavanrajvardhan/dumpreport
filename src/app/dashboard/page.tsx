'use client'; // Directive to mark this file as a client-side component

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import styles from './page.module.css';  // Import the CSS module
import Image from 'next/image';
// import jjLogo from '../../../public/jnj_logo-removebg-preview.png';
// import jhonsonLogo from '../../../public/image.png';
import DumpReportPage from '../../components/dumpform/Dumpform';
import { truncate } from 'fs/promises';
import sidebarLogo from "../../../public/jnj_logo_white.jpg";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LogoutProp from '../../components/Logout/LogoutProp';

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box className={styles.root}>
            <CssBaseline />
            <MuiAppBar className={`${styles.appBar} ${open ? styles.open : styles.close}`} position="fixed">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={`${styles.menuButton} ${open ? styles.hidden : ''}`}
                        >
                            <MenuIcon className={`${styles.menuButton} ${!open ? styles.close : ''}`} />
                        </IconButton>
                        <Image
                            src={"/image.png"}
                            alt="JJ Core Medtech Logo"
                            className={` ${styles.styledImage} ${open ? styles.open : ''}`}
                            priority
                            width={165}
                            height={45}
                        />
                    </Box>

                    <LogoutProp />
                </Toolbar>

            </MuiAppBar>

            <Drawer
                className={styles.drawer}
                sx={{
                    width: drawerWidth,

                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        borderRight: 'dashed 1px rgb(139, 132, 132, 0.24)',
                        boxSizing: 'border-box',

                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className={styles.drawerHeader}>
                    <Image
                        src={sidebarLogo}
                        alt="JJ Core Logo"

                        className={styles.styledSidebarImage}
                        // width={185}
                        // height={45}
                        priority
                    />

                    <IconButton onClick={handleDrawerClose} sx={{
                        position: 'fixed',
                        left: '260px',
                        zIndex: '99',
                    }}>
                        {theme.direction === 'ltr' ?
                            <ChevronRightRoundedIcon sx={{
                                fontSize: 25,
                                color: '#6E6767',
                                transform: 'rotate(180deg)',
                                border: 'dashed 1px rgb(139, 132, 132, 0.24)',
                                borderRadius: '999px',
                                backgroundColor: '#FFFFFF',
                            }} />
                            : <ChevronRightRoundedIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <main className={`${styles.mainContent} ${open ? styles.open : ''}`}>
                <div className={styles.drawerHeader2} />
                <DumpReportPage />
            </main>
        </Box>
    );
}
