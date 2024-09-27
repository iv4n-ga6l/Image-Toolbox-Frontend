import React, { useState, useCallback, useMemo } from "react";
import {
    Stack,
    Grid,
    Box,
    Typography,
    Button,
    CircularProgress,
    Skeleton,
    Alert,
    Snackbar,
    useTheme
} from "@mui/material";
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import FileDropZone from "../components/fileDropZone";
import FileService from "../services/fileService";
import NoResultImg from '../assets/no-result.png';
import AlertDialog from "../components/AlertDialog";

export const TextExtract = () => {
    const theme = useTheme();
    // use of useMemo to ensure fileService is only created once
    const fileService = useMemo(() => new FileService(), []);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStarting, setUploadStarting] = useState(false);
    const [textResult, setTextResult] = useState(null);
    const [error, setError] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleFilesSelected = useCallback((files) => {
        setSelectedFiles(files);
        setError(null);
    }, []);

    const handleUpload = useCallback(async () => {
        if (selectedFiles.length === 0) {
            setError('Please select an image to extract text from.');
            return;
        }

        setTextResult(null);
        setUploadStarting(true);
        setError(null);

        try {
            const result = await fileService.uploadFileForTextExtract(selectedFiles[0]);
            setTextResult(result.text);
        } catch (error) {
            setError(error.message || 'An error occurred during text extraction. Please try again.');
        } finally {
            setUploadStarting(false);
        }
    }, [selectedFiles, fileService]);

    const copyToClipboard = useCallback(() => {
        if (!textResult) return;

        navigator.clipboard.writeText(textResult)
            .then(() => setShowSnackbar(true))
            .catch((err) => setError('Failed to copy text: ' + err.message));
    }, [textResult]);

    const handleCloseError = useCallback(() => {
        setError(null);
    }, []);

    const handleCloseSnackbar = useCallback(() => {
        setShowSnackbar(false);
    }, []);

    return (
        <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
            <Grid item xs={10} md={4} lg={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
                    <Button 
                        variant="contained" 
                        onClick={handleUpload} 
                        disabled={uploadStarting || selectedFiles.length === 0}
                    >
                        {uploadStarting ? (
                            <>
                                <CircularProgress size={24} color="inherit" sx={{ marginRight: 1 }} />
                                Processing...
                            </>
                        ) : "Send"}
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={10} md={5} lg={5}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                    <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                        {textResult ? (
                            <Typography>{textResult}</Typography>
                        ) : uploadStarting ? (
                            <Skeleton variant="rectangular" width="100%" height={200} />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={NoResultImg} style={{ width: '200px', height: '200px', objectFit: 'cover' }} alt="No Result" />
                            </Box>
                        )}
                    </Box>
                    {textResult && (
                        <Button size="small" onClick={copyToClipboard}>
                            <ContentPasteTwoToneIcon sx={{ marginRight: 1 }} />
                            Copy
                        </Button>
                    )}
                </Stack>
            </Grid>
            <AlertDialog open={!!error} handleClose={handleCloseError} desc={error || ''} />
            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showSnackbar}
                onClose={handleCloseSnackbar}
                autoHideDuration={2000}
            >
                <Alert severity="info">The text has been copied to the clipboard.</Alert>
            </Snackbar>
        </Grid>
    );
};
