import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || '76.76.21.21', // Hostinger MySQL host
  user: process.env.DB_USER || 'u181984996_Tanweer',
  password: process.env.DB_PASSWORD || 'TanweerSir12@WeM',
  database: process.env.DB_NAME || 'u181984996_Tanweer',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Export pool for use in API routes
export default pool; 