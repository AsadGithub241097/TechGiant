import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Video, 
  User as UserIcon, 
  Mail, 
  Calendar,
  Plus,
  Loader2,
  AlertCircle,
  Play,
  Eye,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react';
import { 
  recordingsService, 
  Recording, 
  RecordingAccess,
  SectionAccess,
  Section
} from '../../services/recordingsService';
import { firebaseAdminService } from '../../services/firebaseAdminService';

const RecordingAccessTab: React.FC = () => {
  const [activeView, setActiveView] = useState<'requests' | 'recordings' | 'add' | 'sections'>('requests');
  const [sectionAccessRequests, setSectionAccessRequests] = useState<(SectionAccess & { userName?: string; userEmail?: string })[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Add recording form
  const [newRecording, setNewRecording] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    duration: '',
    category: '',
    section: ''
  });

  // Section management
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sectionEditName, setSectionEditName] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load section access requests
      const requests = await recordingsService.getAllSectionAccessRequests();
      
      // Enrich requests with user info
      const enrichedRequests = await Promise.all(
        requests.map(async (request) => {
          const user = await firebaseAdminService.getUserById(request.userId);
          return {
            ...request,
            userName: user?.name || 'Unknown',
            userEmail: user?.email || 'Unknown'
          };
        })
      );
      
      setSectionAccessRequests(enrichedRequests);

      // Load all recordings
      const allRecordings = await recordingsService.getAllRecordings();
      setRecordings(allRecordings);

      // Load all sections
      const allSections = await recordingsService.getAllSectionsWithMetadata();
      setSections(allSections);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSectionRequest = async (userId: string, section: string) => {
    try {
      const adminEmail = 'asadmulla241097@gmail.com'; // Get from context in production
      const success = await recordingsService.updateSectionAccessRequest(
        userId,
        section,
        'approved',
        adminEmail
      );
      
      if (success) {
        setMessage({ type: 'success', text: `Section access for "${section}" approved successfully!` });
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to approve access' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error approving access' });
    }
  };

  const handleDenySectionRequest = async (userId: string, section: string) => {
    try {
      const adminEmail = 'asadmulla241097@gmail.com';
      const success = await recordingsService.updateSectionAccessRequest(
        userId,
        section,
        'denied',
        adminEmail
      );
      
      if (success) {
        setMessage({ type: 'success', text: 'Access denied' });
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to deny access' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error denying access' });
    }
  };

  const handleAddRecording = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRecording.title || !newRecording.youtubeUrl || !newRecording.section) {
      setMessage({ type: 'error', text: 'Title, YouTube URL, and Section are required' });
      return;
    }

    try {
      const adminEmail = 'asadmulla241097@gmail.com';
      
      // Check if section exists, if not create it
      const sectionExists = sections.some(s => s.name === newRecording.section.trim());
      if (!sectionExists && newRecording.section.trim()) {
        // Create new section
        const maxOrder = sections.length > 0 ? Math.max(...sections.map(s => s.order)) : 0;
        const sectionId = await recordingsService.createSection({
          name: newRecording.section.trim(),
          description: '',
          order: maxOrder + 1,
          createdBy: adminEmail,
          isActive: true
        });
        
        if (!sectionId) {
          setMessage({ type: 'error', text: 'Failed to create section' });
          return;
        }
        
        // Reload sections to include the new one
        await loadData();
      }

      const recordingId = await recordingsService.createRecording({
        title: newRecording.title,
        description: newRecording.description,
        youtubeUrl: newRecording.youtubeUrl,
        duration: newRecording.duration,
        category: newRecording.category,
        section: newRecording.section.trim(),
        createdBy: adminEmail,
        isActive: true
      });

      if (recordingId) {
        setMessage({ type: 'success', text: 'Recording added successfully!' });
        setNewRecording({ title: '', description: '', youtubeUrl: '', duration: '', category: '', section: '' });
        setActiveView('recordings');
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to add recording' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding recording' });
    }
  };

  const handleQuickAddRecording = async () => {
    try {
      const adminEmail = 'asadmulla241097@gmail.com';
      const recordingId = await recordingsService.createRecording({
        title: 'Software Architecture',
        description: 'Testing Fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=l8zTj5wUOu8',
        duration: '',
        category: 'Training',
        section: sections.length > 0 ? sections[0].name : 'Section 1', // Use first section if available
        createdBy: adminEmail,
        isActive: true
      });

      if (recordingId) {
        setMessage({ type: 'success', text: 'Recording "Software Architecture" added successfully!' });
        setActiveView('recordings');
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to add recording' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error adding recording' });
    }
  };

  const handleDeleteRecording = async (recordingId: string, recordingTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${recordingTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const success = await recordingsService.deleteRecording(recordingId);
      if (success) {
        setMessage({ type: 'success', text: 'Recording deleted successfully!' });
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete recording' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting recording' });
    }
  };

  // Section management handlers
  const handleStartEditSection = (section: Section) => {
    setEditingSection(section.id);
    setSectionEditName(section.name);
  };

  const handleCancelEditSection = () => {
    setEditingSection(null);
    setSectionEditName('');
  };

  const handleSaveSection = async (sectionId: string) => {
    if (!sectionEditName.trim()) {
      setMessage({ type: 'error', text: 'Section name cannot be empty' });
      return;
    }

    try {
      const success = await recordingsService.updateSection(sectionId, { name: sectionEditName.trim() });
      if (success) {
        setMessage({ type: 'success', text: 'Section updated successfully!' });
        setEditingSection(null);
        setSectionEditName('');
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to update section' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating section' });
    }
  };

  const handleCreateSection = async () => {
    if (!newSectionName.trim()) {
      setMessage({ type: 'error', text: 'Section name cannot be empty' });
      return;
    }

    try {
      const adminEmail = 'asadmulla241097@gmail.com';
      const maxOrder = sections.length > 0 ? Math.max(...sections.map(s => s.order)) : 0;
      const sectionId = await recordingsService.createSection({
        name: newSectionName.trim(),
        description: newSectionDescription.trim(),
        order: maxOrder + 1,
        createdBy: adminEmail,
        isActive: true
      });

      if (sectionId) {
        setMessage({ type: 'success', text: 'Section created successfully!' });
        setNewSectionName('');
        setNewSectionDescription('');
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to create section' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error creating section' });
    }
  };

  const handleDeleteSection = async (sectionId: string, sectionName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${sectionName}"? This will not delete recordings, but the section will be hidden.`)) {
      return;
    }

    try {
      const success = await recordingsService.deleteSection(sectionId);
      if (success) {
        setMessage({ type: 'success', text: 'Section deleted successfully!' });
        await loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete section' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting section' });
    }
  };

  const pendingRequests = sectionAccessRequests.filter(req => req.status === 'pending');
  const approvedRequests = sectionAccessRequests.filter(req => req.status === 'approved');
  const deniedRequests = sectionAccessRequests.filter(req => req.status === 'denied');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recording Access Management</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('requests')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'requests'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            Access Requests
          </button>
          <button
            onClick={() => setActiveView('recordings')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'recordings'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            All Recordings
          </button>
          <button
            onClick={() => setActiveView('add')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              activeView === 'add'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Recording</span>
          </button>
          <button
            onClick={() => setActiveView('sections')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              activeView === 'sections'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Manage Sections</span>
          </button>
          <button
            onClick={handleQuickAddRecording}
            className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
            title="Quick Add: Software Architecture - Testing Fundamentals"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Add</span>
          </button>
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

      {/* Access Requests View */}
      {activeView === 'requests' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-300 font-medium mb-1">Manage Access Requests</p>
              <p className="text-xs text-blue-400">
                Users request access to recordings from their dashboard. Review pending requests below and click 
                <span className="font-semibold"> "Approve"</span> or <span className="font-semibold">"Deny"</span> to grant or reject access.
              </p>
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>Pending Requests ({pendingRequests.length})</span>
            </h3>
            
            {pendingRequests.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div
                    key={`${request.userId}_${request.section}`}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <UserIcon className="w-5 h-5 text-white" />
                          <div>
                            <p className="text-white font-medium">{request.userName}</p>
                            <p className="text-gray-400 text-sm">{request.userEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-3">
                          <Video className="w-5 h-5 text-white" />
                          <div>
                            <p className="text-white font-semibold">{request.section}</p>
                            <p className="text-gray-400 text-xs">
                              Requested: {request.requestedAt 
                                ? (request.requestedAt.toDate 
                                  ? request.requestedAt.toDate().toLocaleDateString()
                                  : new Date(request.requestedAt).toLocaleDateString())
                                : 'N/A'}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              {recordings.filter(r => r.section === request.section).length} recordings in this section
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleApproveSectionRequest(request.userId, request.section)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleDenySectionRequest(request.userId, request.section)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Deny</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Approved Requests */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Approved ({approvedRequests.length})</span>
            </h3>
            
            {approvedRequests.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No approved requests</p>
            ) : (
              <div className="space-y-2">
                {approvedRequests.map((request) => (
                  <div
                    key={`${request.userId}_${request.section}`}
                    className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <UserIcon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">{request.userName}</span>
                      <span className="text-gray-400 text-sm">-</span>
                      <span className="text-white text-sm font-semibold">{request.section}</span>
                    </div>
                    <span className="text-green-400 text-xs">Approved</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Denied Requests */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span>Denied ({deniedRequests.length})</span>
            </h3>
            
            {deniedRequests.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No denied requests</p>
            ) : (
              <div className="space-y-2">
                {deniedRequests.map((request) => (
                  <div
                    key={`${request.userId}_${request.section}`}
                    className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <UserIcon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">{request.userName}</span>
                      <span className="text-gray-400 text-sm">-</span>
                      <span className="text-white text-sm font-semibold">{request.section}</span>
                    </div>
                    <span className="text-red-400 text-xs">Denied</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* All Recordings View */}
      {activeView === 'recordings' && (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">All Recordings ({recordings.length})</h3>
          
          {recordings.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No recordings available. Add one to get started!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recordings.map((recording) => (
                <div
                  key={recording.id}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Video className="w-5 h-5 text-white flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{recording.title}</h4>
                        {recording.section && (
                          <p className="text-blue-400 text-xs mt-1">Section: {recording.section}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteRecording(recording.id, recording.title)}
                      className="ml-2 text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                      title="Delete recording"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {recording.description && (
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{recording.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gray-400 text-xs">
                      {recording.duration || 'N/A'}
                    </span>
                    <a
                      href={recording.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Recording View */}
      {activeView === 'add' && (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Recording</h3>
          
          <form onSubmit={handleAddRecording} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newRecording.title}
                onChange={(e) => setNewRecording({ ...newRecording, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Enter recording title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                YouTube URL *
              </label>
              <input
                type="url"
                value={newRecording.youtubeUrl}
                onChange={(e) => setNewRecording({ ...newRecording, youtubeUrl: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                value={newRecording.description}
                onChange={(e) => setNewRecording({ ...newRecording, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Enter recording description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={newRecording.duration}
                  onChange={(e) => setNewRecording({ ...newRecording, duration: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="e.g., 1h 30m"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newRecording.category}
                  onChange={(e) => setNewRecording({ ...newRecording, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="e.g., Training, Tutorial"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Section *
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="sections-list"
                  value={newRecording.section}
                  onChange={(e) => setNewRecording({ ...newRecording, section: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Select existing section or type new section name"
                  required
                />
                <datalist id="sections-list">
                  {sections.map((section) => (
                    <option key={section.id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </datalist>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                Select from dropdown or type a new section name. New sections will be created automatically when you save the recording.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Recording
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewRecording({ title: '', description: '', youtubeUrl: '', duration: '', category: '', section: '' });
                  setActiveView('recordings');
                }}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Manage Sections View */}
      {activeView === 'sections' && (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Manage Sections</h3>
          
          {/* Create New Section */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
            <h4 className="text-md font-medium text-white mb-4">Create New Section</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Section Name *
                </label>
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="e.g., Introduction to Programming"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newSectionDescription}
                  onChange={(e) => setNewSectionDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Brief description of this section"
                />
              </div>
              <button
                onClick={handleCreateSection}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Section
              </button>
            </div>
          </div>

          {/* Existing Sections */}
          <div>
            <h4 className="text-md font-medium text-white mb-4">Existing Sections</h4>
            {sections.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No sections created yet. Create your first section above.</p>
            ) : (
              <div className="space-y-3">
                {sections.map((section) => {
                  const recordingCount = recordings.filter(r => r.section === section.name).length;
                  return (
                    <div
                      key={section.id}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        {editingSection === section.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={sectionEditName}
                              onChange={(e) => setSectionEditName(e.target.value)}
                              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveSection(section.id)}
                              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                              title="Save"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelEditSection}
                              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center space-x-3">
                              <Video className="w-5 h-5 text-white" />
                              <div>
                                <h5 className="text-white font-semibold">{section.name}</h5>
                                {section.description && (
                                  <p className="text-gray-400 text-sm mt-1">{section.description}</p>
                                )}
                                <p className="text-gray-500 text-xs mt-1">
                                  {recordingCount} {recordingCount === 1 ? 'recording' : 'recordings'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {editingSection !== section.id && (
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleStartEditSection(section)}
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            title="Edit Section Name"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section.id, section.name)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            title="Delete Section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingAccessTab;
