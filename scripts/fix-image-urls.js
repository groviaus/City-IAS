const mysql = require("mysql2/promise");

// Configuration from src/lib/db.js logic
const dbConfig = {
  host: process.env.DB_HOST || "srv1875.hstgr.io",
  user: process.env.DB_USER || "u181984996_cityiasacademy",
  password: process.env.DB_PASSWORD || "D=a9whhW7@",
  database: process.env.DB_NAME || "u181984996_cityiasacademy",
  port: process.env.DB_PORT || 3306,
};

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to database.");

    // 1. Update gallery_images table to LOCAL paths
    console.log("Converting gallery_images to local paths...");
    
    // Fetch all rows
    const [rows] = await connection.execute("SELECT id, src FROM gallery_images");
    
    let updatedCount = 0;
    for (const row of rows) {
      if (row.src.includes("http")) {
        // Extract filename (everything after the last slash, before any query params)
        const urlMatch = row.src.match(/\/([^\/\?]+)(\?.*)?$/);
        if (urlMatch && urlMatch[1]) {
          const filename = urlMatch[1];
          const newSrc = `/uploads/gallery/${filename}`;
          
          await connection.execute(
            "UPDATE gallery_images SET src = ? WHERE id = ?",
            [newSrc, row.id]
          );
          updatedCount++;
        }
      }
    }
    
    console.log(`Converted ${updatedCount} images to local paths.`);

    // Add other tables here if needed (e.g. faculty, courses)
    // Example:
    // const [result2] = await connection.execute(
    //   `UPDATE faculty SET image_url = REPLACE(image_url, ?, ?) WHERE image_url LIKE ?`,
    //   [OLD_DOMAIN, NEW_BASE, `%${OLD_DOMAIN}%`]
    // );

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    if (connection) await connection.end();
    console.log("Database connection closed.");
  }
}

migrate();
