import { useEffect, useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';

const AIAssistantButton = () => {
  const [bottomOffset, setBottomOffset] = useState(96);

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.getElementById('site-footer');
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      const baseOffset = isDesktop ? 24 : 96;

      if (!footer) {
        setBottomOffset(baseOffset);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const footerOverlap = window.innerHeight - footerTop;
      setBottomOffset(Math.max(baseOffset, footerOverlap + 16));
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <div
      className="fixed right-4 md:right-6 z-[80] flex items-end gap-3 transition-[bottom] duration-200 ease-out"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <div className="relative max-w-[210px] rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm font-bold leading-snug text-slate-800 shadow-2xl shadow-slate-950/10 backdrop-blur-md">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
          <Sparkles size={12} />
          AI Assistant
        </div>
        <p>Hi there, how can I assist you?</p>
        <span className="absolute -right-1.5 bottom-5 h-3 w-3 rotate-45 border-r border-t border-white/60 bg-white/70 backdrop-blur-md" />
      </div>

      <button
        type="button"
        className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/30 bg-slate-950 text-white shadow-2xl shadow-slate-950/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 active:scale-95"
        aria-label="Open AI assistant"
        title="Open AI assistant"
      >
        <span className="absolute inset-1 rounded-full border border-white/10" />
        <Bot size={28} strokeWidth={2.4} className="relative transition-transform group-hover:scale-110" />
        <span className="absolute right-1 top-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
      </button>
    </div>
  );
};

export default AIAssistantButton;
