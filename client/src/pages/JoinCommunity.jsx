import { Building2, Heart, Rocket, Target, Users, Zap, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

const communityProjectImage = 'https://bslbucketmain.s3.us-west-1.amazonaws.com/wp-content/uploads/2025/05/Screenshot-2025-05-19-at-2.48.19%E2%80%AFPM.png';

const JoinCommunity = () => {
  const donationTiers = [
    {
      name: "Student Supporter",
      amount: "10",
      desc: "Help provide essential resources for students searching for homes.",
      perks: ["Community Badge", "Monthly Progress Newsletter"]
    },
    {
      name: "Community Builder",
      amount: "50",
      desc: "Directly contribute to the architectural planning of our first building.",
      perks: ["Digital Recognition Wall", "Early Access to Resident Lists", "All Supporter Perks"]
    },
    {
      name: "Visionary Partner",
      amount: "250",
      desc: "Become a major stakeholder in the future of Rwandan student living.",
      perks: ["Physical Plaque in First Building", "Invitation to Groundbreaking", "All Builder Perks"]
    }
  ];

  return (
    <div className="pb-24">
      {/* Visionary Hero */}
      <section className="relative min-h-[64vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Kigali Future" 
            className="w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-8 shadow-2xl shadow-emerald-500/20">
            <Rocket size={14} /> The 2030 Vision
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.08] tracking-tighter italic uppercase">
            Building the <br />
            <span className="text-emerald-400 not-italic">future of campus.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            We are moving beyond a platform. Our mission is to build affordable, modern, and high-tech student apartment complexes across every university neighborhood in Rwanda.
          </p>
        </div>
      </section>

      {/* The Master Plan */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group">
              <img src={communityProjectImage} alt="Student housing project" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-emerald-600/20 mix-blend-multiply" />
            </div>
            {/* Overlay Stat */}
            <div className="absolute -bottom-10 -right-10 bg-white p-12 rounded-[3rem] shadow-2xl border border-emerald-50">
               <p className="text-6xl font-black text-emerald-600 mb-2 italic">12</p>
               <p className="text-xs font-black uppercase tracking-widest text-slate-400">Planned Sites</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 italic uppercase tracking-tighter leading-tight">
              The SHRW <br/>Apartment Project
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Finding a house is step one. Owning the ecosystem is the goal. We're designing living spaces that prioritize study, community, and safety—eliminating the stress of housing so students can focus on what matters: their education.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Eco-Friendly Design", desc: "Solar-powered buildings with sustainable water management.", icon: <Globe className="text-emerald-500" /> },
                { title: "Tech-Enabled Living", desc: "High-speed campus fiber and smart security in every unit.", icon: <Zap className="text-emerald-500" /> },
                { title: "Direct Ownership", desc: "Built by our community, for our community.", icon: <Building2 className="text-emerald-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-950 italic uppercase text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="bg-slate-950 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-6">
             <Heart size={14} fill="currentColor" /> Support the Vision
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-6">Invest in the Next Generation</h2>
          <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Your contributions directly fund land acquisition and architectural development for our upcoming student complexes.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {donationTiers.map((tier, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] flex flex-col items-center text-center hover:bg-white/[0.08] transition-all group relative overflow-hidden">
              {idx === 2 && <div className="absolute top-0 right-0 bg-emerald-600 text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">Most Impact</div>}
              <h3 className="text-2xl font-black text-white mb-2 italic uppercase">{tier.name}</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-5xl font-black text-emerald-400 italic">${tier.amount}</span>
                <span className="text-slate-500 font-black text-sm mb-2 uppercase tracking-widest">/ one-time</span>
              </div>
              <p className="text-slate-400 font-medium text-sm leading-relaxed mb-10">
                {tier.desc}
              </p>
              <div className="w-full space-y-4 mb-12">
                {tier.perks.map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-3 text-white text-xs font-bold justify-center">
                    <ShieldCheck size={14} className="text-emerald-500" /> {perk}
                  </div>
                ))}
              </div>
              <button className="w-full bg-white text-slate-950 py-5 rounded-2xl font-black text-sm hover:bg-emerald-500 hover:text-white transition-all group-hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-auto">
                Support Now <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency Note */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-emerald-50 p-12 rounded-[4rem] border border-emerald-100 shadow-xl shadow-emerald-900/5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mb-8 mx-auto">
             <Users size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-950 mb-6 italic uppercase tracking-tight">100% Transparent Fundraising</h3>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            Every dollar contributed is tracked and reported monthly to our community. These funds are locked in a dedicated "Building Fund" and cannot be used for operational costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <div className="px-6 py-3 bg-white rounded-full text-xs font-black text-slate-950 border border-emerald-100 shadow-sm italic">Audit Ready</div>
             <div className="px-6 py-3 bg-white rounded-full text-xs font-black text-slate-950 border border-emerald-100 shadow-sm italic">Monthly Reports</div>
             <div className="px-6 py-3 bg-white rounded-full text-xs font-black text-slate-950 border border-emerald-100 shadow-sm italic">Community Led</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinCommunity;
