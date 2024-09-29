import axios from 'axios';
import config from '../config';

class FileService {
    constructor() {
        this.axios = axios.create({
            baseURL: config.baseURL,
            // timeout: 30000, // 30 seconds timeout
        });
    }

    async makeRequest(method, url, data = null, options = {}) {
        try {
            const response = await this.axios({
                method,
                url,
                data,
                ...options,
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('Network error: No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Request error: ${error.message}`);
            }
        }
    }

    async uploadFileForObjectsDetection(file, model) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/detect_objects?model=${model}`;
        
        const blob = await this.makeRequest('post', path, formData, {
            responseType: 'blob'
        });

        return URL.createObjectURL(blob);
    }

    async uploadFileForResizing(file, width, height) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/resize_image?width=${width}&height=${height}`;
        
        const blob = await this.makeRequest('post', path, formData, {
            responseType: 'blob'
        });

        return URL.createObjectURL(blob);
    }

    async uploadFileForFiltering(file, filter) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/apply_filter?filter=${filter}`;
        
        const blob = await this.makeRequest('post', path, formData, {
            responseType: 'blob'
        });

        return URL.createObjectURL(blob);
    }

    async uploadFileForTextExtract(file) {
        const formData = new FormData();
        formData.append("file", file);
        
        return this.makeRequest('post', '/extract_text', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    async uploadFileForCompression(file, quality) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/compress_image?quality=${quality}`;
        
        const blob = await this.makeRequest('post', path, formData, {
            responseType: 'blob'
        });

        return URL.createObjectURL(blob);
    }

    async uploadFileForImageComparison(file1, file2) {
        const formData = new FormData();
        formData.append("file1", file1);
        formData.append("file2", file2);
        
        return this.makeRequest('post', '/compare_images', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    async uploadFileForObjectsCounting(file, model) {
        const formData = new FormData();
        formData.append("file", file);

        const path = `/count_objects?model=${model}`;
        
        return this.makeRequest('post', path, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    async uploadFileForOpenPosesDetection(file) {
        const formData = new FormData();
        formData.append("file", file);
        
        const blob = await this.makeRequest('post', '/detect_open_poses', formData, {
            responseType: 'blob'
        });

        return URL.createObjectURL(blob);
    }
}

export default FileService;