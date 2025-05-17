'use client'; // Directive to mark this file as a client-side component

import React, {useState} from 'react';
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
import DumpReportPage from '../../components/dumpform/Dumpform';
import { truncate } from 'fs/promises';
import sidebarLogo from "../../../public/jnj_logo_white.png";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LogoutProp from '../../components/Logout/LogoutProp';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

//Import For Icons

import FolderZipIcon from '@mui/icons-material/FolderZip';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import Upload from  "../../../public/cloud-computing.png";
import Reload from "../../../public/reload.png";
import link from "../../../public/link.png";
import Reupload from "../../../public/reupload.png";


//Import for Account 
import { Account } from '@toolpad/core/Account';
import { AppProvider } from '@toolpad/core/AppProvider';
import { UserOrg, CustomSession } from './UserOrg';

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
        style={{ display: 'inline-block' }}/>,
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
        style={{ display: 'inline-block' }}/>,
    },
    {
        text: 'Enable Reupload',
        icon: <Image src={Reupload} alt="Reupload icon" 
        width={24}
        height={24}
        style={{ display: 'inline-block' }}/>,
    },
    {
        text: 'Configuration',
        icon: <FolderZipIcon/>,
    },
    {
        text:'System Configuration',
        icon: <FolderZipIcon/>,
    },
    {
        text:'Help And Communication',
        icon: <ContactPhoneOutlinedIcon />,
    },
    {
        text:'Masters',
        icon: <FolderZipIcon/>,
        subItems: ['Distributor', 'Products', 'ECP Products', 'Standard Price', 'Account', 
                'Area Tree', 'Surgeons', 'Employee', 'Territory', 'Employee Territory',
                'Territory Management', 'Branch Secretary Region', 'Distributor Terrotory',
                'Territory Hierarchy', 'Organization Group','Dealer Agreement','Dealer Rating',
                'Distributor Billing Software', 'Customers','Customer Account',
         ],
    },
    {
        text:'Allied Masters',
        icon: <FolderZipIcon/>,
        subItems: [ 'Distributor Group','UOM','Franchise','Sub Franchise','Product Group',
            'Product Category','Product Brand', 'Product Line','Account Group','Account Type',
            'Account Classification','Account Segmentation','Surgeon Contact Type',
            'Surgeon Sub Contact Type','City Tier','Employee Level','Specialist','Territory',
            'Bravo Hierarchy',
        ],
    },
    {
        text:'Data',
        icon: <DataThresholdingOutlinedIcon/>,
        subItems:['Inventory',],
    },
    {
        text:'Report',
        icon: <InsertChartOutlinedIcon/>,
        subItems:['Dealer Data Status Report','Dealer Roprted Sales', 'Dealer Repoted SNS', 
            'Dealer Price Report', 'Dump Report','Dealer Purchase Report', 'Activity Log', 
            'Inventory Report', 'Standard Price Report','Request Report',
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

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const handleClick = (text: string) => {
        setOpenSubmenu(prev => (prev === text ? null : text));
      };
  
    const router = useRouter();

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
            console.log("value is :",text);
            const routeMap: { [key: string]: string } = {
            //   'Configuration':'/community',
              'Report': '/report',
              'Dump Report': '/dumpReport'
            };
            const route = routeMap[text] || '/';
            window.open(route, '_blank');
        };
        
    return (
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
                            onClick={handleDrawerOpen}
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
                    <div style={{ marginRight: '30px' }} >

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
                        ):(
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
                    {/* <Box sx={{ textAlign: 'left', mt: 1, mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                        Bharat Kashyap
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                        Admin
                        </Typography>
                    </Box> */}
            

                <div className={styles.scrollableMenu}>
                        <List className={styles.menuItems}>
                            {menuItems.map((item,index) => (
                                <React.Fragment key={item.text}>
                                <ListItem>
                                    <ListItemButton 
                                        className={`styles.listBtn ${selectedIndex === index ? 'selected' : ''}`}
                                        sx={{
                                            '&:hover': {
                                            borderRadius:'8px',     
                                            },
                                        }}
                                        onClick={() => {if (item.subItems) {
                                                            handleClick(item.text); // Handle subitems
                                                        } else {
                                                            handleMainMenu(item.text); // Handle main menu item
                                                            handleMenuItemClick(index); // Handle menu item click
                                                        }
                                                    }}  
                                    >
                                    <ListItemIcon className={styles.icon}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}  className={styles.mainItem}/>
                                    {item.subItems ? (
                                        openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />
                                    ) : null}
                                    </ListItemButton>
                                </ListItem>
                                <div className={styles.subMenu}>
                                {item.subItems && (
                                    <Collapse in={openSubmenu === item.text} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subItems.map((subItem) => (
                                        <ListItemButton key={subItem} sx={{ pl: 4 }} className={styles.subItems}        >
                                            <ListItemText primary={subItem} />
                                        </ListItemButton>
                                        ))}
                                    </List>
                                    </Collapse>
                                )}
                                </div>
                                </React.Fragment>
                            ))}
                        </List>
                    </div>
            </Drawer>

            <main className={`${styles.mainContent} ${open ? styles.open : ''}`}>
                <div className={styles.drawerHeader2} />
                <DumpReportPage />
            </main>
        </Box>
    );
}
