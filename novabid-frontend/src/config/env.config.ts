/**
 * Environment configuration
 * Centralized environment variables management
 */
interface EnvConfig {
  API_URL: string;
  API_TIMEOUT: number;
  NODE_ENV: string;
}

const envConfig: EnvConfig = {
  API_URL: import.meta.env.VITE_API_URL || '',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 120000,
  NODE_ENV: import.meta.env.NODE_ENV || '',
};

export default envConfig;
