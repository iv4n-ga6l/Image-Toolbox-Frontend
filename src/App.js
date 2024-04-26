// import logo from './logo.svg';
// import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ObjectsDetection } from './pages/ObjectsDetection';
import { ImageResizing } from './pages/ImageResizing';
import { ImageFiltering } from './pages/ImageFiltering';
import { TextExtract } from './pages/TextExtract';
import { ImageCompression } from './pages/ImageCompression';
import { ImageComparison } from './pages/ImageComparison';
import { OpenPosesDetection } from './pages/OpenPosesDetection';
import Home from './pages/Home';


function App() {

  return (
    <div >
      <Navbar/>
      <Routes >
        <Route path='/' element={<Home />}  />
        <Route path='/objects-detection' element={<ObjectsDetection />} />
        <Route path='/image-resizing' element={<ImageResizing />} />
        <Route path='/image-filtering' element={<ImageFiltering />} />
        <Route path='/text-extract' element={<TextExtract />} />
        <Route path='/image-compression' element={<ImageCompression />} />
        <Route path='/image-comparison' element={<ImageComparison />} />
        <Route path='/open-poses-detection' element={<OpenPosesDetection />} />
      </Routes>
    </div>
  );
}

export default App;
