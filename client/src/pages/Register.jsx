import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { register } from '../services/authService';
import { ArrowLeft } from 'lucide-react';

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
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-md border">
      <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition font-bold group w-fit">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" required className="mt-1 block w-full px-3 py-2 border rounded-md" 
                 onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" required className="mt-1 block w-full px-3 py-2 border rounded-md" 
                 onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">I am a...</label>
          <select 
            className="mt-1 block w-full px-3 py-2 border rounded-md" 
            value={formData.role}
            onChange={e => setFormData({...formData, role: e.target.value})}
          >
            <option value="student">Student</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" required className="mt-1 block w-full px-3 py-2 border rounded-md" 
                 onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-teal-800 transition font-bold">Register</button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
