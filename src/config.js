const config = {
    development: {
        baseURL: "http://localhost:5000",
    },
    production: {
        baseURL: "https://image-toolbox-backend.onrender.com",
    },
};

const env = process.env.NODE_ENV || 'development';

export default {
    ...config[env],
    env,
};