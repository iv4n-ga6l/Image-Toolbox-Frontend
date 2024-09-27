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

export const ObjectsDetection = () => {
    const theme = useTheme();
    const fileService = new FileService();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [model, setModel] = useState('yolov3');
    const [uploadStarting, setUploadStarting] = useState(false);
    const [imageResult, setImageResult] = useState(null);
    const [countingResult, setCountingResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFilesSelected = useCallback((files) => {
        setSelectedFiles(files);
        setError(null); // Clear any previous errors when new files are selected
    }, []);

    const handleClose = useCallback(() => {
        setError(null);
    }, []);

    const handleUpload = useCallback(async () => {
        if (selectedFiles.length === 0) {
            setError('Please select an image to upload.');
            return;
        }

        setImageResult(null);
        setCountingResult(null);
        setUploadStarting(true);
        setError(null);

        try {
            const imageResult = await fileService.uploadFileForObjectsDetection(selectedFiles[0], model);
            const countingResult = await fileService.uploadFileForObjectsCounting(selectedFiles[0], model);

            setImageResult(imageResult);
            setCountingResult(countingResult);
        } catch (error) {
            setError(error.message || 'An error occurred during object detection. Please try again.');
        } finally {
            setUploadStarting(false);
        }
    }, [selectedFiles, model, fileService]);

    const displayCountingResult = useCallback(() => {
        if (!countingResult) return null;
        const keys = Object.keys(countingResult);
        return (
            <Stack direction={'row'}>
                {keys.length} object(s) detected :
                <Typography sx={{ marginLeft: 1 }} color={'mediumslateblue'} fontWeight={'bold'}>
                    {keys.join(', ')}
                </Typography>
            </Stack>
        );
    }, [countingResult]);

    return (
        <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
            <Grid item xs={12} md={4} lg={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontSize={18} fontWeight={'bold'}>Upload the image to process</Typography>
                    <FileDropZone allowMultiple={false} onFilesSelected={handleFilesSelected} />
                    <FormControl fullWidth>
                        <InputLabel id="model-select-label">Model</InputLabel>
                        <Select
                            labelId="model-select-label"
                            id="model-select"
                            value={model}
                            label="Model"
                            onChange={(e) => setModel(e.target.value)}
                        >
                            {['yolov3', 'yolov5', 'yolov7', 'yolov8', 'yolov10'].map((modelName) => (
                                <MenuItem key={modelName} value={modelName}>{modelName}</MenuItem>
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
            <Grid item xs={12} md={6} lg={6}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                    <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                        {imageResult ? (
                            <>
                                <Stack direction={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <img
                                        src={imageResult}
                                        style={{ width: '50%', height: '50%', objectFit: 'cover' }}
                                        alt="Processed Image"
                                    />
                                    {displayCountingResult()}
                                </Stack>
                            </>
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
                    {error && <AlertDialog open={!!error} handleClose={handleClose} desc={error} />}
                </Stack>
            </Grid>
        </Grid>
    );
};