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

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import FileDropZone from "../components/fileDropZone";

import FileService from "../services/fileService";



export const OpenPosesDetection = () => {
    const theme = useTheme();

    const fileService = new FileService();

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);


    const handleFilesSelected = (files) => {
        setSelectedFiles(files);
    };


    const handleUpload = async () => {
        if (selectedFiles.length !== 0) {

            setImageResult(null);
            setUploadStarting(true);
            fileService.uploadFileForOpenPosesDetection(selectedFiles[0])
                .then((imageResult) => {
                    setUploadStarting(false);
                    setSelectedFiles([]);
                    setImageResult(imageResult);
                }).catch((error) => {
                    console.log(error);
                    setUploadStarting(false);
                });
        } else {
            alert('You must drop or pick an image');
        }
    }



    return (
        <Grid container sx={{ margin: 4 }} spacing={6}>
            <Grid item xs={10} md={4} lg={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
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
            <Grid item xs={10} md={6} lg={6}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                    <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                        {
                            imageResult !== null &&
                            <img
                                src={imageResult}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt="File Content"
                            />
                        }

                        {
                            uploadStarting === true ?
                                <Skeleton variant="rectangular" width={510} height={200} /> :
                                <Typography fontSize={12}>...</Typography>
                        }

                    </Box>
                    {
                        imageResult !== null &&
                        <Button size="small" download href={imageResult}>
                            <DownloadForOfflineIcon />
                            Download
                        </Button>
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}