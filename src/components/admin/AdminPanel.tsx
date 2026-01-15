import React, { useState, useEffect } from 'react';
import { User } from '../../contexts/AuthContext';
import { approveUser, denyUser } from '../../services/emailService';
import { openEmailClient, getPendingNotifications } from '../../services/workingEmailService';
import { CheckCircle, XCircle, Clock, Mail, User as UserIcon, ExternalLink } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('techgiant_users') || '[]');
    setUsers(storedUsers);
  };

  const handleApprove = async (userId: string) => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      const success = await approveUser(userId);
      if (success) {
        loadUsers(); // Reload users to show updated status
        alert('User approved successfully!');
      } else {
        alert('Failed to approve user');
      }
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Error approving user');
    }
    setLoading(prev => ({ ...prev, [userId]: false }));
  };

  const handleDeny = async (userId: string) => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      const success = await denyUser(userId);
      if (success) {
        loadUsers(); // Reload users to show updated status
        alert('User denied successfully!');
      } else {
        alert('Failed to deny user');
      }
    } catch (error) {
      console.error('Error denying user:', error);
      alert('Error denying user');
    }
    setLoading(prev => ({ ...prev, [userId]: false }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-400/10';
      case 'denied': return 'text-red-400 bg-red-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'denied': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage user registrations and approvals</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <UserIcon className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {users.filter(u => u.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-400">
                  {users.filter(u => u.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Denied</p>
                <p className="text-2xl font-bold text-red-400">
                  {users.filter(u => u.status === 'denied').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">User Registrations</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Login Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                            {user.profilePicture ? (
                              <img src={user.profilePicture} alt={user.name} className="h-10 w-10 rounded-full" />
                            ) : (
                              <span className="text-white font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
                        {user.loginMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="capitalize">{user.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {user.status === 'pending' && (
                        <div className="flex flex-col space-y-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(user.id)}
                              disabled={loading[user.id]}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors duration-300 disabled:opacity-50"
                            >
                              {loading[user.id] ? 'Approving...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleDeny(user.id)}
                              disabled={loading[user.id]}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors duration-300 disabled:opacity-50"
                            >
                              {loading[user.id] ? 'Denying...' : 'Deny'}
                            </button>
                          </div>
                          <button
                            onClick={() => openEmailClient(user)}
                            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs transition-colors duration-300"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Send Email</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {user.status === 'approved' && (
                        <span className="text-green-400 text-xs">Approved</span>
                      )}
                      {user.status === 'denied' && (
                        <span className="text-red-400 text-xs">Denied</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {users.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-300">No users yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Users will appear here when they register.
              </p>
            </div>
          )}
        </div>

        {/* Email Setup Instructions */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Mail className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Email Notifications Setup</h3>
              <p className="text-gray-300 text-sm mb-4">
                To receive real email notifications at asadmulla241097@gmail.com, you need to configure an email service.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-gray-300">
                <p className="font-medium mb-2">Quick Setup Options:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use EmailJS (free tier available) - Configure in src/services/emailService.ts</li>
                  <li>Use Formspree.io (simple form-to-email service)</li>
                  <li>Set up your own backend API with nodemailer</li>
                  <li>Use services like SendGrid, Mailgun, or AWS SES</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
