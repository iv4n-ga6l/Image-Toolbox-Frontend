import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/MenuOpen';
import ModelTrainingTwoToneIcon from '@mui/icons-material/ModelTrainingTwoTone';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GraphicEqTwoToneIcon from '@mui/icons-material/GraphicEqTwoTone';
import SegmentIcon from '@mui/icons-material/Segment';
import BentoIcon from '@mui/icons-material/Bento';
import AspectRatioTwoToneIcon from '@mui/icons-material/AspectRatioTwoTone';
import FilterBAndWTwoToneIcon from '@mui/icons-material/FilterBAndWTwoTone';
import FormatStrikethroughTwoToneIcon from '@mui/icons-material/FormatStrikethroughTwoTone';
import CompressTwoToneIcon from '@mui/icons-material/CompressTwoTone';
import CompareTwoToneIcon from '@mui/icons-material/CompareTwoTone';
import PolylineTwoToneIcon from '@mui/icons-material/PolylineTwoTone';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const TopBar = ({ toggleTheme, mode, drawerOpen, handleDrawerToggle }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Objects Detection', icon: <GraphicEqTwoToneIcon />, path: '/objects-detection' },
        { text: 'Objects Segmentation', icon: <BentoIcon />, path: '/objects-segmentation' },
        { text: 'Resizing', icon: <AspectRatioTwoToneIcon />, path: '/image-resizing' },
        { text: 'Filtering', icon: <FilterBAndWTwoToneIcon />, path: '/image-filtering' },
        { text: 'Text Extract', icon: <FormatStrikethroughTwoToneIcon />, path: '/text-extract' },
        { text: 'Compression', icon: <CompressTwoToneIcon />, path: '/image-compression' },
        { text: 'Comparison', icon: <CompareTwoToneIcon />, path: '/image-comparison' },
        { text: 'Open poses detection', icon: <PolylineTwoToneIcon />, path: '/open-poses-detection' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: theme.zIndex.drawer + 1 }}
                color='primary'
            >
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        {drawerOpen ? <MenuOpen /> : <MenuIcon />}
                    </IconButton>
                    <Box
                        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => navigate('/')}>
                        <ModelTrainingTwoToneIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" noWrap component="div">
                            Image Toolbox
                        </Typography>
                    </Box>
                    {/* <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton> */}
                    <IconButton sx={{ ml: 1 }} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={item.text} onClick={() => { navigate(item.path); handleDrawerToggle(); }}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};