import React, { useState } from 'react';
import { useAuth } from '../../contexts/FirebaseAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Video,
  MessageCircle,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  Home,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import RecordingsTab from '../recordings/RecordingsTab';
import { getAdminNotificationEmail, isAdmin } from '../../utils/adminUtils';
import { openEmailCompose } from '../../utils/emailUtils';
import Icon from '../../icons/techgiant';

type DashboardTab = 'profile' | 'recordings' | 'contact';

const formatDate = (value: unknown): string => {
  if (!value) return 'N/A';
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    return (value as { toDate: () => Date }).toDate().toLocaleDateString();
  }
  return new Date(value as string).toLocaleDateString();
};

const UserDashboard: React.FC = () => {
  const { appUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  if (!appUser) return null;

  const userIsAdmin = isAdmin(appUser.email);
  const supportEmail = getAdminNotificationEmail() || 'Info@tech-giant.in';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleContactSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = contactSubject.trim() || 'Dashboard Support Request';
    const body = `Hi Tech Giant Team,

${contactMessage.trim() || 'I need assistance with my account or recordings.'}

---
From: ${appUser.name}
Email: ${appUser.email}
Sent from User Dashboard`;
    openEmailCompose(subject, body, supportEmail);
  };

  const tabs: { id: DashboardTab; label: string; icon: typeof User }[] = [
    { id: 'profile', label: 'Overview', icon: User },
    { id: 'recordings', label: 'Recordings', icon: Video },
    { id: 'contact', label: 'Support', icon: MessageCircle },
  ];

  const displayName =
    appUser.name?.trim() ||
    [appUser.firstName, appUser.lastName].filter(Boolean).join(' ') ||
    appUser.email.split('@')[0];

  const tabButtonClass = (tabId: DashboardTab) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
      activeTab === tabId
        ? 'bg-gradient-to-r from-carousel2/25 to-carousel1/20 text-white shadow-lg shadow-carousel2/10 border border-carousel2/30'
        : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
    }`;

  return (
    <div className="relative min-h-screen bg-bgColor">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 110% 70% at 0% 0%, rgba(126,34,206,0.28) 0%, transparent 55%),
            radial-gradient(ellipse 90% 60% at 100% 100%, rgba(80,0,115,0.22) 0%, transparent 50%),
            #0A0A0A
          `,
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-white/10 bg-navBg/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="hidden sm:block opacity-90 transition-opacity hover:opacity-100">
                <Icon height={32} width={64} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-carousel2/30 bg-gradient-to-br from-carousel2/30 to-carousel1/20">
                  {appUser.profilePicture ? (
                    <img
                      src={appUser.profilePicture}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-carousel3">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base font-semibold text-white sm:text-lg">{displayName}</h1>
                    {userIsAdmin && (
                      <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-yellow-300">
                        <Shield className="mr-1 h-3 w-3" />
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">Learning Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className="hidden rounded-lg border border-white/10 p-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-white sm:inline-flex"
                aria-label="Home"
              >
                <Home className="h-4 w-4" />
              </Link>
              {userIsAdmin && (
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="hidden items-center gap-2 rounded-lg border border-carousel2/30 bg-carousel2/10 px-3 py-2 text-sm text-carousel3 transition-colors hover:bg-carousel2/20 sm:flex"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Portal</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 transition-colors hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="border-b border-white/10 bg-navBg/40 lg:hidden">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-carousel2/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-carousel3/80">
                    Navigation
                  </p>
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const TabIcon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full ${tabButtonClass(tab.id)}`}
                        >
                          <TabIcon className="h-5 w-5 shrink-0" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                    {userIsAdmin && (
                      <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="mt-2 flex w-full items-center gap-3 rounded-xl border border-carousel2/30 bg-carousel2/10 px-4 py-3 text-left text-sm font-medium text-carousel3 transition-colors hover:bg-carousel2/20"
                      >
                        <Shield className="h-5 w-5" />
                        Admin Portal
                      </button>
                    )}
                  </nav>
                </div>

                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-carousel2/10 to-transparent p-5">
                  <div className="mb-2 flex items-center gap-2 text-carousel3">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-semibold">Quick tip</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400">
                    Request access to a recording section, then watch all videos in that section once approved.
                  </p>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-9">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-carousel3/80">
                      Welcome back
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                      Hello, {displayName.split(' ')[0]}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-gray-400">
                      Manage your profile, request recording access, and continue your learning from one place.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('recordings')}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-carousel2 to-carousel1 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-carousel2/20 transition-all hover:shadow-carousel2/40"
                    >
                      <Video className="h-4 w-4" />
                      Browse Recordings
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { label: 'Full Name', value: displayName, icon: User },
                      { label: 'Email Address', value: appUser.email, icon: Mail },
                      {
                        label: 'Account Status',
                        value: appUser.status,
                        icon: CheckCircle2,
                        accent:
                          appUser.status === 'approved'
                            ? 'text-green-400'
                            : appUser.status === 'pending'
                              ? 'text-yellow-400'
                              : 'text-red-400',
                      },
                      {
                        label: 'Login Method',
                        value: appUser.loginMethod,
                        icon: Shield,
                      },
                      {
                        label: 'Member Since',
                        value: formatDate(appUser.createdAt),
                        icon: Calendar,
                      },
                      ...(appUser.approvedAt
                        ? [
                            {
                              label: 'Approved On',
                              value: formatDate(appUser.approvedAt),
                              icon: Clock,
                            },
                          ]
                        : []),
                    ].map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
                        >
                          <div className="mb-3 flex items-center gap-2 text-carousel3">
                            <ItemIcon className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                              {item.label}
                            </span>
                          </div>
                          <p className={`text-base font-medium capitalize text-white ${'accent' in item ? item.accent : ''}`}>
                            {item.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'recordings' && <RecordingsTab />}

              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
                    <h2 className="text-2xl font-bold text-white">Support</h2>
                    <p className="mt-2 text-sm text-gray-400">
                      Need help with recordings, access, or your account? Reach our team directly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h3 className="text-lg font-semibold text-white">Contact Details</h3>
                        <div className="mt-5 space-y-5">
                          <a
                            href="tel:+918008771893"
                            className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-carousel2/30"
                          >
                            <div className="rounded-lg bg-carousel2/15 p-2 text-carousel3">
                              <Phone className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium text-white">+91 8008771893</p>
                            </div>
                          </a>
                          <a
                            href={`mailto:${supportEmail}`}
                            className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-carousel2/30"
                          >
                            <div className="rounded-lg bg-carousel2/15 p-2 text-carousel3">
                              <Mail className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium text-white">{supportEmail}</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <form
                      onSubmit={handleContactSubmit}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                      <h3 className="text-lg font-semibold text-white">Send a Message</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Opens your email app with a pre-filled support message.
                      </p>
                      <div className="mt-5 space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-300">Subject</label>
                          <input
                            type="text"
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-gray-500 focus:border-carousel2/50 focus:outline-none focus:ring-2 focus:ring-carousel2/20"
                            placeholder="Recording access / account help"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-300">Message</label>
                          <textarea
                            rows={5}
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-gray-500 focus:border-carousel2/50 focus:outline-none focus:ring-2 focus:ring-carousel2/20"
                            placeholder="Tell us how we can help..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-lg bg-gradient-to-r from-carousel2 to-carousel1 py-3 text-sm font-semibold text-white shadow-lg shadow-carousel2/20 transition-all hover:shadow-carousel2/40"
                        >
                          Send via Email
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
