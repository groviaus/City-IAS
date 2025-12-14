# Hostinger Upload Setup for Vercel

Since Vercel is "serverless" and essentially read-only, you cannot save uploaded images to the local `public/` folder in production. This guide explains how to proxy uploads to your Hostinger server.

## 1. Deploy the PHP Script

1. **Locate the script**: A file has been created at `hostinger-scripts/upload.php`.
2. **Edit the Secret**: Open `hostinger-scripts/upload.php` and change the `$SECRET_KEY` to a strong, random string (e.g., `MySuperSecretUploadKey2025!`).
3. **Upload to Hostinger**:
   - Log in to your Hostinger File Manager.
   - Go to `public_html`.
   - Upload the `upload.php` file there.
   - (Optional) Create a folder `uploads/gallery` in `public_html` if you want to ensure it exists, though the script attempts to create it.
4. **Test the URL**: Visit `https://your-domain.com/upload.php`. You should see `{"error": "Unauthorized: Invalid secret key"}`. This means it's working and secure.

## 2. Configure Vercel Environment Variables

Go to your Vercel Dashboard -> Settings -> Environment Variables and add these two:

| Variable Name | Value |
| dist | dist |
| `HOSTINGER_UPLOAD_URL` | `https://your-domain.com/upload.php` (The full URL to the file you just uploaded) |
| `HOSTINGER_UPLOAD_SECRET` | The exact secret key you set in the PHP file. |

## 3. Redeploy

Redeploy your application on Vercel.

## How it Works

- **Local Development**: If you don't set these variables locally in `.env.local`, the app will continue to save files to your local `public/uploads/gallery` folder, so `pnpm dev` keeps working as normal.
- **Production**: When Vercel sees these variables, it receives the file from the browser, then instantly forwards it to your Hostinger PHP script, which saves it to the Hostinger disk and returns the public URL.


