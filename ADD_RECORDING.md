# Add Recording - Quick Guide

## Option 1: Add via Admin Panel (Recommended)

1. Go to **Admin Panel** → **Recording Access** tab
2. Click **"Add Recording"** button
3. Fill in the form:
   - **Title**: `Software Architecture`
   - **Description**: `Testing Fundamentals`
   - **YouTube URL**: `https://www.youtube.com/watch?v=l8zTj5wUOu8`
   - **Duration**: (optional, leave empty)
   - **Category**: `Training`
4. Click **"Add Recording"**

## Option 2: Add via Browser Console

1. Open your browser's Developer Console (F12)
2. Make sure you're logged in as admin
3. Copy and paste this code:

```javascript
// Import the recordings service (if available in window)
// Or use this direct Firestore approach:

import { recordingsService } from './src/services/recordingsService';

const addRecording = async () => {
  const recording = {
    title: 'Software Architecture',
    description: 'Testing Fundamentals',
    youtubeUrl: 'https://www.youtube.com/watch?v=l8zTj5wUOu8',
    duration: '',
    category: 'Training',
    createdBy: 'asadmulla241097@gmail.com',
    isActive: true
  };

  try {
    const id = await recordingsService.createRecording(recording);
    if (id) {
      console.log('✅ Recording added successfully! ID:', id);
      alert('Recording added successfully!');
    } else {
      console.error('❌ Failed to add recording');
      alert('Failed to add recording');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding recording: ' + error.message);
  }
};

addRecording();
```

## Option 3: Direct Firestore (Advanced)

If you have access to Firebase Console:
1. Go to Firestore Database
2. Navigate to `recordings` collection
3. Click "Add document"
4. Add these fields:
   - `title`: "Software Architecture"
   - `description`: "Testing Fundamentals"
   - `youtubeUrl`: "https://www.youtube.com/watch?v=l8zTj5wUOu8"
   - `duration`: ""
   - `category`: "Training"
   - `createdBy`: "asadmulla241097@gmail.com"
   - `isActive`: true
   - `createdAt`: (timestamp - will be auto-generated)
