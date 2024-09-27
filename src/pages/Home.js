import { Grid, Typography } from "@mui/material";
import ObjDetImg from '../assets/obj_det.png';
import ResizeImg from '../assets/resize-image.svg';
import FilteringImg from '../assets/filter-image.png';
import TextExtractImg from '../assets/text-extract.jpg';
import CompressionImg from '../assets/compression-image.png';
import ComparisonImg from '../assets/comparison-image.webp'


const Home = () => {
    return (
        <Grid container sx={{ marginBottom: 30, mx: 10, marginTop: 10 }} spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
                <img src={ObjDetImg} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                <Typography variant="subtitle1" >Objects detection in image using a pre-trained AI model</Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <img src={ResizeImg} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                <Typography variant="subtitle1">Resize images to specific dimensions with OpenCV</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <img src={FilteringImg} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                <Typography variant="subtitle1">Apply various image filters</Typography>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
                <img src={TextExtractImg} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                <Typography variant="subtitle1">Extract text from images using Optical Character Recognition (OCR)</Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <img src={CompressionImg} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                <Typography variant="subtitle1">Compress images to reduce file size while maintaining quality</Typography>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
                <img src={ComparisonImg} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
                <Typography variant="subtitle1">Compare two images and highlight differences or similarities.</Typography>
            </Grid>
        </Grid>
    )
}

export default Home;