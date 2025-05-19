'use client'; // Directive to mark this file as a client-side component

import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import styles from './page.module.css';  // Import the CSS module
import Image from 'next/image';
import sidebarLogo from "../../../public/jnj_logo_white.png";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LogoutProp from '../../components/Logout/LogoutProp';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

//Import For Icons
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import Upload from "../../../public/cloud-computing.png";
import Reload from "../../../public/reload.png";
import link from "../../../public/link.png";
import Reupload from "../../../public/reupload.png";
import { usePathname } from 'next/navigation';


//Import for Account
import { Account } from '@toolpad/core/Account';
import { AppProvider } from '@toolpad/core/AppProvider';
import { UserOrg, CustomSession } from './UserOrg';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';


export const LoadingContext = createContext({
    loading: false,
    setLoading: (loading: boolean) => { },
});

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

type MenuItem = {
    text: string;
    icon: React.ReactElement;
    subItems?: string[];
};

const menuItems: MenuItem[] = [
    {
        text: 'Data Upload Status',
        icon: <Image src={Upload} alt="Upload icon"
            width={24}
            height={24}
            style={{ display: 'inline-block' }} />,
    },
    {
        text: 'Reload Zylem Data',
        icon: <Image src={Reload} alt="Reload icon"
            width={24}
            height={24}
            style={{ display: 'inline-block' }} />,
    },
    {
        text: 'Data Mapping',
        icon: <Image src={link} alt="Data Mapping icon"
            width={24}
            height={20}
            style={{ display: 'inline-block' }} />,
    },
    {
        text: 'Enable Reupload',
        icon: <Image src={Reupload} alt="Reupload icon"
            width={24}
            height={24}
            style={{ display: 'inline-block' }} />,
    },
    {
        text: 'Configuration',
        icon: <FolderZipIcon />,
    },
    {
        text: 'System Configuration',
        icon: <FolderZipIcon />,
    },
    {
        text: 'Help And Communication',
        icon: <ContactPhoneOutlinedIcon />,
    },
    {
        text: 'Masters',
        icon: <FolderZipIcon />,
        subItems: ['Distributor', 'Products', 'ECP Products', 'Standard Price', 'Account',
            'Area Tree', 'Surgeons', 'Employee', 'Territory', 'Employee Territory',
            'Territory Management', 'Branch Secretary Region', 'Distributor Terrotory',
            'Territory Hierarchy', 'Organization Group', 'Dealer Agreement', 'Dealer Rating',
            'Distributor Billing Software', 'Customers', 'Customer Account',
        ],
    },
    {
        text: 'Allied Masters',
        icon: <FolderZipIcon />,
        subItems: ['Distributor Group', 'UOM', 'Franchise', 'Sub Franchise', 'Product Group',
            'Product Category', 'Product Brand', 'Product Line', 'Account Group', 'Account Type',
            'Account Classification', 'Account Segmentation', 'Surgeon Contact Type',
            'Surgeon Sub Contact Type', 'City Tier', 'Employee Level', 'Specialist', 'Territory',
            'Bravo Hierarchy',
        ],
    },
    {
        text: 'Data',
        icon: <DataThresholdingOutlinedIcon />,
        subItems: ['Inventory',],
    },
    {
        text: 'Report',
        icon: <InsertChartOutlinedIcon />,
        subItems: ['Dealer Data Status Report', 'Dealer Roprted Sales', 'Dealer Repoted SNS',
            'Dealer Price Report', 'Dump Report', 'Dealer Purchase Report', 'Activity Log',
            'Inventory Report', 'Standard Price Report', 'Request Report',
        ],
    },
]

//For Account
const demoSession: CustomSession = {
    user: {
        name: 'Amit Patil',
        email: 'bharat@mui.com',
        image: 'https://static.thenounproject.com/png/1559124-200.png',
    },
    org: {
        name: 'MUI Inc.',
        url: 'https://mui.com',
        logo: 'https://mui.com/static/logo.svg',
    },
};

export default function layout({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    // Helper function to normalize text for comparison
    const normalize = (text: string) => text.toLowerCase().replace(/\s/g, '');
    const pathLastSegment = pathname.split('/').pop()?.toLowerCase().replace(/\s/g, '') || '';

    const [open, setOpen] = React.useState(true);
    const [selectedSubItem, setSelectedSubItem] = useState<string>('');

    const handleopen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const handleClick = (text: string) => {
        setOpenSubmenu(prev => (prev === text ? null : text));
    };

    //Drawer Selected button bg color
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleMenuItemClick = (index: number) => {
        setSelectedIndex(index); // Set selected index
    };

    //For Account
    const [customSession, setCustomSession] = React.useState<CustomSession | null>(
        demoSession,
    );

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setCustomSession(demoSession);
            },
            signOut: () => {
                setCustomSession(null);
            },
        };
    }, []);

    //for Main Menu click
    const handleMainMenu = (text: string) => {
        console.log("Menu item clicked:", text);

        const routeMap: { [key: string]: string } = {
            'Dump Report': 'coe/report/dumpreport'
            // Add more mappings as needed
        };

        const route = routeMap[text] || '/';

        // Store the normalized selected sub-item
        setSelectedSubItem(normalize(text));
        setLoading(true);
        router.push(`/${route}`);
    };

    const loadingContextValue = {
        loading,
        setLoading
    };

    // This useEffect initializes submenu state based on the URL when component loads
