const STEPS = [
  {
    step: '01',
    title: 'Upload a Photo',
    desc: 'Take a clear, well-lit photo of the product or its label and upload it via our secure form.',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    step: '02',
    title: 'AI Analysis',
    desc: 'Our ResNet-50 model analyzes visual patterns at a pixel level, detecting counterfeiting signs instantly.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    step: '03',
    title: 'Instant Verdict',
    desc: 'Receive a clear authentic or counterfeit verdict with a confidence score in under 2 seconds.',
    color: 'bg-indigo-100 text-indigo-700',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-light px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-5">
            3-Step Process
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-2">
            How It <span className="text-gradient-purple">Works</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            From photo upload to verified verdict — powered by AI in seconds.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-0 items-stretch">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row flex-1">
              {/* Card */}
              <div className="card-light rounded-2xl p-8 flex-1 group">
                <div className="flex items-start gap-4">
                  <div className="step-number flex-shrink-0">{step.step}</div>
                  <div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold mb-3 ${step.color}`}>
                      Step {step.step}
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
              {/* Arrow connector */}
              {idx < STEPS.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
