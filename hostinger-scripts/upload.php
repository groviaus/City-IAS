<?php
/**
 * Hostinger Image Upload Bridge
 * Upload this file to your Hostinger public_html folder (e.g., public_html/upload.php)
 * 
 * You also need to create an 'uploads/gallery' folder in public_html and ensure it has write permissions (755 or 777).
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// CONFIGURATION
$SECRET_KEY = "YOUR_SECRET_KEY_HERE"; // CHANGE THIS to a strong secret!
$UPLOAD_DIR = "uploads/gallery/";     // Relative to this script

// 1. Security Check
$provided_secret = $_POST['secret'] ?? '';
if ($provided_secret !== $SECRET_KEY) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized: Invalid secret key']);
    exit;
}

$action = $_POST['action'] ?? 'upload';

if ($action === 'delete') {
    // DELETE FILE LOGIC
    $filename = $_POST['filename'] ?? '';
    if (!$filename) {
        http_response_code(400);
        echo json_encode(['error' => 'No filename provided']);
        exit;
    }

    // Sanitize filename to prevent directory traversal
    $safeFilename = basename($filename);
    $targetFilePath = __DIR__ . '/' . $UPLOAD_DIR . $safeFilename;

    if (file_exists($targetFilePath)) {
        if (unlink($targetFilePath)) {
            echo json_encode(['success' => true, 'message' => 'File deleted']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete file']);
        }
    } else {
        // File not found is considered success (idempotent)
        echo json_encode(['success' => true, 'message' => 'File not found, already deleted']);
    }
    exit;
}

// UPLOAD LOGIC (Default)
// 2. File Validation
if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file provided']);
    exit;
}

$file = $_FILES['file'];
$fileName = basename($file['name']);
$targetDir = __DIR__ . '/' . $UPLOAD_DIR;

// Create directory if it doesn't exist
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0755, true);
}

// Generate unique filename to prevent overwrites
$extension = pathinfo($fileName, PATHINFO_EXTENSION);
$uniqueName = uniqid() . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
$targetFilePath = $targetDir . $uniqueName;

// 3. Move File
if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
    // Construct the public URL
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    // Adjust path if script is in a subdirectory
    $scriptDir = dirname($_SERVER['SCRIPT_NAME']);
    $urlPath = rtrim($scriptDir, '/') . '/' . $UPLOAD_DIR . $uniqueName;
    
    $fullUrl = $protocol . "://" . $host . $urlPath;
    
    echo json_encode([
        'success' => true,
        'url' => $fullUrl,
        'filename' => $uniqueName
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded file']);
}
?>
