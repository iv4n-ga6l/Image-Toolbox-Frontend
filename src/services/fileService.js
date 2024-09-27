import axios from 'axios';

// Render url : https://image-toolbox-backend.onrender.com
const BASE_URL = "http://localhost:5000"

class FileService {


    async uploadFileForObjectsDetection(file, model) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/detect_objects?model=${model}`;
        
        try {
            const response = await axios.post(`${BASE_URL}${path}`, formData, {
                responseType: 'blob' // Set responseType to 'blob' to receive binary data
            });
            // Convert response data to Blob
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            // Create object URL from Blob
            const url = URL.createObjectURL(blob);
            return url;
        } catch (error) {
            console.error('Error:', error);
        }
    }



    async uploadFileForResizing(file, width, height) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/resize_image?width=${width}&height=${height}`;
        
        try {
            const response = await axios.post(`${BASE_URL}${path}`, formData, {
                responseType: 'blob' // Set responseType to 'blob' to receive binary data
            });
            // Convert response data to Blob
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            // Create object URL from Blob
            const url = URL.createObjectURL(blob);
            return url;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async uploadFileForFiltering(file, filter) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/apply_filter?filter=${filter}`;
        
        try {
            const response = await axios.post(`${BASE_URL}${path}`, formData, {
                responseType: 'blob' // Set responseType to 'blob' to receive binary data
            });
            // Convert response data to Blob
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            // Create object URL from Blob
            const url = URL.createObjectURL(blob);
            return url;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async uploadFileForTextExtract(file) {
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const response = await axios.post(`${BASE_URL}/extract_text`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async uploadFileForCompression(file, quality) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/compress_image?quality=${quality}`;
        
        try {
            const response = await axios.post(`${BASE_URL}${path}`, formData, {
                responseType: 'blob' // Set responseType to 'blob' to receive binary data
            });
            // Convert response data to Blob
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            // Create object URL from Blob
            const url = URL.createObjectURL(blob);
            return url;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async uploadFileForImageComparison(file1, file2) {
        const formData = new FormData();
        formData.append("file1", file1);
        formData.append("file2", file2);
        
        try {
            const response = await axios.post(`${BASE_URL}/compare_images`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async uploadFileForObjectsCounting(file, model) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/count_objects?model=${model}`;
        
        try {
            const response = await axios.post(`${BASE_URL}${path}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async uploadFileForOpenPosesDetection(file) {
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const response = await axios.post(`${BASE_URL}/detect_open_poses`, formData, {
                responseType: 'blob' // Set responseType to 'blob' to receive binary data
            });
            // Convert response data to Blob
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            // Create object URL from Blob
            const url = URL.createObjectURL(blob);
            return url;
        } catch (error) {
            console.error('Error:', error);
        }
    }

}

export default FileService;