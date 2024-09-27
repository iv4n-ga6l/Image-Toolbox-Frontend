import React, { useState, useCallback } from "react";
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
} from "@mui/material";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FileDropZone from "../components/FileDropZone";
import FileService from "../services/FileService";
import NoResultImg from '../assets/no-result.png';
import AlertDialog from "../components/AlertDialog";

export const ImageFiltering = () => {
    const theme = useTheme();
    const fileService = new FileService();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filter, setFilter] = useState('blur');
    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFilesSelected = useCallback((files) => {
        setSelectedFiles(files);
        setError(null);
    }, []);

    const handleFilterChange = useCallback((event) => {
        setFilter(event.target.value);
        setError(null);
    }, []);

    const handleUpload = useCallback(async () => {
        if (selectedFiles.length === 0) {
            setError('Please select an image to filter.');
            return;
        }

        setImageResult(null);
        setUploadStarting(true);
        setError(null);

        try {
            const result = await fileService.uploadFileForFiltering(selectedFiles[0], filter);
            setImageResult(result);
        } catch (error) {
            setError(error.message || 'An error occurred during image filtering. Please try again.');
        } finally {
            setUploadStarting(false);
        }
    }, [selectedFiles, filter, fileService]);

    const handleCloseError = useCallback(() => {
        setError(null);
    }, []);

    const filters = [
        { value: 'blur', label: 'Blur' },
        { value: 'sharpen', label: 'Sharpen' },
        { value: 'grayscale', label: 'Grayscale' },
    ];

    return (
        <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
            <Grid item xs={10} md={4} lg={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
                    <FormControl fullWidth>
                        <InputLabel id="filter-select-label">Filter</InputLabel>
                        <Select
                            labelId="filter-select-label"
                            id="filter-select"
                            value={filter}
                            label="Filter"
                            onChange={handleFilterChange}
                        >
                            {filters.map((f) => (
                                <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                        {imageResult ? (
                            <Stack direction={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <img
                                    src={imageResult}
                                    style={{ width: '50%', height: '50%', objectFit: 'cover' }}
                                    alt="Filtered Image"
                                />
                            </Stack>
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