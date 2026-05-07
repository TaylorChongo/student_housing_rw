import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { ArrowLeft, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      window.location.href = '/listings'; 
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center px-6 py-12">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-600 mb-8 transition font-black text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h2 className="text-4xl font-black text-slate-950 italic">Welcome Back</h2>
          <p className="mt-2 text-gray-500 font-medium">Log in to find your perfect student home.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100">
          {error && <div className="bg-red-50 text-red-600 p-4 mb-6 rounded-2xl text-xs font-bold border border-red-100">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="input-field pl-12" 
                  placeholder="name@university.edu" 
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="input-field pl-12" 
                  placeholder="••••••••" 
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-5 text-lg">Sign In</button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-gray-400">
            Don't have an account? <Link to="/register" className="text-emerald-600 font-black hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
