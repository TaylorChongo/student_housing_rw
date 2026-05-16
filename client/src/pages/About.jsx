import { ShieldCheck, Users, Target, Zap, Heart } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

const About = () => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[52vh] flex items-center justify-center px-4 sm:px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Kigali City" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight italic uppercase tracking-tighter">
            We're on a mission to <br />
            <span className="text-emerald-400 not-italic">redefine student living.</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Founded in Kigali, SHRW is the first direct-to-landlord platform designed specifically for the unique needs of the Rwandan student community.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Heart size={14} fill="currentColor" /> Our Roots
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-6 italic uppercase tracking-tight">How it all started</h2>
            <div className="space-y-4 text-gray-500 font-medium text-base sm:text-lg leading-relaxed">
              <p>
                As former students ourselves, we experienced firsthand the struggle of finding safe, affordable, and verified housing near campus. The process was fragmented, plagued by hidden fees, and often lacked transparency.
              </p>
              <p>
                We saw an opportunity to use technology to bridge the gap between students and landlords, creating a community built on trust, verification, and direct communication.
              </p>
            </div>
          </div>
          <div className="bg-emerald-950/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 flex items-center justify-center">
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-emerald-900/5 text-center">
                  <p className="text-3xl sm:text-4xl font-black text-emerald-600 mb-2 italic">2024</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Founded</p>
                </div>
                <div className="bg-emerald-600 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-emerald-900/20 text-center text-white translate-y-8">
                  <p className="text-3xl sm:text-4xl font-black mb-2 italic">5k+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Students</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-900 py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">Our Core Values</h2>
          <p className="text-slate-400 font-medium text-base sm:text-lg">The principles that guide everything we build.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck size={32} />,
              title: "Trust & Safety",
              desc: "Every listing is manually verified by our team. We ensure what you see is what you get, no exceptions."
            },
            {
              icon: <Zap size={32} />,
              title: "Efficiency First",
              desc: "Skip the middle-man. Our platform allows direct, real-time communication between students and owners."
            },
            {
              icon: <Users size={32} />,
              title: "Community Driven",
              desc: "We're not just a platform; we're a support system for students navigating their most important years."
            }
          ].map((value, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[2rem] md:rounded-[3rem] hover:bg-white/10 transition-all group">
              <div className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 italic uppercase">{value.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team/Vision */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
          <Target size={14} fill="currentColor" /> Our Vision
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-950 mb-10 md:mb-12 italic uppercase tracking-tighter max-w-4xl mx-auto">
          Building the standard for <span className="text-emerald-600">modern living</span> in East Africa.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
           {[
             { label: "Transparency", val: "100%" },
             { label: "Support", val: "24/7" },
             { label: "Accuracy", val: "99.9%" },
             { label: "Community", val: "Active" }
           ].map((stat, i) => (
             <div key={i} className="p-6 sm:p-8 border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem]">
                <p className="text-3xl font-black text-slate-950 mb-2 italic">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default About;
