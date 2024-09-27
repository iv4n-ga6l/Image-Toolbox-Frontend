import React, { useState, useRef } from 'react';
import {
    Typography,
    SvgIcon,
    Stack,
    useTheme
} from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';


const FileDropZone = ({ allowMultiple = true, onFilesSelected }) => {
    const theme = useTheme()

    const [droppedFiles, setDroppedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        // Filter files to keep only image files (JPEG, PNG, GIF, etc.)
        // const imageFiles = files.filter((file) => {
        //     return file.type.startsWith('image/');
        // });

        // Filter files to keep only JPG, JPEG, and PNG images
        const imageFiles = files.filter((file) => {
            const fileType = file.type.toLowerCase();
            return fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png';
        });

        if (imageFiles.length === 0) {
            alert('Please select a JPG, JPEG, or PNG image.');
            return;
        }

        if (!allowMultiple) {
            setDroppedFiles([imageFiles[0]]);
            onFilesSelected([imageFiles[0]]);
        } else {
            setDroppedFiles(imageFiles);
            onFilesSelected(imageFiles);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);

        // Filter files to keep only image files (JPEG, PNG, GIF, etc.)
        // const imageFiles = files.filter((file) => {
        //     return file.type.startsWith('image/');
        // });

        // Filter files to keep only JPG, JPEG, and PNG images
        const imageFiles = files.filter((file) => {
            const fileType = file.type.toLowerCase();
            return fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png';
        });

        if (imageFiles.length === 0) {
            alert('Please select a JPG, JPEG, or PNG image.');
            return;
        }

        if (!allowMultiple) {
            setDroppedFiles([imageFiles[0]]);
            onFilesSelected([imageFiles[0]]);
        } else {
            setDroppedFiles(imageFiles);
            onFilesSelected(imageFiles);
        }
    };

    const getExtension = (filename) => {
        return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    };

    const formatFileName = (file) => {
        const fileName = file.name;
        const fileExtension = getExtension(fileName);
        return `${fileName.substring(0, fileName.length / 2)}...${fileExtension}`;
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 10,
                    border: '2px dotted #aaa',
                    borderRadius: 3,
                    // cursor: 'pointer',
                }
            }
        >
            <Typography variant="h6" fontSize={13}>Drop the image file here</Typography>
            <input
                type="file"
                // accept="image/*"
                accept="image/jpeg,image/jpg,image/png"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
                multiple={allowMultiple}
            />
            or
            <button
                style={{ padding: 7, backgroundColor: theme.palette.secondary.main, color: 'white', borderStyle: 'none', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => fileInputRef.current.click()}>
                <Stack direction={'row'} display={'flex'} alignItems={'center'} spacing={0.5}>
                    <SvgIcon sx={{ fontSize: 12 }}><UploadFileIcon style={{fontWeight: 'bold'}} /></SvgIcon>
                    <Typography fontSize={13} variant='h6'>Pick the image</Typography>
                </Stack>
            </button>
            <div style={
                {
                    marginTop: 2,
                    textAlign: 'left'
                }
            }
            >
                {droppedFiles.map((file, index) => (
                    <div key={index}>
                        {formatFileName(file)} ({(file.size / 1024).toFixed(2)} KB)
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileDropZone;
