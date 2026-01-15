import React, { useState } from 'react';
import { useAuth } from '../../contexts/FirebaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Video, MessageCircle, LogOut, Mail, Phone, Calendar, Clock } from 'lucide-react';
import RecordingsTab from '../recordings/RecordingsTab';

const UserDashboard: React.FC = () => {
  const { appUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  if (!appUser) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'User Details', icon: User },
    { id: 'recordings', label: 'Recordings', icon: Video },
    { id: 'sessions', label: 'Recorded Sessions', icon: Video },
    { id: 'contact', label: 'Contact Us', icon: MessageCircle }
  ];

  const mockSessions = [
    {
      id: '1',
      title: 'VAPT Training Session 1',
      date: '2024-01-15',
      duration: '2h 30m',
      status: 'completed',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: '2',
      title: 'Web Development Basics',
      date: '2024-01-10',
      duration: '1h 45m',
      status: 'completed',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: '3',
      title: 'Digital Marketing Strategy',
      date: '2024-01-05',
      duration: '3h 15m',
      status: 'completed',
      thumbnail: 'https://via.placeholder.com/300x200'
    }
  ];

  return (
    <div className="min-h-screen bg-black">

      <div className="relative">
        {/* Header */}
        <div className="bg-black border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-gray to-brand-light rounded-full flex items-center justify-center">
                  {appUser.profilePicture ? (
                    <img src={appUser.profilePicture} alt={appUser.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Welcome, {appUser.name}</h1>
                  <p className="text-sm text-white">Dashboard</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-300 ${
                          activeTab === tab.id
                            ? 'bg-gray-700 text-white'
                            : 'text-white hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">User Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                          <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-carousel2" />
                            <span className="text-white">{appUser.name}</span>
                          </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                          <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-carousel2" />
                            <span className="text-white">{appUser.email}</span>
                          </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                          <label className="block text-sm font-medium text-white mb-2">Login Method</label>
                          <div className="flex items-center space-x-3">
                            <Settings className="w-5 h-5 text-carousel2" />
                            <span className="text-white capitalize">{appUser.loginMethod}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                          <label className="block text-sm font-medium text-white mb-2">Account Status</label>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              appUser.status === 'approved' ? 'bg-green-500' : 
                              appUser.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-white capitalize">{appUser.status}</span>
                          </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                          <label className="block text-sm font-medium text-white mb-2">Member Since</label>
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-carousel2" />
                            <span className="text-white">{appUser.createdAt ? (appUser.createdAt.toDate ? appUser.createdAt.toDate().toLocaleDateString() : new Date(appUser.createdAt).toLocaleDateString()) : 'N/A'}</span>
                          </div>
                        </div>

                        {appUser.approvedAt && (
                          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                            <label className="block text-sm font-medium text-white mb-2">Approved On</label>
                            <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-carousel2" />
                              <span className="text-white">{appUser.approvedAt.toDate ? appUser.approvedAt.toDate().toLocaleDateString() : new Date(appUser.approvedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'recordings' && (
                  <RecordingsTab />
                )}

                {activeTab === 'sessions' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Recorded Sessions</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockSessions.map((session) => (
                        <div key={session.id} className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700 hover:border-carousel2/50 transition-colors duration-300">
                          <div className="aspect-video bg-gray-800 relative">
                            <img 
                              src={session.thumbnail} 
                              alt={session.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                              <button className="bg-carousel2 hover:bg-carousel1 text-white rounded-full p-3 transition-colors duration-300">
                                <Video className="w-6 h-6" />
                              </button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-white mb-2">{session.title}</h3>
                            <div className="flex items-center justify-between text-sm text-white">
                              <span>{session.date}</span>
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                          <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Phone className="w-5 h-5 text-carousel2" />
                              <div>
                                <p className="text-white text-sm">Support Phone</p>
                                <a href="tel:+918008771893" className="text-white hover:text-carousel2 transition-colors duration-300">
                                  +91 8008771893
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Mail className="w-5 h-5 text-carousel2" />
                              <div>
                                <p className="text-white text-sm">Support Email</p>
                <a href="mailto:asadmulla241097@gmail.com" className="text-white hover:text-carousel2 transition-colors duration-300">
                  asadmulla241097@gmail.com
                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <form className="bg-gray-900 rounded-lg p-6 space-y-4 border border-gray-700">
                          <h3 className="text-lg font-semibold text-white mb-4">Send Message</h3>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">Subject</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-carousel2 focus:border-transparent"
                              placeholder="Enter subject"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white mb-2">Message</label>
                            <textarea
                              rows={4}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-carousel2 focus:border-transparent"
                              placeholder="Enter your message"
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-carousel2 to-carousel1 hover:from-carousel1 hover:to-carousel2 text-white py-2 px-4 rounded-lg transition-all duration-300"
                          >
                            Send Message
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
