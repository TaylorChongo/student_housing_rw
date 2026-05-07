import { Mail, Phone, MapPin, Send, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

const Contact = () => {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="relative min-h-[64vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Kigali support team"
            className="w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-8 shadow-2xl shadow-emerald-500/20">
            <MessageSquare size={14} /> We're here to help
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.08] tracking-tighter italic uppercase">
            Get in touch <br />
            <span className="text-emerald-400 not-italic">with our team.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Have a question about a listing? Need help with your account? Our support team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-950/10 border border-gray-100 h-full">
              <h3 className="text-2xl font-black text-slate-950 mb-10 italic uppercase tracking-tight">Contact Info</h3>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Us</p>
                    <p className="text-lg font-bold text-slate-950">hello@shrw.rw</p>
                    <p className="text-sm text-gray-500 font-medium">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Call Us</p>
                    <p className="text-lg font-bold text-slate-950">+250 788 000 000</p>
                    <p className="text-sm text-gray-500 font-medium">Mon-Fri, 8am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Visit Us</p>
                    <p className="text-lg font-bold text-slate-950">Kigali Heights, 4th Floor</p>
                    <p className="text-sm text-gray-500 font-medium">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-gray-50 flex gap-4">
                 {[1,2,3].map(i => <div key={i} className="w-10 h-10 bg-gray-50 rounded-full"></div>)}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-slate-950/10 border border-gray-100">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-slate-950 mb-4 italic uppercase">Send a Message</h2>
                <p className="text-gray-500 font-medium">We'll get back to you as soon as possible.</p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-950 ml-4">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-bold focus:bg-white focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-950 ml-4">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-bold focus:bg-white focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-950 ml-4">Subject</label>
                  <input
                    type="text"
                    placeholder="What is this about?"
                    className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-bold focus:bg-white focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-950 ml-4">Your Message</label>
                  <textarea 
                    rows="6"
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl font-bold focus:bg-white focus:border-emerald-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group">
                    Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex gap-6 items-start">
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center shrink-0">
                <ShieldCheck size={28} />
             </div>
             <div>
                <h4 className="font-black text-slate-950 italic uppercase mb-2">Safe & Secure</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed text-balance">All communications are encrypted and monitored for your safety.</p>
             </div>
          </div>
          <div className="flex gap-6 items-start">
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center shrink-0">
                <Zap size={28} />
             </div>
             <div>
                <h4 className="font-black text-slate-950 italic uppercase mb-2">Fast Response</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed text-balance">Our dedicated support team typically replies in less than 2 hours.</p>
             </div>
          </div>
          <div className="flex gap-6 items-start">
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center shrink-0">
                <MessageSquare size={28} />
             </div>
             <div>
                <h4 className="font-black text-slate-950 italic uppercase mb-2">Direct Chat</h4>
                <p className="text-gray-500 font-medium text-sm leading-relaxed text-balance">Students and landlords can talk directly through our platform.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
