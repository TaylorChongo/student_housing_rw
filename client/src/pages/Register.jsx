import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { register } from '../services/authService';
import { ArrowLeft, User, Mail, Lock, Briefcase } from 'lucide-react';

const Register = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get('role') || 'student';

  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: initialRole });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const roleParam = new URLSearchParams(location.search).get('role');
    if (roleParam) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      window.location.href = '/listings';
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
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
          <h2 className="text-4xl font-black text-slate-950 italic">Join the Community</h2>
          <p className="mt-2 text-gray-500 font-medium">Simple, fast, and secure student housing.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100">
          {error && <div className="bg-red-50 text-red-600 p-4 mb-6 rounded-2xl text-xs font-bold border border-red-100">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  required 
                  className="input-field pl-12" 
                  placeholder="John Doe"
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required 
                  className="input-field pl-12" 
                  placeholder="name@university.edu"
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">I am a...</label>
              <div className="relative">
                <select 
                  className="input-field pl-12 appearance-none" 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="student">Student looking for home</option>
                  <option value="landlord">Landlord listing property</option>
                </select>
                <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  required 
                  className="input-field pl-12" 
                  placeholder="••••••••"
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-5 text-lg">Create Account</button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-gray-400">
            Already have an account? <Link to="/login" className="text-emerald-600 font-black hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
