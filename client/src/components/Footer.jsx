import { Link } from 'react-router-dom';
import { Home, Mail, Phone, Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-1">
          <Link to="/" className="text-2xl font-black text-white flex items-center gap-2 tracking-tight mb-6">
            <div className="bg-emerald-600 p-1.5 rounded-xl text-white">
              <Home size={24} />
            </div>
            <span>SH<span className="text-emerald-600 italic">RW</span></span>
          </Link>
          <p className="text-gray-400 font-medium leading-relaxed mb-8">
            Revolutionizing student housing in Rwanda. Finding a home has never been this easy, secure, and direct.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-8">Navigation</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors font-bold">Home</Link></li>
            <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors font-bold">Landlord Portal</Link></li>
            <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors font-bold">Join the Community</Link></li>
            <li><Link to="/saved" className="text-gray-400 hover:text-white transition-colors font-bold">Saved Places</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-8">Support</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">Help Center</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">Safety Guidelines</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-8">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-400 font-bold">
              <Mail size={18} className="text-emerald-600" /> hello@shrw.rw
            </li>
            <li className="flex items-center gap-3 text-gray-400 font-bold">
              <Phone size={18} className="text-emerald-600" /> +250 788 000 000
            </li>
            <li className="text-gray-400 font-medium text-sm mt-6">
              Kigali Heights, 4th Floor<br />
              Kigali, Rwanda
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
          © 2026 Student Housing Rwanda. All rights reserved.
        </p>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
          Designed for the future of living
        </p>
      </div>
    </footer>
  );
};

export default Footer;
