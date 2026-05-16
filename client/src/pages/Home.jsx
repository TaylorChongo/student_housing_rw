import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Zap, ShieldCheck, PlusCircle, ArrowUpRight, Users, Sparkles } from 'lucide-react';
import api from '../services/api';
import { getCurrentUser } from '../services/authService';
import heroBg from '../assets/hero-bg.png';
import n1 from '../assets/neighborhood-1.jpg';
import n2 from '../assets/neighborhood-2.jpg';
import studentsGroup from '../assets/students-group.png';
import { 
  SearchIllustration, 
  ChatIllustration, 
  SecureIllustration,
} from '../components/Illustrations';

const Home = () => {
  const [latestListings, setLatestListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    api.get('/listings?limit=6').then(res => {
      setLatestListings(res.data.listings);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const query = heroSearch.trim();
    navigate(query ? `/listings?search=${encodeURIComponent(query)}` : '/listings');
  };

  const heroSuggestions = [
    { label: 'Near campus', params: { search: 'campus' } },
    { label: 'Kacyiru rooms', params: { location: 'Kacyiru' } },
    { label: 'Under $300', params: { maxPrice: '300' } },
    { label: 'Private studio', params: { search: 'studio' } },
  ];

  const handleHeroSuggestion = (suggestion) => {
    const params = new URLSearchParams(suggestion.params);
    setHeroSearch(suggestion.label);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="pb-0">
      {/* Modern Glass Hero */}
      <section className="relative min-h-[calc(100svh-4rem)] md:min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-16 overflow-hidden">
        {/* Background Image with Dynamic Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Kigali City" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full font-sans">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex max-w-full items-center justify-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-2xl text-white px-4 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em] sm:tracking-[0.2em] mb-8 sm:mb-10 border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] group cursor-default transition-all hover:bg-white/10 hover:border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <span className="min-w-0">Join <span className="text-emerald-400">2,000+</span> students in Rwanda</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-normal drop-shadow-2xl">
              Your next home <br />
              <span className="text-emerald-400 italic">is just a chat away.</span>
            </h1>
            
            <p className="text-white/85 text-sm sm:text-base md:text-xl font-semibold mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              The only platform in Rwanda where students talk directly to landlords. <span className="text-white font-semibold">No agents. No hidden fees. 100% Verified.</span>
            </p>
            
            <form onSubmit={handleHeroSearch} className="w-full max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl p-2 rounded-[1.75rem] sm:rounded-full shadow-2xl shadow-slate-950/20 border border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="hidden sm:block pl-4 text-emerald-300">
                  <Search size={22} strokeWidth={3} />
                </div>
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search by area or university..."
                  className="flex-1 bg-transparent px-4 sm:px-2 py-4 text-white font-bold outline-none placeholder:text-white/60 min-w-0 text-center sm:text-left"
                />
                <button type="submit" className="w-full sm:w-auto bg-emerald-600 text-white px-6 md:px-8 py-4 rounded-full font-black text-sm hover:bg-emerald-700 transition-all active:scale-95">
                  Search
                </button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {heroSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => handleHeroSuggestion(suggestion)}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/85 text-xs font-black hover:bg-white/20 hover:text-white transition-all"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Prime Locations Showcase */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-2 space-y-8">
            <div className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
              <MapPin size={14} fill="currentColor" /> Strategic Living
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-950 italic uppercase tracking-tighter leading-tight">
              Live where it <br />
              <span className="text-emerald-600 not-italic">actually matters.</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed max-w-lg">
              We don't just find you a house; we find you a home in Kigali's most vibrant neighborhoods. Whether you want to be a 5-minute walk from campus or in the heart of the city's popular spots, we've got you covered.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                <p className="font-black text-slate-950 mb-2 italic uppercase text-sm">Near Universities</p>
                <p className="text-xs text-gray-500 font-medium">Walk to CMU, ALU, or UR in minutes. No more long commutes.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-gray-100">
                <p className="font-black text-slate-950 mb-2 italic uppercase text-sm">Safe Neighborhoods</p>
                <p className="text-xs text-gray-500 font-medium">Verified properties in Kigali's most secure and student-friendly areas.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
                  <img src={n1} alt="Kigali Neighborhood" className="w-full h-full object-cover" />
                </div>
                <div className="bg-emerald-600 p-5 sm:p-10 rounded-[2rem] md:rounded-[3rem] text-white shadow-xl shadow-emerald-900/20">
                  <p className="text-3xl sm:text-5xl font-black italic mb-2">98%</p>
                  <p className="text-xs font-black uppercase tracking-widest opacity-80">Location Match</p>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 pt-10 sm:pt-20">
                <div className="bg-slate-950 p-5 sm:p-10 rounded-[2rem] md:rounded-[3rem] text-white shadow-xl">
                  <p className="text-xl sm:text-3xl font-black italic leading-tight">Your commute <br/>ends here.</p>
                </div>
                <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
                  <img src={n2} alt="Kigali City View" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-10 -right-4 sm:-right-10 w-48 sm:w-80 h-48 sm:h-80 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Latest Listings: Immediate Value */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-12 md:pt-16 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap size={14} fill="currentColor" /> Live Feed
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 italic uppercase tracking-tighter">Latest Openings</h2>
            <p className="text-gray-500 mt-4 font-medium text-base sm:text-lg">Fresh properties listed in the last 24 hours. Be the first to reach out.</p>
          </div>
          <Link to="/listings" className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-white border border-gray-200 px-6 sm:px-8 py-4 rounded-2xl font-black text-slate-950 hover:border-emerald-600 transition-all text-sm">
            View All Houses <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-[4/3] bg-emerald-950/5 animate-pulse rounded-[2rem] md:rounded-[3rem]"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {latestListings.map(item => (
              <Link key={item.id} to={`/listings/${item.id}`} className="card group md:rounded-[3rem]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/400x300'} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={item.title} 
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl font-black text-slate-950 shadow-sm text-sm">
                    ${item.price}<span className="text-[10px] text-gray-400">/mo</span>
                  </div>
                  <div className="absolute top-6 right-6 bg-emerald-600 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 text-[10px] font-black uppercase tracking-wider shadow-lg">
                    <ShieldCheck size={12} /> Verified
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-black text-slate-950 text-xl leading-tight line-clamp-1 group-hover:text-emerald-600 transition-colors italic">{item.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 mt-2 text-sm font-bold">
                    <MapPin size={14} className="text-emerald-600/30" />
                    <span>{item.location}</span>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em]">
                      <Zap size={14} fill="currentColor" /> 8.8 Move-in Ready
                    </div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">15 min walk</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Impact Stats */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto py-16 md:py-24 border-t border-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/20 md:transform md:-rotate-1 md:hover:rotate-0 transition-all duration-700">
              <img src={studentsGroup} alt="Students in Rwanda" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
              <Users size={14} fill="currentColor" /> Growing Community
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 italic uppercase tracking-tighter leading-tight">
              Making student life <br />
              <span className="text-emerald-600 not-italic">easier in Rwanda.</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-5 sm:gap-8 pt-4">
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tighter italic">500+</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Properties Listed</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tighter italic">2k+</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Active Students</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tighter italic">12+</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Universities</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tighter italic">0%</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Commission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Deep-Dive: Features Grid */}
      <section className="pt-12 pb-16 md:pb-24 px-4 sm:px-6 bg-emerald-950/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* For Students Card */}
          <div className="bg-white p-6 sm:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 flex flex-col items-start hover:shadow-emerald-900/10 transition-all duration-500 group relative overflow-hidden">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mb-4 italic uppercase tracking-tight">For Students</h2>
            <p className="text-gray-500 text-base mb-8 leading-relaxed font-medium">
              Discover your next home with confidence. We connect you directly with verified owners, eliminating middle-men and hidden fees.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-10 w-full">
              {[
                "Direct Landlord Chat", "1-Click Visit Booking", "Zero Agency Fees", 
                "Verified Legal Contracts", "Student-Only Community", "Instant Room Alerts"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] font-bold text-slate-950">
                  <Zap size={14} className="text-emerald-500" fill="currentColor" /> {feature}
                </div>
              ))}
            </div>
            <Link to="/listings" className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl text-center hover:bg-emerald-500 transition-colors">
              Start Your Discovery
            </Link>
          </div>

          {/* For Landlords Card */}
          <div className="bg-slate-950 p-6 sm:p-10 rounded-[2rem] md:rounded-[3rem] text-white shadow-2xl flex flex-col items-start hover:shadow-slate-950/40 transition-all duration-500 group relative overflow-hidden">
            <div className="w-12 h-12 bg-white/5 text-emerald-400 rounded-2xl flex items-center justify-center mb-8">
              <PlusCircle size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-4 italic uppercase tracking-tight">For Landlords</h2>
            <p className="text-slate-400 text-base mb-8 leading-relaxed font-medium">
              Maximize your occupancy with high-quality international student tenants. Professional tools to manage your listings effortlessly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-10 w-full">
              {[
                "Smart Inventory Mgmt", "Tenant Vetting System", "Performance Analytics",
                "24/7 Priority Support", "Direct Payment Links", "Multi-Property Dashboard"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] font-bold">
                  <Zap size={14} className="text-emerald-400" fill="currentColor" /> {feature}
                </div>
              ))}
            </div>
            <button type="button" className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl text-center hover:bg-emerald-500 transition-colors">
              Access Landlord Portal
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 italic uppercase tracking-tighter mb-4">How It Works</h2>
          <p className="text-gray-500 font-medium text-base sm:text-lg">Your journey to a new home in three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center group">
            <div className="w-full aspect-square max-w-[120px] mb-5 group-hover:scale-105 transition-transform duration-500">
              <SearchIllustration />
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 text-lg font-black border border-emerald-100 shadow-sm">1</div>
            <h3 className="text-xl font-black text-slate-950 mb-3 italic">Find Your Place</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Browse through hundreds of verified listings near your campus.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-full aspect-square max-w-[120px] mb-5 group-hover:scale-105 transition-transform duration-500">
              <ChatIllustration />
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 text-lg font-black border border-emerald-100 shadow-sm">2</div>
            <h3 className="text-xl font-black text-slate-950 mb-3 italic">Chat & Verify</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Message landlords directly through our secure platform.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="w-full aspect-square max-w-[120px] mb-5 group-hover:scale-105 transition-transform duration-500">
              <SecureIllustration />
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 text-lg font-black border border-emerald-100 shadow-sm">3</div>
            <h3 className="text-xl font-black text-slate-950 mb-3 italic">Secure Your Home</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Finalize the deal without any agent fees or hidden costs.</p>
          </div>
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="px-4 sm:px-6 py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Student Housing RW
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6 italic tracking-tight leading-tight">
            Ready to find your perfect student home?
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            Join 2,000+ students using verified listings and direct landlord chat across Rwanda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" className="w-full sm:w-auto bg-emerald-600 text-white px-8 sm:px-10 py-4 rounded-2xl font-black text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
              Create Free Account
            </button>
            <Link to="/listings" className="w-full sm:w-auto bg-white text-slate-950 px-8 sm:px-10 py-4 rounded-2xl font-black text-sm hover:border-emerald-600 transition-colors border border-gray-200">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signal: University Partners */}
      <section className="px-4 sm:px-6 py-14 md:py-16 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 whitespace-nowrap">Trusted at</p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16 opacity-100 transition-all duration-500">
              {[
                "https://socialinnovationinhealth.org/wp-content/uploads/2024/10/rwanda-1024x538-1-300x158.jpg",
                "https://engineering.cmu.edu/afretec/_files/images/members/cmu-africa-logo.png",
                "https://media.licdn.com/dms/image/v2/D4D0BAQGU-T7YEn-XOQ/company-logo_200_200/company-logo_200_200/0/1697007984951?e=2147483647&v=beta&t=f3mtoPZ2-D1h-PJrrC-9fWLxrKjW18N9FVCk8cdPWsc",
                "https://opportunityapi.ini.rw/uploads/public/companies/logos/37fd8dce-7623-4df5-a2df-f6fcbee909bb.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdne_xoFoO8igWGJ2cv4Nh7LNqzmc8Y5uDMg&s"
              ].map((src, i) => (
                <div key={i} className="h-14 md:h-16 w-auto flex items-center justify-center">
                  <img src={src} className="max-h-full w-auto object-contain" alt="Partner Logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
