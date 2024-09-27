import { useState } from "react";
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
} from "@mui/material"

import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';

import FileDropZone from "../components/fileDropZone";

import FileService from "../services/fileService";

import NoResultImg from '../assets/no-result3.png';

export const TextExtract = () => {
    const theme = useTheme();

    const fileService = new FileService();

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [uploadStarting, setUploadStarting] = useState(false);
    const [textResult, setTextResult] = useState(null);

    const handleFilesSelected = (files) => {
        setSelectedFiles(files);
    };


    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('You must drop or pick an image');
        } else {
            setTextResult(null);
            setUploadStarting(true);
            fileService.uploadFileForTextExtract(selectedFiles[0])
                .then((result) => {
                    setUploadStarting(false);
                    setSelectedFiles([]);
                    setTextResult(result.text);
                }).catch((error) => {
                    console.log(error);
                    setUploadStarting(false);
                });
        }
    }


    const [showSnackbar, setShowSnackbar] = useState(false);

    const copyToClipboard = () => {
        // Create a temporary textarea element
        var textarea = document.createElement("textarea");

        // Set the text content to the text to be copied
        textarea.value = textResult;

        // Append the textarea to the DOM
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();

        // Execute the copy command
        document.execCommand("copy");

        // Remove the textarea from the DOM
        document.body.removeChild(textarea);

        setShowSnackbar(true);
    }


    return (
        <Grid container sx={{ marginBottom: 30, mx: 4, marginTop: 4 }} spacing={6}>
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
            <Grid item xs={10} md={5} lg={5}>
                <Stack direction={'column'} spacing={2}>
                    <Typography fontWeight={'bold'} letterSpacing={2}>Result</Typography>
                    <Box sx={{ padding: 4, border: `2px solid ${theme.palette.primary.dark}` }}>
                        {
                            textResult != null &&
                            <Typography>{textResult}</Typography>
                        }

                        {
                            uploadStarting === true ?
                                <Skeleton variant="rectangular" width={410} height={200} /> :
                                (
                                    textResult == null &&
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <img src={NoResultImg} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                                    </div>
                                )
                        }

                    </Box>
                    {
                        textResult != null &&
                        <Button size="small" onClick={copyToClipboard}>
                            <ContentPasteTwoToneIcon />
                            Copy
                        </Button>
                    }
                </Stack>
            </Grid>
            {
                showSnackbar === true &&
                <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                autoHideDuration={2000}
                >
                    <Alert severity="info">The text has been copied to the clipboard.</Alert>
                </Snackbar>
            }
        </Grid>
    )

}