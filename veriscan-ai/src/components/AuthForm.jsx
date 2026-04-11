import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function AuthForm({ onVerify, isLoading }) {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId) return;
    onVerify({ productId, productName, productBrand, image });
  };

  const isDisabled = isLoading || !productId;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-step-card overflow-hidden">

      {/* Header */}
      <div className="px-7 py-5 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-white flex items-center gap-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6D28D9, #4C1D95)' }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-[#0F172A]">Authenticate Your Product</div>
          <div className="text-xs text-slate-400 mt-0.5">Fill in the details below and submit</div>
        </div>
      </div>

      <form className="p-7 flex flex-col gap-6" onSubmit={handleSubmit}>

        {/* 1 — Photo */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
            <span className="step-number w-5 h-5 text-[10px]">1</span>
            Product Photo
            <span className="ml-auto text-[10px] font-medium normal-case tracking-normal text-slate-400">optional</span>
          </label>
          <ImageUpload image={image} onImageChange={setImage} />
          <span className="text-[11px] text-slate-400">Upload a clear photo for AI visual analysis</span>
        </div>

        {/* 2 — Name */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
            <span className="step-number w-5 h-5 text-[10px]">2</span>
            Product Name
            <span className="ml-auto text-[10px] font-medium normal-case tracking-normal text-slate-400">optional</span>
          </label>
          <input
            className="input-light w-full px-4 py-3 rounded-xl text-sm"
            type="text"
            placeholder="e.g. Air Max 270"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* 3 — Brand */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
            <span className="step-number w-5 h-5 text-[10px]">3</span>
            Brand
            <span className="ml-auto text-[10px] font-medium normal-case tracking-normal text-slate-400">optional</span>
          </label>
          <input
            className="input-light w-full px-4 py-3 rounded-xl text-sm"
            type="text"
            placeholder="e.g. Nike"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          />
        </div>

        {/* 4 — Product ID */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}
            >
              4
            </span>
            Product ID
            <span className="ml-auto text-[10px] font-bold normal-case tracking-normal text-red-400">required *</span>
          </label>
          <input
            className="input-light w-full px-4 py-3 rounded-xl text-sm"
            type="text"
            placeholder="e.g. WS-A24-7819"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
          <span className="text-[11px] text-slate-400">Found on the product label, packaging, or receipt</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="verify-submit-btn"
          disabled={isDisabled}
          className="btn-light-primary w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 cursor-pointer border-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none mt-1"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197M15.803 15.803A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Verify Now
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-400">
          {image
            ? 'AI will analyze the product photo and PID for authenticity.'
            : 'Enter the unique PID from your product packaging to verify.'}
        </p>
      </form>
    </div>
  );
}
