import StatsSection from '../components/StatsSection';
import HowItWorks from '../components/HowItWorks';
import FeatureCard from '../components/FeatureCard';

const FEATURES = [
  {
    icon: 'AI',
    title: 'AI-Powered Detection',
    desc: 'ResNet-50 deep learning model performs pixel-level analysis to catch even the most convincing counterfeits.',
  },

  {
    icon: 'RT',
    title: 'Real-Time Results',
    desc: 'The entire pipeline — from image upload to AI inference — completes in under 2 seconds.',
  },
  {
    icon: 'DB',
    title: 'Global Database',
    desc: 'Trained on 10,000+ authentic and counterfeit product images from major global brands.',
  },
  {
    icon: 'PV',
    title: 'Privacy-First Design',
    desc: 'Images are processed in memory and never stored. Your data stays yours — always.',
  },
  {
    icon: 'FR',
    title: 'Completely Free',
    desc: 'No subscription, no account required. Full access to AI verification at zero cost.',
  },
];

export default function Features() {
  return (
    <div className="w-full min-h-screen" style={{ background: '#F8FAFC' }}>

      {/* ─── PAGE HEADER ─── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 badge-light px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6">
            Platform Overview
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">
            Features &amp; <span className="text-gradient-purple">How It Works</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Understand how VeriScan AI uses advanced deep learning
            to ensure authentic product verification at scale.
          </p>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <StatsSection />

      {/* ─── HOW IT WORKS ─── */}
      <div className="border-t border-slate-100">
        <HowItWorks />
      </div>

      {/* ─── FEATURES GRID ─── */}
      <section className="py-16 px-6" style={{ background: '#F8FAFC' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 badge-light px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-5">
              Core Capabilities
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-2">
              Built for <span className="text-gradient-purple">Precision</span>
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Enterprise-grade AI packaged for everyday consumers, developers, and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-4">
            Ready to verify your first product?
          </h2>
          <p className="text-slate-500 text-base mb-8 max-w-lg mx-auto">
            It takes under 30 seconds. No account. No payment. Just AI-powered truth.
          </p>
          <a
            href="#/scan"
            className="inline-flex items-center gap-2 btn-light-primary px-9 py-4 rounded-full font-bold text-base no-underline"
          >
            Verify a Product Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

    </div>
  );
}
