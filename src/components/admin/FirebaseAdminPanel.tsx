import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Mail, 
  Calendar, 
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Key
} from 'lucide-react';
import { firebaseAdminService, FirebaseUser, UserStats } from '../../services/firebaseAdminService';
import RecordingAccessTab from './RecordingAccessTab';

const FirebaseAdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'recordings'>('users');
  const [users, setUsers] = useState<FirebaseUser[]>([]);
  const [stats, setStats] = useState<UserStats>({ total: 0, pending: 0, approved: 0, denied: 0, newThisWeek: 0, newThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FirebaseUser | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [statusFilter, searchTerm]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await firebaseAdminService.getAllUsers(statusFilter, searchTerm);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await firebaseAdminService.getUserStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateUserStatus = async (userId: string, status: 'approved' | 'denied') => {
    try {
      const success = await firebaseAdminService.updateUserStatus(userId, status);
      if (success) {
        await fetchUsers();
        await fetchStats();
        showNotification(`User ${status} successfully!`, 'success');
      } else {
        showNotification(`Failed to ${status.toLowerCase()} user`, 'error');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      showNotification(`Error updating user status`, 'error');
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      const success = await firebaseAdminService.sendPasswordReset(email);
      if (success) {
        showNotification(`Password reset email sent to ${email}`, 'success');
      } else {
        showNotification(`Failed to send password reset email`, 'error');
      }
    } catch (error) {
      console.error('Error sending password reset:', error);
      showNotification(`Error sending password reset email`, 'error');
    }
  };

  const deleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    if (!confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      return;
    }
    
    try {
      const success = await firebaseAdminService.deleteUser(userId);
      if (success) {
        await fetchUsers();
        await fetchStats();
        showNotification(`User ${user.name} deleted successfully`, 'success');
      } else {
        showNotification(`Failed to delete user`, 'error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification(`Error deleting user`, 'error');
    }
  };

  const bulkUpdateStatus = async (status: 'approved' | 'denied') => {
    if (selectedUsers.length === 0) return;
    
    try {
      const success = await firebaseAdminService.bulkUpdateUserStatus(selectedUsers, status);
      if (success) {
        await fetchUsers();
        await fetchStats();
        setSelectedUsers([]);
        showNotification(`${selectedUsers.length} users ${status} successfully!`, 'success');
      } else {
        showNotification(`Failed to bulk update users`, 'error');
      }
    } catch (error) {
      console.error('Error bulk updating users:', error);
      showNotification(`Error bulk updating users`, 'error');
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Status', 'Login Method', 'Created At', 'Approved At', 'Last Login'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.status,
        user.loginMethod,
        new Date(user.createdAt).toLocaleDateString(),
        user.approvedAt ? new Date(user.approvedAt).toLocaleDateString() : '',
        user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `techgiant-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Remove the old stats calculation since we now fetch it from the service

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'denied': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600/20 text-green-400 border-green-500/30';
      case 'denied': return 'bg-red-600/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black">

      <div className="relative">
        {/* Header */}
        <div className="bg-black border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-gray to-brand-light rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Admin Portal</h1>
                  <p className="text-sm text-white">Management Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => activeTab === 'users' ? fetchUsers() : null}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-900 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('recordings')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'recordings'
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Recording Access
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'users' && (
          <>
        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Total Users</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-400">Pending</p>
                  <p className="text-3xl font-bold text-white">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-400">Approved</p>
                  <p className="text-3xl font-bold text-white">{stats.approved}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-400">Denied</p>
                  <p className="text-3xl font-bold text-white">{stats.denied}</p>
                </div>
                <UserX className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => bulkUpdateStatus('approved')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Approve Selected ({selectedUsers.length})
                    </button>
                    <button
                      onClick={() => bulkUpdateStatus('denied')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Deny Selected ({selectedUsers.length})
                    </button>
                  </div>
                )}

                {/* Export */}
                <button
                  onClick={exportUsers}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(filteredUsers.map(u => u.id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          className="rounded border-gray-700"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Login Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-800 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, user.id]);
                              } else {
                                setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                              }
                            }}
                            className="rounded border-gray-700"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {user.profilePicture ? (
                                <img className="h-10 w-10 rounded-full object-cover" src={user.profilePicture} alt={user.name} />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-primary-gray flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-white">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                            {getStatusIcon(user.status)}
                            <span>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {user.loginMethod.charAt(0).toUpperCase() + user.loginMethod.slice(1)}
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {user.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateUserStatus(user.id, 'approved')}
                                  className="text-green-400 hover:text-green-300 transition-colors duration-200"
                                  title="Approve User"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => updateUserStatus(user.id, 'denied')}
                                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                  title="Deny User"
                                >
                                  <UserX className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserModal(true);
                              }}
                              className="text-white hover:text-gray-300 transition-colors duration-200"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => sendPasswordReset(user.email)}
                              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                              title="Send Password Reset"
                            >
                              <Key className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-white" />
              <h3 className="mt-2 text-sm font-medium text-white">No users found</h3>
              <p className="mt-1 text-sm text-white">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No users have registered yet.'
                }
              </p>
            </div>
          )}
        </div>
        </>
        )}

        {activeTab === 'recordings' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <RecordingAccessTab />
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-white hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {selectedUser.profilePicture ? (
                  <img className="h-16 w-16 rounded-full object-cover" src={selectedUser.profilePicture} alt={selectedUser.name} />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary-gray flex items-center justify-center">
                    <span className="text-xl font-medium text-white">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-medium text-white">{selectedUser.name}</h4>
                  <p className="text-white">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white">Status</p>
                  <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedUser.status)}`}>
                    {getStatusIcon(selectedUser.status)}
                    <span>{selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}</span>
                  </span>
                </div>
                <div>
                  <p className="text-white">Login Method</p>
                  <p className="text-white">{selectedUser.loginMethod.charAt(0).toUpperCase() + selectedUser.loginMethod.slice(1)}</p>
                </div>
                <div>
                  <p className="text-white">Created</p>
                  <p className="text-white">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white">Last Login</p>
                  <p className="text-white">{selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'Never'}</p>
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                {selectedUser.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateUserStatus(selectedUser.id, 'approved');
                        setShowUserModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        updateUserStatus(selectedUser.id, 'denied');
                        setShowUserModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Deny
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    sendPasswordReset(selectedUser.email);
                    setShowUserModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white notification-slide-in ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseAdminPanel;