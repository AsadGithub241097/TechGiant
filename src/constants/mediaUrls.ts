/**
 * External media URLs to replace local assets
 * Upload your media files to cloud storage and update these URLs
 */

// Upload your videos to cloud storage (AWS S3, YouTube, etc.) and replace these placeholder URLs
export const VIDEO_URLS = {
  prayas: 'https://tgcloud.s3.ap-south-1.amazonaws.com/Prayas.mp4', // 62MB
  falahzar: 'https://tgcloud.s3.ap-south-1.amazonaws.com/falahzar.mp4', // 10MB
  forestHearbs: 'https://tgcloud.s3.ap-south-1.amazonaws.com/forestHearbs.mp4', // 97MB
  influx: 'https://tgcloud.s3.ap-south-1.amazonaws.com/influx1.mp4', // 95MB
} as const;

// Upload your images to cloud storage (AWS S3, Cloudinary, etc.) and replace these placeholder URLs
export const IMAGE_URLS = {
  // Large images (>1MB)
  liquid: 'https://tgcloud.s3.ap-south-1.amazonaws.com/liquid.jpg',
  ecommerce: 'https://tgcloud.s3.ap-south-1.amazonaws.com/ecommerce1.png',
  patchManagement: 'https://tgcloud.s3.ap-south-1.amazonaws.com/patchmanagement.jpg',
  website: 'https://tgcloud.s3.ap-south-1.amazonaws.com/website.png',
  adaptive: 'https://tgcloud.s3.ap-south-1.amazonaws.com/adaptive.png',
  vaptBg: 'https://tgcloud.s3.ap-south-1.amazonaws.com/vaptBG.png',
  operationCenter: 'https://tgcloud.s3.ap-south-1.amazonaws.com/opratiobcenter.jpg',
  securityOperations: 'https://tgcloud.s3.ap-south-1.amazonaws.com/securitytesting.jpg',
  
  // Medium images
  responseForensics: 'https://tgcloud.s3.ap-south-1.amazonaws.com/ResponseAndForensics.jpg',
  detectionResponse: 'https://tgcloud.s3.ap-south-1.amazonaws.com/detectionandresponse.jpg',
  securityTesting: 'https://tgcloud.s3.ap-south-1.amazonaws.com/securitytesting.jpg',
  wave: 'https://tgcloud.s3.ap-south-1.amazonaws.com/wave.jpg',
  laptopScreen: 'https://tgcloud.s3.ap-south-1.amazonaws.com/laptopScreen.png',
  developerActivity: 'https://tgcloud.s3.ap-south-1.amazonaws.com/Developer+activity.png',
  techGiantPng: 'https://tgcloud.s3.ap-south-1.amazonaws.com/TGpng.png',
  
  // Logo and icons
  logo: 'https://tgcloud.s3.ap-south-1.amazonaws.com/logo.svg',
  
  // SVG Icons
  icons: {
    innovation: 'https://tgcloud.s3.ap-south-1.amazonaws.com/innovation.svg',
    quality: 'https://tgcloud.s3.ap-south-1.amazonaws.com/quality.svg',
    centric: 'https://tgcloud.s3.ap-south-1.amazonaws.com/centric.svg',
    reliability: 'https://tgcloud.s3.ap-south-1.amazonaws.com/reliability.svg',
  },
  
  // Partner logos
  partners: {
    keyCube: 'https://tgcloud.s3.ap-south-1.amazonaws.com/Keycube.png',
    axis: 'https://tgcloud.s3.ap-south-1.amazonaws.com/axis.svg',
    falahzar: 'https://tgcloud.s3.ap-south-1.amazonaws.com/falahzar.png',
    forest: 'https://tgcloud.s3.ap-south-1.amazonaws.com/forest.webp',
    iStaff: 'https://tgcloud.s3.ap-south-1.amazonaws.com/iStaff.png',
    imflux: 'https://tgcloud.s3.ap-south-1.amazonaws.com/imflux.png',
    prayas: 'https://tgcloud.s3.ap-south-1.amazonaws.com/prayas.png',
  }
} as const;

/**
 * Instructions for uploading media files:
 * 
 * 1. AWS S3 (Recommended):
 *    - Create an S3 bucket
 *    - Upload your files
 *    - Make them public or use signed URLs
 *    - Replace URLs above with S3 URLs
 * 
 * 2. Cloudinary (Great for images):
 *    - Sign up for free account
 *    - Upload images via dashboard
 *    - Use auto-optimization features
 *    - Replace URLs with Cloudinary URLs
 * 
 * 3. GitHub Releases:
 *    - Create a new release in your GitHub repo
 *    - Attach media files as assets
 *    - Use the download URLs in this file
 * 
 * 4. YouTube/Vimeo (For videos):
 *    - Upload videos to YouTube or Vimeo
 *    - Use embed URLs or direct video URLs
 */
