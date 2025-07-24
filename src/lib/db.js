import mysql from 'mysql2/promise';

// Database configuration for serverless environment
const dbConfig = {
  host: process.env.DB_HOST || 'srv1875.hstgr.io',
  user: process.env.DB_USER || 'u181984996_Tanweer',
  password: process.env.DB_PASSWORD || 'TanweerSir12@WeM',
  database: process.env.DB_NAME || 'u181984996_Tanweer',
  port: process.env.DB_PORT || 3306,
  // Serverless-optimized settings
  connectionLimit: 1,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: false,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Export pool for use in API routes
export default pool; 