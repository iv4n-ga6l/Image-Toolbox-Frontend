import React, { useState, useCallback } from "react";
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

export const ImageResizing = () => {
    const theme = useTheme();
    const fileService = new FileService();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFilesSelected = useCallback((files) => {
        setSelectedFiles(files);
        setError(null);
    }, []);

    const handleWidthChange = useCallback((e) => {
        setWidth(e.target.value);
        setError(null);
    }, []);

    const handleHeightChange = useCallback((e) => {
        setHeight(e.target.value);
        setError(null);
    }, []);

    const validateInputs = useCallback(() => {
        if (selectedFiles.length === 0) {
            setError('Please select an image to resize.');
            return false;
        }
        if (!width || isNaN(width) || width <= 0) {
            setError('Please enter a valid width (greater than 0).');
            return false;
        }
        if (!height || isNaN(height) || height <= 0) {
            setError('Please enter a valid height (greater than 0).');
            return false;
        }
        return true;
    }, [selectedFiles, width, height]);

    const handleUpload = useCallback(async () => {
        if (!validateInputs()) return;

        setImageResult(null);
        setUploadStarting(true);
        setError(null);

        try {
            const result = await fileService.uploadFileForResizing(selectedFiles[0], parseInt(width), parseInt(height));
            setImageResult(result);
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error during image resizing:', error);
            setError(error.message || 'An error occurred during image resizing. Please try again.');
        } finally {
            setUploadStarting(false);
        }
    }, [selectedFiles, width, height, validateInputs, fileService]);

    const handleCloseError = useCallback(() => {
        setError(null);
    }, []);

    return (
        <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
            <Grid item xs={10} md={4} lg={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
                    <Stack direction={'row'} spacing={2}>
                        <TextField 
                            label="Width" 
                            variant="outlined" 
                            fullWidth 
                            type="number"
                            value={width}
                            onChange={handleWidthChange}
                            error={!width && error}
                            helperText={!width && error ? "Width is required" : ""}
                        />
                        <TextField 
                            label="Height" 
                            variant="outlined" 
                            fullWidth 
                            type="number"
                            value={height}
                            onChange={handleHeightChange}
                            error={!height && error}
                            helperText={!height && error ? "Height is required" : ""}
                        />
                    </Stack>
                    <Button 
                        variant="contained" 
                        onClick={handleUpload} 
                        disabled={uploadStarting || selectedFiles.length === 0 || !width || !height}
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
                        {imageResult ? (
                            <img
                                src={imageResult}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt="Resized Image"
                            />
                        ) : uploadStarting ? (
                            <Skeleton variant="rectangular" width="100%" height={200} />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={NoResultImg} style={{ width: '200px', height: '200px', objectFit: 'cover' }} alt="No Result" />
                            </Box>
                        )}
                    </Box>
                    {imageResult && (
                        <Button size="small" download href={imageResult}>
                            <DownloadForOfflineIcon sx={{ marginRight: 1 }} />
                            Download
                        </Button>
                    )}
                </Stack>
            </Grid>
            <AlertDialog open={!!error} handleClose={handleCloseError} desc={error || ''} />
        </Grid>
    );
};