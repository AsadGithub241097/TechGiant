import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Play,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Video,
  AlertCircle,
  ArrowLeft,
  FolderOpen,
  Lock,
  Unlock,
  BookOpen,
} from 'lucide-react';
import {
  recordingsService,
  Recording,
  SectionAccess,
  UserRecordingProgress,
} from '../../services/recordingsService';
import { useAuth } from '../../contexts/FirebaseAuthContext';
import VideoPlayer from './VideoPlayer';

const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]?.length === 11) return match[1];
  }
  return null;
};

const getRecordingThumbnail = (recording: Recording): string | null => {
  if (recording.thumbnail) return recording.thumbnail;
  const videoId = getYouTubeVideoId(recording.youtubeUrl);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

const RecordingsTab: React.FC = () => {
  const { appUser } = useAuth();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [sectionAccessRequests, setSectionAccessRequests] = useState<SectionAccess[]>([]);
  const [approvedSections, setApprovedSections] = useState<string[]>([]);
  const [userProgress, setUserProgress] = useState<UserRecordingProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingSection, setRequestingSection] = useState<string | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    if (appUser) {
      void loadData();
    }
  }, [appUser]);

  const loadData = async () => {
    if (!appUser) return;

    setLoading(true);
    try {
      const [allRecordings, allSections, sectionRequests, approved, progress] = await Promise.all([
        recordingsService.getAllRecordings(),
        recordingsService.getAllSections(),
        recordingsService.getUserSectionAccessRequests(appUser.uid),
        recordingsService.getUserApprovedSections(appUser.uid),
        recordingsService.getAllUserProgress(appUser.uid),
      ]);

      setRecordings(allRecordings);
      setSections(allSections);
      setSectionAccessRequests(sectionRequests);
      setApprovedSections(approved);
      setUserProgress(progress);
    } catch (error) {
      console.error('Error loading recordings:', error);
      setMessage({ type: 'error', text: 'Failed to load recordings. Please refresh the page.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSectionAccess = async (section: string) => {
    if (!appUser) return;

    setRequestingSection(section);
    try {
      const result = await recordingsService.requestSectionAccess(
        appUser.uid,
        section,
        appUser.name,
        appUser.email,
      );
      setMessage({ type: result.success ? 'success' : 'error', text: result.message });
      if (result.success) {
        await loadData();
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to request access. Please try again.' });
    } finally {
      setRequestingSection(null);
    }
  };

  const handlePlayRecording = async (recording: Recording) => {
    if (!appUser || !recording.section) return;

    const hasAccess = await recordingsService.hasSectionAccess(appUser.uid, recording.section);
    if (!hasAccess) {
      setMessage({ type: 'error', text: 'You need admin approval to access this section.' });
      return;
    }

    setSelectedRecording(recording);
  };

  const handleProgressUpdate = useCallback(
    async (
      recordingId: string,
      progress: number,
      watchedDuration: number,
      totalDuration: number,
    ) => {
      if (!appUser) return;

      await recordingsService.updateUserProgress(
        appUser.uid,
        recordingId,
        progress,
        watchedDuration,
        totalDuration,
      );
      const updatedProgress = await recordingsService.getAllUserProgress(appUser.uid);
      setUserProgress(updatedProgress);
    },
    [appUser],
  );

  const getSectionStatus = (section: string): 'pending' | 'approved' | 'denied' | 'none' => {
    const request = sectionAccessRequests.find((req) => req.section === section);
    return request ? request.status : 'none';
  };

  const hasSectionAccess = (section: string): boolean => approvedSections.includes(section);

  const getRecordingProgress = (recordingId: string): number => {
    const progress = userProgress.find((p) => p.recordingId === recordingId);
    return progress ? progress.progress : 0;
  };

  const stats = useMemo(() => {
    const pending = sections.filter((s) => getSectionStatus(s) === 'pending').length;
    const unlocked = sections.filter((s) => hasSectionAccess(s)).length;
    const inProgress = userProgress.filter((p) => p.progress > 0 && p.progress < 90).length;
    const completed = userProgress.filter((p) => p.progress >= 90 || p.completed).length;
    return {
      totalSections: sections.length,
      unlocked,
      pending,
      inProgress,
      completed,
      totalRecordings: recordings.length,
    };
  }, [sections, sectionAccessRequests, approvedSections, userProgress, recordings.length]);

  const progressUpdateCallback = useCallback(
    (progress: number, watchedDuration: number, totalDuration: number) => {
      if (selectedRecording) {
        void handleProgressUpdate(
          selectedRecording.id,
          progress,
          watchedDuration,
          totalDuration,
        );
      }
    },
    [selectedRecording, handleProgressUpdate],
  );

  const renderStatusBadge = (section: string) => {
    const status = getSectionStatus(section);
    const access = hasSectionAccess(section);

    if (access) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
          <Unlock className="h-3.5 w-3.5" />
          Unlocked
        </span>
      );
    }
    if (status === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
          <Clock className="h-3.5 w-3.5" />
          Pending
        </span>
      );
    }
    if (status === 'denied') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">
          <XCircle className="h-3.5 w-3.5" />
          Denied
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400">
        <Lock className="h-3.5 w-3.5" />
        Locked
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
        <Loader2 className="h-8 w-8 animate-spin text-carousel3" />
        <p className="mt-3 text-sm text-gray-400">Loading your recordings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-carousel3/80">
              Training Library
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Recordings</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Request access by section. Once approved, every video in that section becomes available to you.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-carousel2/20 bg-carousel2/10 px-4 py-2 text-sm text-carousel3">
            <BookOpen className="h-4 w-4" />
            {stats.totalRecordings} videos
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Sections', value: stats.totalSections, tone: 'text-white' },
          { label: 'Unlocked', value: stats.unlocked, tone: 'text-green-300' },
          { label: 'Pending', value: stats.pending, tone: 'text-yellow-300' },
          { label: 'In Progress', value: stats.inProgress, tone: 'text-carousel3' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-sm"
          >
            <p className={`text-2xl font-bold ${stat.tone}`}>{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-carousel2/20 bg-carousel2/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-carousel3" />
          <div>
            <p className="text-sm font-medium text-white">How access works</p>
            <p className="mt-1 text-sm text-gray-400">
              Tap <span className="font-semibold text-carousel3">Request Access</span> on a locked section.
              After admin approval, open the section and watch any recording inside it.
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`flex items-center gap-3 rounded-2xl border p-4 ${
            message.type === 'success'
              ? 'border-green-500/30 bg-green-500/10 text-green-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      {!selectedSection ? (
        sections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
            <Video className="mx-auto h-12 w-12 text-gray-600" />
            <h3 className="mt-4 text-lg font-semibold text-white">No sections yet</h3>
            <p className="mt-2 text-sm text-gray-500">New training sections will appear here when published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => {
              const sectionRecordings = recordings.filter((r) => r.section === section);
              const sectionStatus = getSectionStatus(section);
              const access = hasSectionAccess(section);
              const avgProgress =
                sectionRecordings.length > 0
                  ? Math.round(
                      sectionRecordings.reduce(
                        (sum, rec) => sum + getRecordingProgress(rec.id),
                        0,
                      ) / sectionRecordings.length,
                    )
                  : 0;

              return (
                <article
                  key={section}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-carousel2/30 hover:shadow-lg hover:shadow-carousel2/5"
                >
                  <div
                    className={`relative bg-gradient-to-br from-carousel2/20 via-carousel1/10 to-transparent p-6 ${
                      access ? 'cursor-pointer' : ''
                    }`}
                    onClick={access ? () => setSelectedSection(section) : undefined}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-carousel3">
                        <FolderOpen className="h-7 w-7" />
                      </div>
                      {renderStatusBadge(section)}
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">{section}</h3>
                    <p className="mt-2 text-sm text-gray-400">
                      {sectionRecordings.length}{' '}
                      {sectionRecordings.length === 1 ? 'recording' : 'recordings'}
                    </p>
                    {access && avgProgress > 0 && (
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs text-gray-500">
                          <span>Section progress</span>
                          <span>{avgProgress}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-carousel2 to-carousel3 transition-all"
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 p-4">
                    {access ? (
                      <button
                        type="button"
                        onClick={() => setSelectedSection(section)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-carousel2 to-carousel1 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-carousel2/20"
                      >
                        <Play className="h-4 w-4" />
                        Open Section
                      </button>
                    ) : sectionStatus === 'pending' ? (
                      <div className="flex items-center justify-center gap-2 py-2.5 text-sm text-yellow-300">
                        <Clock className="h-4 w-4" />
                        Waiting for admin approval
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={requestingSection === section}
                        onClick={() => void handleRequestSectionAccess(section)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-carousel2/30 bg-carousel2/10 py-2.5 text-sm font-semibold text-carousel3 transition-colors hover:bg-carousel2/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {requestingSection === section ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                        {sectionStatus === 'denied' ? 'Request Again' : 'Request Access'}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )
      ) : (
        <div className="space-y-5">
          <button
            type="button"
            onClick={() => setSelectedSection(null)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Sections
          </button>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-carousel3/80">Section</p>
            <h3 className="mt-1 text-2xl font-bold text-white">{selectedSection}</h3>
          </div>

          {recordings.filter((r) => r.section === selectedSection).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center">
              <Video className="mx-auto h-10 w-10 text-gray-600" />
              <p className="mt-3 text-sm text-gray-500">No recordings in this section yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {recordings
                .filter((r) => r.section === selectedSection)
                .map((recording) => {
                  const progress = getRecordingProgress(recording.id);
                  const thumbnail = getRecordingThumbnail(recording);
                  const sectionStatus = getSectionStatus(selectedSection);
                  const canPlay = hasSectionAccess(selectedSection);

                  return (
                    <article
                      key={recording.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:border-carousel2/25"
                    >
                      <div className="relative aspect-video bg-black/40">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={recording.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Video className="h-14 w-14 text-gray-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {canPlay && (
                          <button
                            type="button"
                            onClick={() => void handlePlayRecording(recording)}
                            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100"
                          >
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-carousel2 text-white shadow-xl shadow-carousel2/30">
                              <Play className="h-6 w-6 fill-current" />
                            </span>
                          </button>
                        )}
                        {progress > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <div
                              className="h-full bg-carousel3"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-white line-clamp-2">
                          {recording.title}
                        </h4>
                        {recording.description && (
                          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                            {recording.description}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            {recording.duration && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {recording.duration}
                              </span>
                            )}
                            {progress > 0 && <span>{Math.round(progress)}% watched</span>}
                          </div>
                          {canPlay ? (
                            <button
                              type="button"
                              onClick={() => void handlePlayRecording(recording)}
                              className="inline-flex items-center gap-2 rounded-lg bg-carousel2/20 px-3 py-2 text-sm font-medium text-carousel3 transition-colors hover:bg-carousel2/30"
                            >
                              <Play className="h-4 w-4" />
                              {progress > 0 ? 'Continue' : 'Watch'}
                            </button>
                          ) : (
                            <span className="text-xs text-gray-500">
                              {sectionStatus === 'pending' ? 'Access pending' : 'Locked'}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {selectedRecording && (
        <VideoPlayer
          key={selectedRecording.id}
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
