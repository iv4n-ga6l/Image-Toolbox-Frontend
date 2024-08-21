import { useState } from "react";
import {
    Stack,
    Grid,
    Box,
    Typography,
    Button,
    CircularProgress,
    Skeleton,
    useTheme
} from "@mui/material"


import FileDropZone from "../components/fileDropZone";

import FileService from "../services/fileService";

export const ImageComparison = () => {
    const theme = useTheme();

    const fileService = new FileService();

    const [selectedFiles1, setSelectedFiles1] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);


    const [uploadStarting, setUploadStarting] = useState(false);
    const [comparisonResult, setComparisonResult] = useState(null);


    const handleFirstFilesSelected = (files) => {
        setSelectedFiles1(files);
    };

    const handleSecondFilesSelected = (files) => {
        setSelectedFiles2(files);
    };


    const handleUpload = async () => {
        if (selectedFiles1.length === 0) {
            alert('You must drop or pick the first image');
        } else if(selectedFiles2.length === 0) {
            alert('You must drop or pick the second image');
        } else {
            setComparisonResult(null);
            setUploadStarting(true);
            fileService.uploadFileForImageComparison(selectedFiles1[0], selectedFiles2[0])
                .then((result) => {
                    setUploadStarting(false);
                    setSelectedFiles1([]);
                    setSelectedFiles2([]);
                    setComparisonResult(result.similarity_score);
                }).catch((error) => {
                    console.log(error);
                    setUploadStarting(false);
                });
        }
    }

    const getSimilarityText = () => {
        if(comparisonResult < 0){
            return "There is no probability that it is the same image or person or object";
        } else if(comparisonResult <= 0.5){
            return "There is a low probability that it is the same image or person or object";
        } else {
            return "There is a high probability that it is the same image or person or object";
        }
    }
    

    return (
        <Grid container sx={{ margin: 4 }} spacing={6}>
            <Grid item xs={10} md={4} lg={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>

                    <Typography fontSize={15} >First image</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleFirstFilesSelected} />

                    <Typography fontSize={15} >Second image</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleSecondFilesSelected} />
                    
                    <Button variant="contained" onClick={handleUpload} disabled={uploadStarting}>
                        {
                            uploadStarting &&
                            <CircularProgress size={24} color="inherit" />
                        }
                        {
                            uploadStarting === true ? "Processing..." : "Send"
                        }

                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={10} md={5} lg={5}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                    <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                        {
                            comparisonResult !== null &&
                            <>
                            <Typography fontSize={18}>Similarity : {Number(comparisonResult).toFixed(3) * 100}%</Typography>
                            <Typography fontSize={15}>{getSimilarityText()}</Typography>
                            </>
                        }

                        {
                            uploadStarting === true ?
                                <Skeleton animation="wave" variant="rectangular" width={410} height={200} /> :
                                <Typography>...</Typography>
                        }

                    </Box>
                </Stack>
            </Grid>
        </Grid>
    )

}