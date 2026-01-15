import React from 'react';
import { useAuth } from '../../contexts/FirebaseAuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { currentUser, appUser, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-dark via-primary-accent to-brand-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-light">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !appUser || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check admin access
  if (adminOnly) {
    // Admin emails - add more admin emails here if needed
    const adminEmails = [
      'asadmulla241097@gmail.com',
      'asadmulla2407@gmail.com' // Added your current email
    ];
    const isAdmin = adminEmails.includes(appUser.email);
    if (!isAdmin) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-brand-dark via-primary-accent to-brand-dark flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-400 mb-2">Access Denied</h2>
              <p className="text-primary-gray mb-4">
                You don't have permission to access this admin area.
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-primary-accent to-primary-gray text-brand-light px-6 py-2 rounded-lg transition-all duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    }
  }

  // Check user status for regular routes
  if (!adminOnly && appUser.status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-dark via-primary-accent to-brand-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-6">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">Account Pending Approval</h2>
            <p className="text-primary-gray mb-4">
              Your account is currently under review. You'll receive an email notification once it's approved.
            </p>
            <p className="text-sm text-primary-gray">
              Need help? Contact support at{' '}
              <a href="tel:+918008771893" className="text-brand-light hover:text-primary-gray">
                +91 8008771893
              </a>
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-primary-accent to-primary-gray text-brand-light px-6 py-2 rounded-lg transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!adminOnly && appUser.status === 'denied') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-dark via-primary-accent to-brand-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-400 mb-2">Account Access Denied</h2>
            <p className="text-primary-gray mb-4">
              Your account request has been denied. Please contact our support team for assistance.
            </p>
            <p className="text-sm text-primary-gray mb-4">
              Contact support at{' '}
              <a href="tel:+918008771893" className="text-brand-light hover:text-primary-gray">
                +91 8008771893
              </a>
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-primary-accent to-primary-gray text-brand-light px-6 py-2 rounded-lg transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
