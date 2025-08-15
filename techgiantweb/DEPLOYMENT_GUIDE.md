# Deployment Guide for Hostinger

## Prerequisites
- Hostinger hosting account
- File Manager access or FTP credentials

## Step-by-Step Deployment

### 1. Build the Project
```bash
cd techgiantweb
yarn build
```

### 2. Prepare Files for Upload
The build creates a `dist/` folder containing:
- `index.html` - Main HTML file
- `assets/` - All CSS, JS, images, and other assets
- `.htaccess` - Apache configuration for routing and optimization

### 3. Upload to Hostinger

#### Option A: Using Hostinger File Manager
1. Log in to your Hostinger control panel
2. Go to **File Manager**
3. Navigate to your domain's root directory (usually `public_html/`)
4. Upload all contents from the `dist/` folder to the root directory
5. Make sure `.htaccess` is uploaded (it might be hidden by default)

#### Option B: Using FTP
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your Hostinger FTP server
3. Navigate to `public_html/`
4. Upload all contents from the `dist/` folder

### 4. Verify Deployment
1. Visit your domain in a browser
2. Test all pages and functionality
3. Check that React Router works (try direct URLs)

### 5. Optional: Custom Domain Setup
If you want to use a custom domain:
1. Go to Hostinger control panel
2. Navigate to **Domains** → **Manage**
3. Add your custom domain
4. Point it to the same directory

## Important Notes

### File Structure on Server
Your server should have this structure:
```
public_html/
├── index.html
├── .htaccess
└── assets/
    ├── [css files]
    ├── [js files]
    ├── [images]
    └── [videos]
```

### Troubleshooting

#### 404 Errors on Direct URLs
- Ensure `.htaccess` file is uploaded
- Check that mod_rewrite is enabled on your hosting

#### Assets Not Loading
- Verify all files in `assets/` folder are uploaded
- Check file permissions (should be 644 for files, 755 for folders)

#### Build Issues
- Run `yarn install` before building
- Ensure all dependencies are installed

## Performance Optimization

The `.htaccess` file includes:
- Gzip compression for faster loading
- Cache headers for static assets
- Security headers for protection

## Updating the Site

To update your site:
1. Make changes to your code
2. Run `yarn build` again
3. Upload the new `dist/` contents to replace the old files

## Support

If you encounter issues:
1. Check Hostinger's error logs
2. Verify all files are uploaded correctly
3. Test with a simple HTML file first 