export default function Results({ data }) {
  if (!data) return null;

  const { prediction, confidence, product_id } = data;
  const isReal = ['real', 'authentic'].some(w => prediction.toLowerCase().includes(w));
  const confidencePercent = (confidence * 100).toFixed(1);
  const confidenceNum = parseFloat(confidencePercent);

  return (
    <div className={`bg-white rounded-2xl border shadow-step-card overflow-hidden ${isReal ? 'border-green-200' : 'border-red-200'}`}>

      {/* Verdict Banner */}
      <div className={`px-7 py-5 flex items-center gap-4 ${isReal ? 'bg-green-50 border-b border-green-100' : 'bg-red-50 border-b border-red-100'}`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isReal ? 'bg-green-100' : 'bg-red-100'}`}>
          {isReal ? (
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )}
        </div>
        <div>
          <div className={`text-lg font-black ${isReal ? 'text-green-700' : 'text-red-600'}`}>
            {isReal ? 'Authentic Product' : 'Counterfeit Detected'}
          </div>
          <div className="text-sm text-slate-500 mt-0.5">
            {isReal
              ? 'This product appears to be genuine.'
              : 'This product shows signs of being counterfeit.'}
          </div>
        </div>
        <div className={`ml-auto px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 ${isReal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          {confidencePercent}% confidence
        </div>
      </div>

      <div className="p-7 flex flex-col gap-6">

        {/* Confidence Bar */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Confidence Score</span>
            <span className={`text-sm font-black ${isReal ? 'text-green-600' : 'text-red-500'}`}>{confidencePercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100">
            <div
              className={`h-2.5 rounded-full transition-all duration-700 ${isReal
                ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                : 'bg-gradient-to-r from-red-500 to-red-400'}`}
              style={{ width: `${confidenceNum}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>

        {/* Details table */}
        <div className="rounded-xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
          {product_id && (
            <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50/50">
              <span className="text-xs text-slate-400 font-medium">Product ID</span>
              <span className="text-xs font-bold text-[#0F172A]">{product_id}</span>
            </div>
          )}
          <div className="flex justify-between items-center px-5 py-3.5">
            <span className="text-xs text-slate-400 font-medium">Status</span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${isReal
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-600 border-red-200'}`}>
              {isReal ? 'Authentic' : 'Counterfeit'}
            </span>
          </div>
          <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50/50">
            <span className="text-xs text-slate-400 font-medium">AI Accuracy</span>
            <span className="text-xs font-bold text-[#0F172A]">{confidencePercent}%</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center leading-relaxed">
          This result is AI-generated and should be used as a guide. For high-value items, verify directly with the manufacturer.
        </p>
      </div>
    </div>
  );
}
