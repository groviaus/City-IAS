import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Get total applications count
    const applicationsResult = await query(
      "SELECT COUNT(*) as count FROM applications"
    );
    const totalApplications = applicationsResult[0]?.count || 0;

    // Get total courses count
    const coursesResult = await query("SELECT COUNT(*) as count FROM courses");
    const totalCourses = coursesResult[0]?.count || 0;

    // Get important dates count
    await query(`CREATE TABLE IF NOT EXISTS important_dates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      icon VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      date_text VARCHAR(100) NOT NULL,
      year_text VARCHAR(100) NOT NULL,
      order_index INT DEFAULT 0,
      active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
    const importantResult = await query(
      "SELECT COUNT(*) as count FROM important_dates"
    );
    const totalImportantDates = importantResult[0]?.count || 0;

    // Get urgency banner count
    await query(`CREATE TABLE IF NOT EXISTS urgency_banner (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      subtitle VARCHAR(300) NOT NULL,
      batch_start_date DATE NOT NULL,
      available_seats INT DEFAULT 50,
      active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
    const urgencyResult = await query(
      "SELECT COUNT(*) as count FROM urgency_banner"
    );
    const totalUrgencyBanners = urgencyResult[0]?.count || 0;

    return NextResponse.json({
      totalApplications,
      totalCourses,
      totalImportantDates,
      totalUrgencyBanners,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
