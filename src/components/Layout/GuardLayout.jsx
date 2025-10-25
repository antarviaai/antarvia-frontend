import React, { useState, useEffect } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'; 
import {
    Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
    ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline,
    Collapse 
} from '@mui/material';

// --- (ICONS) ---
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessIcon from '@mui/icons-material/Business';
import ReportIcon from '@mui/icons-material/Report';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EventIcon from '@mui/icons-material/Event';
import ConstructionIcon from '@mui/icons-material/Construction';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
import FolderIcon from '@mui/icons-material/Folder';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkIcon from '@mui/icons-material/Work';
import ForumIcon from '@mui/icons-material/Forum';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 280;

// --- Page Title Mapping (no change) ---
const PAGE_TITLES = {
    '/guard/dashboard': 'Dashboard',
    '/guard/visitor-pass': 'Visitor Pass',
    '/guard/contractor-signin': 'Contractor Sign-In',
    '/guard/unit-lookup': 'Unit Look Up',
    '/guard/key-asset-management': 'Key & Asset Management',
    '/guard/ant-mode': 'ANT Mode',
    '/guard/incident-report': 'Incident Report',
    '/guard/violation-notice': 'Violation Notice',
    '/guard/shift-log': 'Shift Log',
    '/guard/packages': 'Package Management',
    '/guard/amenity-management': 'Amenity Management',
    '/guard/maintenance-request': 'Create Maintenance Request',
    '/guard/announcements': 'Announcements',
    '/guard/document-library': 'Document Library',
    '/guard/mailbox': 'Internal Mailbox',
};

// --- (MODIFIED) SidebarLink Helper ---
// Added 'sx' prop so we can indent the child links
const SidebarLink = ({ to, icon, text, sx = {} }) => (
    <ListItem disablePadding>
        {/* We use component="a" and to={to} for router links */}
        <ListItemButton component={RouterLink} to={to} sx={sx}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
);

const GuardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [user, setUser] = useState({ initials: 'DC', name: 'David' });

    // --- State for collapsible sections (no change) ---
    const [openAccess, setOpenAccess] = useState(false);
    const [openSecurity, setOpenSecurity] = useState(false);
    const [openOps, setOpenOps] = useState(false);
    const [openComm, setOpenComm] = useState(false);
    
    // Get current page location (no change)
    const location = useLocation();
    const currentPageTitle = PAGE_TITLES[location.pathname] || 'Guard';

    // Clock logic (no change)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            setCurrentTime(now.toLocaleTimeString('en-US', options));
        };
        updateTime();
        const timerId = setInterval(updateTime, 60000);
        return () => clearInterval(timerId);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // --- (MODIFIED) Sidebar Content: Emojis GONE, Icons COLORED ---
    const sidebarContent = (
        <div>
            <Toolbar /> 
            <Divider />
            <List component="nav" aria-labelledby="nested-list-subheader">
                
                {/* --- Main Dashboard --- */}
                <SidebarLink 
                    to="/guard/dashboard" 
                    icon={<DashboardIcon sx={{ color: '#0A84FF' }} />} // Blue
                    text="Dashboard" 
                />
                
                <Divider sx={{ my: 1 }} />

                {/* --- Access & Visitors --- */}
                <ListItemButton onClick={() => setOpenAccess(!openAccess)}>
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: '#0A84FF' }} /> {/* Blue */}
                    </ListItemIcon>
                    <ListItemText primary="Access & Visitors" />
                    {openAccess ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAccess} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <SidebarLink to="/guard/visitor-pass" icon={<PeopleIcon />} text="Visitor Pass" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/contractor-signin" icon={<BusinessIcon />} text="Contractor Sign-In" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/unit-lookup" icon={<HelpIcon />} text="Unit Look Up" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/key-asset-management" icon={<VpnKeyIcon />} text="Key & Asset Management" sx={{ pl: 4 }} />
                    </List>
                </Collapse>

                {/* --- Security & Incidents --- */}
                <ListItemButton onClick={() => setOpenSecurity(!openSecurity)}>
                    <ListItemIcon>
                        <SecurityIcon sx={{ color: '#FF453A' }} /> {/* Red */}
                    </ListItemIcon>
                    <ListItemText primary="Security & Incidents" />
                    {openSecurity ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSecurity} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <SidebarLink to="/guard/ant-mode" icon={<SecurityIcon />} text="ANT Mode" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/incident-report" icon={<ReportIcon />} text="Incident Report" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/violation-notice" icon={<ReportIcon />} text="Violation Notice" sx={{ pl: 4 }} />
                    </List>
                </Collapse>

                {/* --- Operations & Services --- */}
                <ListItemButton onClick={() => setOpenOps(!openOps)}>
                    <ListItemIcon>
                        <WorkIcon sx={{ color: '#30D158' }} /> {/* Green */}
                    </ListItemIcon>
                    <ListItemText primary="Operations & Services" />
                    {openOps ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openOps} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <SidebarLink to="/guard/shift-log" icon={<ListAltIcon />} text="Shift Log" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/packages" icon={<LocalShippingIcon />} text="Package Management" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/amenity-management" icon={<EventIcon />} text="Amenity Management" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/maintenance-request" icon={<ConstructionIcon />} text="Create Maintenance Request" sx={{ pl: 4 }} />
                    </List>
                </Collapse>

                {/* --- Communication & Info --- */}
                <ListItemButton onClick={() => setOpenComm(!openComm)}>
                    <ListItemIcon>
                        <ForumIcon sx={{ color: '#6366F1' }} /> {/* Purple */}
                    </ListItemIcon>
                    <ListItemText primary="Communication & Info" />
                    {openComm ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openComm} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <SidebarLink to="/guard/announcements" icon={<AnnouncementIcon />} text="Announcements" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/document-library" icon={<FolderIcon />} text="Document Library" sx={{ pl: 4 }} />
                        <SidebarLink to="/guard/mailbox" icon={<EmailIcon />} text="Internal Mailbox" sx={{ pl: 4 }} />
                    </List>
                </Collapse>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* --- SOLID HEADER (This looks good) --- */}
            <AppBar
                position="fixed"
                elevation={0} 
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'background.paper', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open sidebar"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {currentPageTitle} 
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 2 }}>{currentTime}</Typography>
                        <Box sx={{
                            width: 40, height: 40, borderRadius: '50%',
                            backgroundColor: 'primary.dark', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 'bold'
                        }}>
                            {user.initials}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            
            {/* --- (MODIFIED) GLASSY SIDEBAR --- */}
            <Drawer
                variant="temporary"
                open={sidebarOpen}
                onClose={toggleSidebar}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: drawerWidth,
                        // --- GLASSY EFFECT ---
                        backgroundColor: 'rgba(30, 30, 30, 0.85)', // Dark, semi-transparent
                        backdropFilter: 'blur(10px)', // The "frost"
                        borderRight: '1px solid rgba(255, 255, 255, 0.12)', // Subtle border
                    },
                }}
            >
                {sidebarContent}
            </Drawer>

            {/* --- MAIN CONTENT AREA (No change) --- */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: '100vh',   
                    overflow: 'auto'
                }}
            >
                <Toolbar /> {/* Spacer */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default GuardLayout;