import React, { useState, useCallback, useMemo } from "react";
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

import FileDropZone from "../components/FileDropZone";
import FileService from "../services/FileService";
import NoResultImg from '../assets/no-result.png';
import AlertDialog from "../components/AlertDialog";

export const ImageComparison = () => {
    const theme = useTheme();
    // use of useMemo to ensure fileService is only created once
    const fileService = useMemo(() => new FileService(), []);

    const [selectedFiles1, setSelectedFiles1] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [uploadStarting, setUploadStarting] = useState(false);
    const [comparisonResult, setComparisonResult] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleFirstFilesSelected = useCallback((files) => {
        setSelectedFiles1(files);
        setAlertMessage(null); 
        setAlertOpen(null);
    }, []);

    const handleSecondFilesSelected = useCallback((files) => {
        setSelectedFiles2(files);
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
        if (selectedFiles1.length === 0) {
            showAlert('You must drop or pick the first image');
        } else if (selectedFiles2.length === 0) {
            showAlert('You must drop or pick the second image');
        } else {
            setComparisonResult(null);
            setUploadStarting(true);
            try {
                const result = await fileService.uploadFileForImageComparison(selectedFiles1[0], selectedFiles2[0]);
                setUploadStarting(false);
                setComparisonResult(result.similarity_score);
            } catch (error) {
                showAlert(error.message || "An unexpected error occurred.");
            } finally {
                setUploadStarting(false);
            }
        }
    }, [selectedFiles1, selectedFiles2, fileService]);

    const getSimilarityText = () => {
        if (comparisonResult < 0) {
            return "There is no probability that it is the same image or person or object";
        } else if (comparisonResult <= 0.5) {
            return "There is a low probability that it is the same image or person or object";
        } else {
            return "There is a high probability that it is the same image or person or object";
        }
    };

    return (
        <>
            <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
                <Grid item xs={10} md={4} lg={4}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography fontSize={18} fontWeight={'bold'}>Upload the images to compare</Typography>

                        <Typography fontSize={15}>First image</Typography>
                        <FileDropZone allowMultiple={false} onFilesSelected={handleFirstFilesSelected} />

                        <Typography fontSize={15}>Second image</Typography>
                        <FileDropZone allowMultiple={false} onFilesSelected={handleSecondFilesSelected} />
                        
                        <Button variant="contained" onClick={handleUpload} disabled={uploadStarting || selectedFiles1.length === 0 || selectedFiles2.length === 0}>
                            {uploadStarting && <CircularProgress size={24} color="inherit" />}
                            {uploadStarting ? "Processing..." : "Send"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={10} md={5} lg={5}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                        <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                            {comparisonResult !== null && (
                                <>
                                    <Typography fontSize={18}>Similarity: {(Number(comparisonResult) * 100).toFixed(1)}%</Typography>
                                    <Typography fontSize={15}>{getSimilarityText()}</Typography>
                                </>
                            )}

                            {uploadStarting ? (
                                <Skeleton animation="wave" variant="rectangular" width={410} height={200} />
                            ) : (
                                comparisonResult === null && (
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <img src={NoResultImg} style={{ width: '200px', height: '200px', objectFit: 'cover' }} alt="No Result" />
                                    </div>
                                )
                            )}
                        </Box>
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