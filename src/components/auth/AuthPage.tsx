import React, { useState, useEffect } from 'react';
import { useAuth, SignupData } from '../../contexts/FirebaseAuthContext';
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../icons/techgiant';
import { buildFullName } from '../../utils/userDisplay';
import LoginScrambleIntro from './LoginScrambleIntro';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState({ type: '', text: '' });

  const { login, signup, socialLogin, resetPassword, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setMessage({ type: 'error', text: 'Enter your email above, then click Forgot password.' });
      return;
    }

    const result = await resetPassword(formData.email);
    setMessage({ type: result.success ? 'success' : 'error', text: result.message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        const signupPayload: SignupData = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          name: buildFullName(formData.firstName, formData.lastName),
          email: formData.email.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };
        result = await signup(signupPayload);
      }

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        if (isLogin) {
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          setTimeout(() => {
            setIsLogin(true);
            setFormData({
              firstName: '',
              lastName: '',
              email: formData.email,
              password: '',
              confirmPassword: '',
            });
            setMessage({ type: '', text: '' });
          }, 2000);
        }
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      const result = await socialLogin(provider);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch {
      setMessage({ type: 'error', text: 'Social login failed' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-carousel2/60 focus:outline-none focus:ring-2 focus:ring-carousel2/30';

  return (
    <div className="relative min-h-screen overflow-hidden bg-bgColor">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 10% 0%, rgba(126,34,206,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 90% 70% at 90% 100%, rgba(80,0,115,0.25) 0%, transparent 50%),
            #0A0A0A
          `,
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-white/10">
          <LoginScrambleIntro />

          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-black/20 via-transparent to-black/30" />

          <div className="relative z-10 flex flex-col justify-between p-12 text-white pointer-events-none">
            <div>
              <Icon height={48} width={96} />
            </div>

            <div className="text-sm text-gray-300/90 max-w-xs">
              Trusted technology partner for development, security, and growth.
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-4 flex items-center space-x-2 text-gray-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to website</span>
            </button>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="mb-8 text-left">
                <h2 className="mb-2 text-3xl font-bold text-white">
                  {isLogin ? 'Log in' : 'Create an account'}
                </h2>
                <p className="text-gray-400">
                  {isLogin ? (
                    <>
                      Don&apos;t have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-carousel3 hover:text-carousel4"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className="text-carousel3 hover:text-carousel4"
                      >
                        Log in
                      </button>
                    </>
                  )}
                </p>
              </div>

              {message.text && (
                <div
                  className={`mb-6 flex items-center space-x-2 rounded-lg p-4 ${
                    message.type === 'success'
                      ? 'border border-green-500/20 bg-green-500/10 text-green-400'
                      : 'border border-red-500/20 bg-red-500/10 text-red-400'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="First name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={inputClass}
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                    placeholder="Email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${inputClass} pr-12`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                  )}
                  {isLogin && (
                    <div className="mt-2 text-right">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={isLoading}
                        className="text-sm text-carousel3 transition-colors hover:text-carousel4"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>

                {!isLogin && (
                  <>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`${inputClass} pr-12`}
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-carousel2 focus:ring-carousel2"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                        I agree to the{' '}
                        <span className="text-carousel3">Terms &amp; Conditions</span>
                      </label>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-gradient-to-r from-carousel2 to-carousel1 px-4 py-3 font-semibold text-white shadow-lg shadow-carousel2/20 transition-all duration-300 hover:shadow-carousel2/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : isLogin ? (
                    'Log in'
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white transition-colors hover:border-carousel2/40 hover:bg-white/[0.06] disabled:opacity-50"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                  className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white transition-colors hover:border-carousel2/40 hover:bg-white/[0.06] disabled:opacity-50"
                >
                  <svg className="mr-2 h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                Need help? Contact support at{' '}
                <a href="tel:+918008771893" className="text-carousel3 hover:text-carousel4">
                  +91 8008771893
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
