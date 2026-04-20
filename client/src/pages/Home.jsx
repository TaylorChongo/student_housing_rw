import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Search, ShieldCheck, PlusCircle, MapPin, User } from 'lucide-react';
import api from '../services/api';

const Home = () => {
  const [latestListings, setLatestListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/listings?limit=3').then(res => {
      setLatestListings(res.data.listings);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const scrollToLatest = (e) => {
    e.preventDefault();
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">
            The Smart Way to Stay in <span className="text-primary">Rwanda</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Connect directly with verified landlords. No agents, no hidden fees, just your perfect student home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#latest" 
              onClick={scrollToLatest}
              className="bg-primary text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-teal-800 transition shadow-xl shadow-teal-100 flex items-center justify-center gap-2"
            >
              <Search size={24} /> Browse Listings
            </a>
            <Link to="/register?role=landlord" className="bg-white text-gray-900 border-2 border-gray-200 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <PlusCircle size={24} /> List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section id="latest" className="max-w-7xl mx-auto px-4 scroll-mt-20">
        <div className="flex justify-between items-end mb-10 border-l-4 border-primary pl-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase italic">Latest Openings</h2>
            <p className="text-gray-500 mt-2 text-lg">Hand-picked homes for students, available right now.</p>
          </div>
          <Link to="/listings" className="text-primary font-bold hover:underline hidden sm:block bg-primary/5 px-4 py-2 rounded-xl font-black">View all →</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {latestListings.map(item => (
              <Link key={item.id} to={`/listings/${item.id}`} className="group bg-white rounded-3xl shadow-sm border overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/400x300'} 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={item.title} 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; }}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full font-bold text-primary shadow-sm text-lg">
                    ${item.price}/mo
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 mt-2 text-sm">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-1">
                    <User size={14} />
                    <span>Owner: {item.landlord?.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Main Features Grid */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 pt-10 border-t border-gray-100">
        <div className="bg-white p-10 rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all duration-500 group">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">For Students</h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Finding a home shouldn't be stressful. We verify every listing so you can search with confidence.
          </p>
          <ul className="space-y-4 mb-10 font-medium">
            <li className="flex items-start gap-3 text-gray-700 font-medium"><ShieldCheck size={18} className="text-green-500 shrink-0 mt-1" /> Access to verified listings</li>
            <li className="flex items-start gap-3 text-gray-700 font-medium"><ShieldCheck size={18} className="text-green-500 shrink-0 mt-1" /> Direct chat with owners</li>
            <li className="flex items-start gap-3 text-gray-700 font-medium"><ShieldCheck size={18} className="text-green-500 shrink-0 mt-1" /> Schedule visits instantly</li>
          </ul>
          <Link to="/listings" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-800 transition inline-flex items-center gap-2 shadow-lg shadow-teal-100">
            <Search size={20} /> Browse Full Catalog
          </Link>
        </div>

        <div className="bg-teal-900 p-10 rounded-[2.5rem] text-white shadow-xl hover:shadow-2xl transition-all duration-500 group">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-teal-300 mb-8 group-hover:scale-110 transition-transform">
            <HomeIcon size={32} />
          </div>
          <h2 className="text-3xl font-black mb-4 text-white">For Landlords</h2>
          <p className="text-teal-100/70 text-lg mb-8 leading-relaxed">
            Reach thousands of local and international students. Manage your properties with ease.
          </p>
          <ul className="space-y-4 mb-10 font-medium text-teal-50">
            <li className="flex items-start gap-3 shrink-0"><ShieldCheck size={18} className="text-teal-400 shrink-0 mt-1" /> List for free in minutes</li>
            <li className="flex items-start gap-3 shrink-0"><ShieldCheck size={18} className="text-teal-400 shrink-0 mt-1" /> Powerful landlord dashboard</li>
            <li className="flex items-start gap-3 shrink-0"><ShieldCheck size={18} className="text-teal-400 shrink-0 mt-1" /> Track visit requests easily</li>
          </ul>
          <Link to="/register?role=landlord" className="bg-white text-teal-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition inline-flex items-center gap-2">
            <PlusCircle size={20} /> List Your Property
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 flex flex-wrap justify-around gap-10 text-center bg-white rounded-[3rem] shadow-sm border">
        <div>
          <p className="text-5xl font-black text-primary italic">100%</p>
          <p className="text-gray-400 font-bold uppercase text-xs mt-2 tracking-widest">Verified Houses</p>
        </div>
        <div>
          <p className="text-5xl font-black text-primary italic">0%</p>
          <p className="text-gray-400 font-bold uppercase text-xs mt-2 tracking-widest">Middle-man fees</p>
        </div>
        <div>
          <p className="text-5xl font-black text-primary italic">Direct</p>
          <p className="text-gray-400 font-bold uppercase text-xs mt-2 tracking-widest">Owner Access</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
