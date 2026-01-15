import { recordingsService } from '../services/recordingsService';

export const addDefaultRecordings = async () => {
  const recordings = [
    {
      title: 'Software Architecture',
      description: 'Testing Fundamentals',
      youtubeUrl: 'https://www.youtube.com/watch?v=l8zTj5wUOu8',
      duration: '',
      category: 'Training',
      createdBy: 'asadmulla241097@gmail.com',
      isActive: true
    }
  ];

  const results = [];
  for (const recording of recordings) {
    try {
      const id = await recordingsService.createRecording(recording);
      if (id) {
        results.push({ success: true, title: recording.title, id });
        console.log(`✅ Added: ${recording.title}`);
      } else {
        results.push({ success: false, title: recording.title, error: 'Failed to create' });
        console.log(`❌ Failed: ${recording.title}`);
      }
    } catch (error) {
      results.push({ success: false, title: recording.title, error: String(error) });
      console.log(`❌ Error: ${recording.title}`, error);
    }
  }

  return results;
};
