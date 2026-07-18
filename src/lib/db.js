import mysql from "mysql2/promise";

// Database configuration for serverless environment
const dbConfig = {
  host: "srv1668.hstgr.io",
  user: "u181984996_cityiasacademy",
  password: "D=a9whhW7@",
  database: "u181984996_cityiasacademy",
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

// Helper function to execute queries
export async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Export pool for use in API routes
export default pool;
