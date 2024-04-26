import { useState } from "react";
import {
    Stack,
    Grid,
    Box,
    Typography,
    Button,
    CircularProgress,
    Skeleton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme
} from "@mui/material"


import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import FileDropZone from "../components/fileDropZone";

import FileService from "../services/fileService";

export const ImageFiltering = () => {
    const theme = useTheme();

    const fileService = new FileService();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filter, setFilter] = useState('blur');

    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);


    const handleFilesSelected = (files) => {
        setSelectedFiles(files);
    };


    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('You must drop or pick an image');
        } else {
            setImageResult(null);
            setUploadStarting(true);
            fileService.uploadFileForFiltering(selectedFiles[0], filter)
                .then((result) => {
                    setUploadStarting(false);
                    setSelectedFiles([]);
                    setImageResult(result);
                }).catch((error) => {
                    console.log(error);
                    setUploadStarting(false);
                });
        }
    }


    return (
        <Grid container sx={{ margin: 4 }} spacing={6}>
            <Grid item xs={10} md={4} lg={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Age"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <MenuItem value={'blur'}>Blur</MenuItem>
                            <MenuItem value={'sharpen'}>Sharpen</MenuItem>
                            <MenuItem value={'grayscale'}>Grayscale</MenuItem>
                        </Select>
                    </FormControl>
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
                            imageResult !== null &&
                            <img
                                src={imageResult}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt="File Content"
                            />
                        }

                        {
                            uploadStarting === true ?
                                <Skeleton variant="rectangular" width={410} height={200} /> :
                                <Typography>...</Typography>
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