useEffect(() => {
    if (openSubmenu !== null) return; // Don't override user toggle
 
    const menuWithCurrentPath = menuItems.find(item => 
        item.subItems?.some(subItem => normalize(subItem) === pathLastSegment)
    );
 
    if (menuWithCurrentPath) {
        setOpenSubmenu(menuWithCurrentPath.text);
 
        const matchingSubItem = menuWithCurrentPath.subItems?.find(
            subItem => normalize(subItem) === pathLastSegment
        );
 
        if (matchingSubItem) {
            setSelectedSubItem(normalize(matchingSubItem));
        }
    }
}, [pathname, pathLastSegment, openSubmenu]);

    // Check if the current path is related to the Report section
    const isReportActive = () => {
        // Check if the path contains 'report' or any Report subitem is selected
        const reportItem = menuItems.find(item => item.text === 'Report');
        if (!reportItem || !reportItem.subItems) return false;

        return reportItem.subItems.some(subItem => normalize(subItem) === selectedSubItem) ||
            pathname.toLowerCase().includes('report');
    };


    return (
        <LoadingContext.Provider value={loadingContextValue}>

            <Box className={styles.root}>
                <CssBaseline />
                <MuiAppBar className={`${styles.appBar} ${open ? styles.open : styles.close}`} position="fixed" elevation={0}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '13px' }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center',
                        }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleopen}
                                edge="start"
                                sx={!open ? { marginRight: '50px', marginLeft: '20px' } : {}}
                                className={`${styles.menuButton} ${open ? styles.hidden : ''}`}
                            >
                                <MenuIcon className={`${styles.menuButton} ${!open ? styles.close : ''}`} />
                            </IconButton>

                            <Image
                                src={"/image.png"}
                                alt="JJ Core Medtech Logo"
                                className={` ${styles.styledImage} ${open ? styles.open : ''}`}
                                priority
                                width={150}
                                height={35}
                            />
                        </Box>
                        
                        <div style={{ display:"flex", flexDirection: 'row', marginRight: '30px' }} >
                             <Image
                                src={"/contact.svg"}
                                alt="Contact icon"
                                width={33}
                                height={33}
                                style={{
                                    marginRight: '10px',
                                }}/>
                            <LogoutProp />
                        </div>
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
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
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
                            priority
                        />

                        <IconButton
                            onClick={handleDrawerClose}
                            sx={{
                                position: 'fixed',
                                left: '260px',
                                zIndex: '99',
                            }}
                        >
                            {theme.direction === 'ltr' ? (
                                <ChevronRightRoundedIcon
                                    sx={{
                                        fontSize: 25,
                                        color: '#6E6767',
                                        transform: 'rotate(180deg)',
                                        border: 'dashed 1px rgb(139, 132, 132, 0.24)',
                                        borderRadius: '999px',
                                        backgroundColor: '#FFFFFF',
                                    }}
                                />
                            ) : (
                                <ChevronRightRoundedIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />

                    {/* Account */}
                    <AppProvider authentication={authentication} session={customSession}>
                        <div style={{
                            marginTop: '8px',
                            marginLeft: '32px',
                            marginRight: '32px',
                        }}>
                            <UserOrg />
                        </div>
                    </AppProvider>

                    <div className={styles.scrollableMenu}>
                        <List className={styles.menuItems} style={{ color: "rgb(112 105 105)" }}>
                            {menuItems.map((item) => {
                                const itemPath = normalize(item.text);
                                const isSubItemActive = item.subItems?.some(sub => pathLastSegment === normalize(sub));
                                const isActive = pathname.includes(itemPath) || isSubItemActive;
                                const isReportSection = item.text === 'Report' && isReportActive();

                                return (
                                    <React.Fragment key={item.text}>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={() => item.subItems ? handleClick(item.text) : handleMainMenu(item.text)}
                                                className={`${styles.listBtn} ${isActive || isReportSection ? styles.selected : ''}`}
                                            >
                                                <ListItemIcon
                                                    className={isActive || isReportSection ? styles.activeIcon : ''}
                                                >
                                                    {React.isValidElement(item.icon) && item.icon.type === Image ? (
                                                        <div className={isActive || isReportSection ? styles.activeImageIcon : ''}>
                                                            {item.icon}
                                                        </div>
                                                    ) : (
                                                        React.cloneElement(item.icon, {
                                                            style: {
                                                                color: (isActive || isReportSection) ? 'rgb(215 36 12)' : 'inherit'
                                                            }
                                                        })
                                                    )}
                                                </ListItemIcon>
                                                <ListItemText primary={item.text} />
                                                {item.subItems ? (openSubmenu === item.text || isSubItemActive ? <ExpandLess sx={{   transform: 'rotate(180deg)'}} /> : <ExpandMore sx={{   transform: 'rotate(-90deg)'}} />) : null}
                                            </ListItemButton>
                                        </ListItem>
                                        {item.subItems && (
                                            <Collapse in={openSubmenu === item.text || isSubItemActive} timeout="auto" unmountOnExit>
                                                <List disablePadding>
                                                    {item.subItems.map((subItem) => {
                                                        // Compare the normalized subItem with the selectedSubItem state
                                                        const isSubItemSelected = normalize(subItem) === selectedSubItem;

                                                        return (
                                                            <ListItemButton
                                                                key={subItem}
                                                                sx={{ pl: 4 ,}}
                                                                onClick={() => handleMainMenu(subItem)}
                                                                className={`${styles.subItems}`}
                                                            >
                                                                <ListItemText
                                                                    primary={subItem}
                                                                    
                                                                    className={`${isSubItemSelected ? `${styles.subItemSelected} ` : ''}`}
                                                                    disableTypography
                                                                />
                                                            </ListItemButton>
                                                        );
                                                    })}
                                                </List>
                                            </Collapse>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </div>
                </Drawer>

                <main className={`${styles.mainContent} ${open ? styles.open : ''}`}>
                    <div className={styles.drawerHeader2} />
                    {loading && <LoadingScreen />}
                    {children}
                </main>
            </Box>

        </LoadingContext.Provider>
    );
}