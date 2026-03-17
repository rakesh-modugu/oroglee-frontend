import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === 'admin123') {
      showToast('Login Successful! 🎉', 'success');
      setTimeout(() => navigate('/admin'), 2000);
    } else {
      showToast('Invalid credentials! ❌', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      {/* Custom Toast */}
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl transition-all duration-500 z-50 flex items-center gap-3 backdrop-blur-md text-white ${
          toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        } ${toast.type === 'error' ? 'bg-red-500/90' : 'bg-emerald-500/90'}`}
      >
        <p className="font-medium text-sm">{toast.message}</p>
      </div>

      {/* Glassmorphism Card */}
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo placeholder */}
          <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
            <span className="text-2xl">🦷</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1.5 text-center">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email Field */}
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Email Address
            </label>
            <div className="relative">
              {/* Mail Icon */}
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@oroglee.com"
                required
                className="bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 pl-10 w-full outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Password
            </label>
            <div className="relative">
              {/* Lock Icon */}
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 pl-10 w-full outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 text-sm"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 mt-2 rounded-xl transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]"
          >
            Sign In
          </button>

        </form>

        {/* Footer hint */}
        <p className="text-center text-slate-600 text-xs mt-8">
          OroGlee Admin Portal · Protected Access
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;
