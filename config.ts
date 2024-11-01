type Environment = 'development' | 'production'

interface Config {
  baseURL: string
}

interface Configurations {
  [key: string]: Config
}

const config: Configurations = {
  development: {
    baseURL: "http://localhost:5000",
  },
  production: {
    baseURL: "https://image-toolbox-backend.onrender.com",
  },
}

const env = (process.env.NODE_ENV || 'development') as Environment

export default {
  ...config[env],
  env,
} as Config & { env: Environment }