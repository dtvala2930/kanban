import "dotenv/config";

// Server
export const PORT = process.env.PORT || 80;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_SERVERLESS = process.env.IS_SERVERLESS;

// Database
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = +process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_LOGGING = process.env.DB_LOGGING;

// CRYPTO
export const CIPHER_MODE = process.env.CIPHER_MODE;
export const CIPHER_KEY = process.env.CIPHER_KEY;
export const CIPHER_IV = process.env.CIPHER_IV;

// AUTH
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRED_TIME_TOKEN = process.env.JWT_EXPIRED_TIME_TOKEN;
export const JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN = process.env.JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN;

// CORS
export const CORS_ORIGIN = process.env.CORS_ORIGIN;

// AWS S3 TEMP
export const TMP_STORAGE_ID = process.env.TMP_STORAGE_ID;

// AWS S3 ONLINE
export const ONLINE_STORAGE_ID = process.env.ONLINE_STORAGE_ID;
export const ONLINE_STORAGE_URL = process.env.ONLINE_STORAGE_URL;

// AWS LAMBDA FUNCTION
export const MASTER_LINKAGE_RUN_AS_LOCAL = process.env.MASTER_LINKAGE_RUN_AS_LOCAL;
export const APP_ENV_PREFIX = process.env.APP_ENV_PREFIX;
export const MASTER_LINKAGE_CLONE = process.env.MASTER_LINKAGE_CLONE;

export const AWS_REGION = process.env.AWS_REGION || "ap-northeast-1";

// FILE TYPE
export const OFFICE_FILE_TYPE = process.env.OFFICE_FILE_TYPE;
export const IMAGE_FILE_TYPE = process.env.IMAGE_FILE_TYPE;
export const VIDEO_FILE_TYPE = process.env.VIDEO_FILE_TYPE;

// for Access-Control-Allow-Origin header
export const POC_URL = process.env.POC_URL;
