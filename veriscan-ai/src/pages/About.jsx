export default function About() {
  const blocks = [
    {
      abbr: 'MS',
      title: 'Our Mission',
      body: 'VeriScan AI exists to democratize product authentication. Counterfeit goods cost the global economy over $500 billion annually. We believe every consumer deserves access to powerful, instant AI verification — for free.',
    },
    {
      abbr: 'TK',
      title: 'The Technology',
      body: 'Our system uses a ResNet-50 deep learning model trained on over 10,000 product images. It performs pixel-level visual analysis to detect subtle inconsistencies in texture, logo placement, and material finish that are invisible to the human eye.',
    },

    {
      abbr: 'PV',
      title: 'Privacy & Security',
      body: 'Your uploaded images are never permanently stored. The system processes them in memory, returns the result, and immediately discards the file. Your data is yours — period.',
    },
  ];

  return (
    <div className="w-full min-h-screen" style={{ background: '#F8FAFC' }}>

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 badge-light px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6">
            About VeriScan AI
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">
            About <span className="text-gradient-purple">VeriScan AI</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
            AI-powered protection against counterfeit products — built for everyone, completely free.
          </p>
        </div>
      </div>

      {/* Content cards */}
      <div className="max-w-3xl mx-auto px-6 py-14 flex flex-col gap-5">
        {blocks.map((block) => (
          <div key={block.title} className="card-light rounded-2xl p-8 flex gap-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)' }}
            >
              {block.abbr}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] mb-2">{block.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{block.body}</p>
            </div>
          </div>
        ))}

        {/* Contact */}
        <div
          className="rounded-2xl p-10 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #6D28D9, #4C1D95)' }}
        >
          <div
            className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Get in Touch</h2>
          <p className="text-purple-200 text-sm mb-6 max-w-sm mx-auto">
            Questions, feedback, or partnership inquiries? We would love to hear from you.
          </p>
          <a
            href="mailto:shoumik1908@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-[#6D28D9] px-7 py-3 rounded-full text-sm font-bold no-underline hover:bg-purple-50 transition-all"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
