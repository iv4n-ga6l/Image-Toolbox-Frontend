import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { TopBar } from './components/TopBar';
import Footer from './components/Footer';
import { ObjectsDetection } from './pages/ObjectsDetection';
import { ImageResizing } from './pages/ImageResizing';
import { ImageFiltering } from './pages/ImageFiltering';
import { TextExtract } from './pages/TextExtract';
import { ImageCompression } from './pages/ImageCompression';
import { ImageComparison } from './pages/ImageComparison';
import { OpenPosesDetection } from './pages/OpenPosesDetection';
import Home from './pages/Home';
import GetTheme from './theme/CustomTheme';

function App() {
  const [mode, setMode] = useState('light');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(
    () =>
      GetTheme(mode),
    [mode],
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar 
          toggleTheme={toggleTheme} 
          mode={mode} 
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerOpen ? 240 : 0}px)` },
            ml: { sm: drawerOpen ? `240px` : 0 },
            mt: ['48px', '56px', '64px'],
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/objects-detection' element={<ObjectsDetection />} />
            <Route path='/image-resizing' element={<ImageResizing />} />
            <Route path='/image-filtering' element={<ImageFiltering />} />
            <Route path='/text-extract' element={<TextExtract />} />
            <Route path='/image-compression' element={<ImageCompression />} />
            <Route path='/image-comparison' element={<ImageComparison />} />
            <Route path='/open-poses-detection' element={<OpenPosesDetection />} />
          </Routes>
        </Box>
        {/* <Footer /> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;