import { useState, useCallback, useMemo } from "react";
import {
    Stack,
    Grid,
    Box,
    Typography,
    Button,
    CircularProgress,
    Skeleton,
    useTheme
} from "@mui/material";

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FileDropZone from "../components/fileDropZone";
import FileService from "../services/fileService";
import NoResultImg from '../assets/no-result.png';
import AlertDialog from "../components/AlertDialog";

export const OpenPosesDetection = () => {
    const theme = useTheme();
    // use of useMemo to ensure fileService is only created once
    const fileService = useMemo(() => new FileService(), []);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFilesSelected = useCallback((files) => {
        setSelectedFiles(files);
        setErrorMessage(null); // Clear any previous errors when new files are selected
        setErrorOpen(null);
    }, []);

    const handleUpload = useCallback(async () => {
        if (selectedFiles.length !== 0) {
            setImageResult(null);
            setUploadStarting(true);
            try {
                const imageResult = await fileService.uploadFileForOpenPosesDetection(selectedFiles[0]);
                setImageResult(imageResult);
            } catch (error) {
                setErrorMessage(error.message || "An unexpected error occurred.");
                setErrorOpen(true);
            } finally {
                setUploadStarting(false);
            }
        } else {
            setErrorMessage("You must drop or pick an image.");
            setErrorOpen(true);
        }
    }, [selectedFiles, fileService]);

    const handleCloseDialog = useCallback(() => {
        setErrorOpen(null);
    }, []);

    return (
        <>
            <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
                <Grid item xs={10} md={4} lg={4}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                        <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
                        <Button variant="contained" onClick={handleUpload} disabled={uploadStarting || selectedFiles.length === 0}>
                            {uploadStarting && <CircularProgress size={24} color="inherit" />}
                            {uploadStarting ? "Processing..." : "Send"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={10} md={6} lg={6}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                        <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                            {imageResult !== null ? (
                                <Stack direction={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <img
                                        src={imageResult}
                                        style={{ width: '50%', height: '50%', objectFit: 'cover' }}
                                        alt="File Content"
                                    />
                                </Stack>
                            ) : (
                                uploadStarting ? (
                                    <Skeleton variant="rectangular" width={510} height={200} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={NoResultImg} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
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
            <AlertDialog open={errorOpen} handleClose={handleCloseDialog} desc={errorMessage} />
        </>
    );
};
