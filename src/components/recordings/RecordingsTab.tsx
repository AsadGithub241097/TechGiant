import React, { useState, useEffect, useCallback } from 'react';
import { Play, Clock, CheckCircle, XCircle, Loader2, Video, AlertCircle, ArrowLeft, Folder } from 'lucide-react';
import { 
  recordingsService, 
  Recording, 
  RecordingAccess,
  SectionAccess,
  UserRecordingProgress 
} from '../../services/recordingsService';
import { useAuth } from '../../contexts/FirebaseAuthContext';
import VideoPlayer from './VideoPlayer';

const RecordingsTab: React.FC = () => {
  const { appUser } = useAuth();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [sectionAccessRequests, setSectionAccessRequests] = useState<SectionAccess[]>([]);
  const [approvedSections, setApprovedSections] = useState<string[]>([]);
  const [userProgress, setUserProgress] = useState<UserRecordingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    if (appUser) {
      loadData();
    }
  }, [appUser]);

  const loadData = async () => {
    if (!appUser) return;
    
    setLoading(true);
    try {
      // Get all recordings
      const allRecordings = await recordingsService.getAllRecordings();
      setRecordings(allRecordings);

      // Get all sections
      const allSections = await recordingsService.getAllSections();
      setSections(allSections);

      // Get user's section access requests
      const sectionRequests = await recordingsService.getUserSectionAccessRequests(appUser.uid);
      setSectionAccessRequests(sectionRequests);

      // Get user's approved sections
      const approved = await recordingsService.getUserApprovedSections(appUser.uid);
      setApprovedSections(approved);

      // Get user's progress
      const progress = await recordingsService.getAllUserProgress(appUser.uid);
      setUserProgress(progress);
    } catch (error) {
      console.error('Error loading recordings:', error);
      setMessage({ type: 'error', text: 'Failed to load recordings' });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSectionAccess = async (section: string) => {
    if (!appUser) return;

    try {
      const success = await recordingsService.requestSectionAccess(appUser.uid, section);
      if (success) {
        setMessage({ type: 'success', text: `Access request for ${section} submitted! Admin will review it.` });
        await loadData();
      } else {
        setMessage({ type: 'error', text: `You have already requested access to ${section}.` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to request access' });
    }
  };

  const handlePlayRecording = async (recording: Recording) => {
    if (!appUser || !recording.section) return;

    // Check if user has section access
    const hasAccess = await recordingsService.hasSectionAccess(appUser.uid, recording.section);
    
    if (!hasAccess) {
      setMessage({ type: 'error', text: 'You need admin approval to access this section.' });
      return;
    }

    setSelectedRecording(recording);
  };

  const handleProgressUpdate = useCallback(async (
    recordingId: string,
    progress: number,
    watchedDuration: number,
    totalDuration: number
  ) => {
    if (!appUser) return;

    // Update progress without reloading all data to prevent re-renders
    await recordingsService.updateUserProgress(
      appUser.uid,
      recordingId,
      progress,
      watchedDuration,
      totalDuration
    );
    // Only reload progress data, not all recordings
    const updatedProgress = await recordingsService.getAllUserProgress(appUser.uid);
    setUserProgress(updatedProgress);
  }, [appUser]);

  const getSectionStatus = (section: string): 'pending' | 'approved' | 'denied' | 'none' => {
    const request = sectionAccessRequests.find(req => req.section === section);
    return request ? request.status : 'none';
  };

  const hasSectionAccess = (section: string): boolean => {
    return approvedSections.includes(section);
  };

  const getRecordingProgress = (recordingId: string): number => {
    const progress = userProgress.find(p => p.recordingId === recordingId);
    return progress ? progress.progress : 0;
  };

  const isRecordingApproved = (recording: Recording): boolean => {
    if (!recording.section) return false;
    return hasSectionAccess(recording.section);
  };

  // Memoize the progress update callback for the selected recording
  const progressUpdateCallback = useCallback((progress: number, watchedDuration: number, totalDuration: number) => {
    if (selectedRecording) {
      handleProgressUpdate(selectedRecording.id, progress, watchedDuration, totalDuration);
    }
  }, [selectedRecording, handleProgressUpdate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white mb-6">Recordings</h2>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-blue-300 font-medium mb-1">How to Access Recordings</p>
          <p className="text-xs text-blue-400">
            Click <span className="font-semibold">"Request Access"</span> on any section to request access to all recordings in that section. 
            Once an admin approves your request, you'll be able to watch all current and future recordings in that section. 
            Check the status badge on each section to see if your request is pending, approved, or denied.
          </p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
            : 'bg-red-500/20 border border-red-500/30 text-red-400'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      {/* Section-based View */}
      {!selectedSection ? (
        /* Sections View */
        sections.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-700">
            <Video className="mx-auto h-12 w-12 text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-white">No sections available</h3>
            <p className="mt-1 text-sm text-gray-400">Check back later for new recordings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => {
              const sectionRecordings = recordings.filter(r => r.section === section);
              const sectionStatus = getSectionStatus(section);
              const hasAccess = hasSectionAccess(section);
              
              return (
                <div
                  key={section}
                  className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors duration-300"
                >
                  <div 
                    onClick={hasAccess ? () => setSelectedSection(section) : undefined}
                    className={hasAccess ? "cursor-pointer" : ""}
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                      <Folder className="w-16 h-16 text-blue-400" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2">{section}</h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {sectionRecordings.length} {sectionRecordings.length === 1 ? 'recording' : 'recordings'}
                      </p>
                      {hasAccess ? (
                        <div className="flex items-center space-x-2 text-green-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Access Granted</span>
                        </div>
                      ) : sectionStatus === 'pending' ? (
                        <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Pending Approval</span>
                        </div>
                      ) : sectionStatus === 'denied' ? (
                        <div className="flex items-center space-x-2 text-red-400 text-sm">
                          <XCircle className="w-4 h-4" />
                          <span>Access Denied</span>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRequestSectionAccess(section);
                          }}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 text-sm"
                        >
                          Request Access
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Recordings in Selected Section */
        <div>
          <button
            onClick={() => setSelectedSection(null)}
            className="mb-4 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sections</span>
          </button>
          
          <h3 className="text-xl font-bold text-white mb-4">{selectedSection}</h3>
          
          {recordings.filter(r => r.section === selectedSection).length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-700">
              <Video className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-2 text-sm font-medium text-white">No recordings in this section</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordings.filter(r => r.section === selectedSection).map((recording) => {
            const progress = getRecordingProgress(recording.id);
            const isApproved = isRecordingApproved(recording);

            return (
              <div
                key={recording.id}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-800 relative">
                  {recording.thumbnail ? (
                    <img
                      src={recording.thumbnail}
                      alt={recording.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {isApproved ? (
                      <button
                        onClick={() => handlePlayRecording(recording)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-colors duration-300"
                      >
                        <Play className="w-8 h-8" />
                      </button>
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-white text-sm mb-2">
                          {status === 'pending' ? 'Access Pending' : 
                           status === 'denied' ? 'Access Denied' : 
                           'Request Access'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isApproved && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{recording.title}</h3>
                  
                  {recording.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{recording.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      {recording.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{recording.duration}</span>
                        </div>
                      )}
                      {isApproved && progress > 0 && (
                        <div className="flex items-center space-x-1">
                          <span>{Math.round(progress)}%</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {isApproved ? (
                      <button
                        onClick={() => handlePlayRecording(recording)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 text-sm"
                      >
                        <Play className="w-4 h-4" />
                        <span>{progress > 0 ? 'Continue' : 'Watch'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Section Access Required</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
            </div>
          )}
        </div>
      )}

      {/* Video Player Modal */}
      {selectedRecording && (
        <VideoPlayer
          key={selectedRecording.id} // Key prevents re-renders when same recording is selected
          recording={selectedRecording}
          onClose={() => setSelectedRecording(null)}
          onProgressUpdate={progressUpdateCallback}
          userId={appUser?.uid}
        />
      )}
    </div>
  );
};

export default RecordingsTab;
