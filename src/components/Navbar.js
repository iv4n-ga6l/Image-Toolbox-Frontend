import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Button,
    Stack
}
    from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ModelTrainingTwoToneIcon from '@mui/icons-material/ModelTrainingTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PhotoLibraryTwoToneIcon from '@mui/icons-material/PhotoLibraryTwoTone';
import AspectRatioTwoToneIcon from '@mui/icons-material/AspectRatioTwoTone';
import FilterBAndWTwoToneIcon from '@mui/icons-material/FilterBAndWTwoTone';
import FormatStrikethroughTwoToneIcon from '@mui/icons-material/FormatStrikethroughTwoTone';
import CompressTwoToneIcon from '@mui/icons-material/CompressTwoTone';
import CompareTwoToneIcon from '@mui/icons-material/CompareTwoTone';
import PolylineTwoToneIcon from '@mui/icons-material/PolylineTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';


import { Link, useNavigate } from "react-router-dom";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export const Navbar = () => {
    const navigate = useNavigate();


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => navigate('/')}>
                {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p> */}
                <HomeIcon/>
                <Typography>Home</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/objects-detection')}>
                {/* <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p> */}
                <PhotoLibraryTwoToneIcon fontSize='small'/>
                <Typography>Objects Detection</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/image-resizing')}>
                <AspectRatioTwoToneIcon fontSize='small'/>
                <Typography>Resizing</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/image-filtering')}>
                <FilterBAndWTwoToneIcon fontSize='small'/>
                <Typography>Filtering</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/text-extract')}>
                <FormatStrikethroughTwoToneIcon fontSize='small'/>
                <Typography>Text Extract</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/image-compression')}>
                <CompressTwoToneIcon fontSize='small'/>
                <Typography>Compression</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/image-comparison')}>
                <CompareTwoToneIcon fontSize='small'/>
                <Typography>Comparison</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/open-poses-detection')}>
                <PolylineTwoToneIcon fontSize='small'/>
                <Typography>Open poses detection</Typography>
            </MenuItem>
            {/* <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem> */}
        </Menu>
    );



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" >
                <Toolbar variant='dense'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                        <ModelTrainingTwoToneIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        fontSize={16}
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        Image Toolbox
                    </Typography>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* <Link to="/upload-image"></Link> */}
                        <Button variant='text' color='inherit' sx={{fontSize: 12}} onClick={() => navigate('/objects-detection')}>
                            <Stack direction={'row'} spacing={1}>
                                <PhotoLibraryTwoToneIcon sx={{fontSize: 15}} />
                                <Typography fontSize={12}>Objects Detection</Typography>
                            </Stack>
                        </Button>

                        <Button variant='text' color='inherit' sx={{fontSize: 12}} onClick={() => navigate('/image-resizing')}>
                            <Stack direction={'row'} spacing={1}>
                                <AspectRatioTwoToneIcon sx={{fontSize: 15}}/>
                                <Typography fontSize={12}>Resizing</Typography>
                            </Stack>
                        </Button>
                        
                        <Button variant='text' color='inherit' sx={{fontSize: 12}} onClick={() => navigate('/image-filtering')}>
                            <Stack direction={'row'} spacing={1}>
                                <FilterBAndWTwoToneIcon sx={{fontSize: 15}}/>
                                <Typography fontSize={12}>Filtering</Typography>
                            </Stack>
                        </Button>

                        <Button variant='text' color='inherit' sx={{fontSize: 12}} onClick={() => navigate('/text-extract')}>
                            <Stack direction={'row'} spacing={1}>
                                <FormatStrikethroughTwoToneIcon sx={{fontSize: 15}}/>
                                <Typography fontSize={12}>Text Extract</Typography>
                            </Stack>
                        </Button>
                        <Button variant='text' color='inherit' sx={{fontSize: 12}} onClick={() => navigate('/image-compression')}>
                            <Stack direction={'row'} spacing={1}>
                                <CompressTwoToneIcon sx={{fontSize: 15}}/>
                                <Typography fontSize={12}>Compression</Typography>
                            </Stack>
                        </Button>
                        <Button variant='text' color='inherit' sx={{fontSize: 15}} onClick={() => navigate('/image-comparison')}>
                            <Stack direction={'row'} spacing={1}>
                                <CompareTwoToneIcon sx={{fontSize: 15}}/>
                                <Typography fontSize={12}>Comparison</Typography>
                            </Stack>
                        </Button>
                        <Button variant='text' color='inherit' sx={{fontSize: 12}} onClick={() => navigate('/open-poses-detection')}>
                            <Stack direction={'row'} spacing={1}>
                                <PolylineTwoToneIcon sx={{fontSize: 15}}/>
                                <Typography fontSize={12}>Open poses detection</Typography>
                            </Stack>
                        </Button>
                        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {/* <AccountCircle /> */}
                            <SettingsTwoToneIcon/>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    )
}