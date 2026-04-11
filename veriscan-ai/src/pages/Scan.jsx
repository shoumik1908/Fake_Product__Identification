import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import Results from '../components/Results';

const STEPS = [
  {
    step: '01',
    label: 'Upload a Photo',
    desc: 'Take a clear, well-lit photo of the product or its label and upload it via our secure form.',
    color: 'text-violet-700 bg-violet-50',
  },
  {
    step: '02',
    label: 'AI Analysis',
    desc: 'ResNet-50 analyzes visual patterns at a pixel level, detecting counterfeit signs instantly.',
    color: 'text-purple-700 bg-purple-50',
  },
  {
    step: '03',
    label: 'Instant Verdict',
    desc: 'Receive a clear authentic or counterfeit verdict with a confidence score in under 2 seconds.',
    color: 'text-indigo-700 bg-indigo-50',
  },
];

const FEATURES = [
  { label: 'Blockchain-Verified', desc: 'Logged on Polygon' },
  { label: 'Real-Time AI', desc: 'Under 2 seconds' },
  { label: 'Global Database', desc: '10,000+ images' },
  { label: 'Completely Free', desc: 'No account needed' },
];

const BACKEND_URL = import.meta.env.PROD
  ? 'https://shoumik1908-veriscan-backend.hf.space'
  : 'http://127.0.0.1:8000';

export default function Scan() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastMode, setLastMode] = useState(null);

  const handleVerify = async ({ productId, productName, productBrand, image }) => {
    setLoading(true); setError(null); setResult(null);
    setLastMode(image ? 'photo' : 'text');
    const formData = new FormData();
    formData.append('product_id', productId);
    if (image) formData.append('image', image, image.name);
    if (productName) formData.append('product_name', productName);
    if (productBrand) formData.append('product_brand', productBrand);
    try {
      const res = await fetch(`${BACKEND_URL}/verify`, { method: 'POST', body: formData });
      if (!res.ok) {
        let errStr = 'Verification failed.';
        try {
          const errData = await res.json();
          if (errData.detail) errStr = errData.detail;
        } catch(e) {
          errStr = 'Photo verification failed. Make sure the backend is running and try again.';
        }
        throw new Error(errStr);
      }
      setResult(await res.json());
    } catch (err) {
      setError(err.message || 'Verification failed. Please check the product ID and try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full min-h-screen" style={{ background: '#F8FAFC' }}>

      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 badge-light px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-5">
            Product Authentication
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-3 tracking-tight">
            Verify Your <span className="text-gradient-purple">Product</span>
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Upload a photo or enter product details to instantly check authenticity using AI.
          </p>
        </div>
      </div>

      {/* Step indicators */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row flex-1">
                <div className="card-light rounded-2xl p-7 flex-1 group">
                  <div className="flex items-start gap-4">
                    <div className="step-number flex-shrink-0">{step.step}</div>
                    <div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold mb-3 ${step.color}`}>
                        Step {step.step}
                      </div>
                      <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">{step.label}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
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
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">

          {/* Left sidebar */}
          <aside className="flex flex-col gap-5">
            {/* Feature list */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-step-card p-6">
              <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-widest mb-4">
                Why VeriScan AI?
              </h3>
              <div className="flex flex-col gap-2.5">
                {FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50/40 transition-all duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6] flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-[#0F172A]">{f.label}</div>
                      <div className="text-[11px] text-slate-400">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI model card */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #6D28D9, #4C1D95)' }}
            >
              <h3 className="text-sm font-bold mb-1.5">AI Model Info</h3>
              <p className="text-xs text-purple-200 leading-relaxed">
                Powered by a ResNet-50 model trained on 10,000+ product images with 97%+ accuracy on benchmark data.
              </p>
              <div className="mt-4 pt-4 border-t border-purple-500/30 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] text-purple-200">Model online &amp; ready</span>
              </div>
            </div>
          </aside>

          {/* Right: Form + Results */}
          <div className="flex flex-col gap-5">
            <AuthForm onVerify={handleVerify} isLoading={loading} />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center gap-3 text-red-600 text-sm font-medium">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                {error}
              </div>
            )}

            {loading && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-step-card p-8 flex items-center gap-5">
                <div className="w-11 h-11 rounded-full border-2 border-purple-100 border-t-[#8B5CF6] animate-spin flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#0F172A] mb-1">
                    {lastMode === 'photo' ? 'Analyzing photo with AI...' : 'Verifying product...'}
                  </div>
                  <div className="text-xs text-slate-400">This usually takes under 2 seconds</div>
                </div>
              </div>
            )}

            {result && !loading && <Results data={result} />}
          </div>
        </div>
      </div>
    </div>
  );
}
