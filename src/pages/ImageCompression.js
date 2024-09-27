import React, { useState, useCallback, useMemo } from "react";
import {
    Stack,
    Grid,
    Box,
    Typography,
    Button,
    CircularProgress,
    Skeleton,
    TextField,
    useTheme
} from "@mui/material";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FileDropZone from "../components/fileDropZone";
import FileService from "../services/fileService";
import NoResultImg from '../assets/no-result3.png';
import AlertDialog from "../components/AlertDialog";

export const ImageCompression = () => {
    const theme = useTheme();
    // use of useMemo to ensure fileService is only created once
    const fileService = useMemo(() => new FileService(), []);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [quality, setQuality] = useState(0);
    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleFilesSelected = useCallback((files) => {
        setSelectedFiles(files);
        setAlertMessage(null); 
        setAlertOpen(null);
    }, []);

    const handleAlertClose = useCallback(() => {
        setAlertOpen(false);
    }, []);

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };

    const handleUpload = useCallback(async () => {
        if (selectedFiles.length === 0) {
            showAlert('You must drop or pick an image');
        } else {
            setImageResult(null);
            setUploadStarting(true);
            try {
                const result = await fileService.uploadFileForCompression(selectedFiles[0], quality);
                setUploadStarting(false);
                setSelectedFiles([]);
                setImageResult(result);
            } catch (error) {
                showAlert(error.message || "An unexpected error occurred.");
            } finally {
                setUploadStarting(false);
            }
        }
    }, [selectedFiles, quality, fileService]);

    return (
        <>
            <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
                <Grid item xs={10} md={4} lg={4}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                        <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
                        <TextField 
                            label="Quality" 
                            variant="outlined" 
                            fullWidth 
                            type="number"
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleUpload} disabled={uploadStarting || selectedFiles.length === 0}>
                            {uploadStarting && <CircularProgress size={24} color="inherit" />}
                            {uploadStarting ? "Processing..." : "Send"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={10} md={5} lg={5}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                        <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                            {imageResult !== null && (
                                <img
                                    src={imageResult}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    alt="File Content"
                                />
                            )}
                            {uploadStarting ? (
                                <Skeleton variant="rectangular" width={410} height={200} />
                            ) : (
                                imageResult == null && (
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <img src={NoResultImg} style={{ width: '200px', height: '200px', objectFit: 'cover' }} alt="No Result" />
                                    </div>
                                )
                            )}
                        </Box>
                        {imageResult !== null && (
                            <Button size="small" download href={imageResult}>
                                <DownloadForOfflineIcon />
                                Download
                            </Button>
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <AlertDialog
                open={alertOpen}
                handleClose={handleAlertClose}
                desc={alertMessage}
            />
        </>
    );
};