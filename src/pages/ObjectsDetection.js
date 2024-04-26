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



export const ObjectsDetection = () => {
    const theme = useTheme();

    const fileService = new FileService();

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [countingResult, setCountingResult] = useState(null);


    const handleFilesSelected = (files) => {
        setSelectedFiles(files);
    };


    const handleUpload = async () => {
        if (selectedFiles.length !== 0) {
            setImageResult(null);
            setUploadStarting(true);
            fileService.uploadFileForObjectsDetection(selectedFiles[0])
                .then((imageResult) => {
                    fileService.uploadFileForObjectsCounting(selectedFiles[0])
                        .then((countingResult) => {
                            setUploadStarting(false);
                            setSelectedFiles([]);
                            setImageResult(imageResult);
                            setCountingResult(countingResult);
                        }).catch((error) => {
                            console.log(error);
                            setUploadStarting(false);
                        });
                }).catch((error) => {
                    console.log(error);
                    setUploadStarting(false);
                });
        } else {
            alert('You must drop or pick an image');
        }
    }

    const displayCountingResult = () => {
        const keys = Object.keys(countingResult);
        // const values = keys.map(elt => countingResult[elt]);
        return <Stack direction={'row'}>{keys.length} object(s) detected : <Typography sx={{marginLeft: 1}} color={'mediumslateblue'} fontWeight={'bold'}>{keys.join(', ')}</Typography></Stack>
        // return `${keys.length} object(s) detected : ${keys.join(', ')}`;
    };
    

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
                            <>
                            <img
                                src={imageResult}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt="File Content"
                            />
                            <Typography>
                                {displayCountingResult()}
                            </Typography>
                            </>
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