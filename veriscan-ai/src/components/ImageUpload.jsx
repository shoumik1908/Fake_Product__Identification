import { useState, useRef, useCallback } from 'react';

export default function ImageUpload({ onImageChange, image }) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    onImageChange(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleFileChange = (e) => processFile(e.target.files[0]);
  const previewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        id="image-file-input"
        className="hidden"
        onChange={handleFileChange}
      />

      {previewUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 group">
          <img src={previewUrl} alt="Product preview" className="w-full h-44 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 rounded-lg bg-white text-[#6D28D9] text-xs font-semibold cursor-pointer border-0 hover:bg-purple-50 transition-all"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-500 text-xs font-semibold cursor-pointer hover:bg-red-100 transition-all"
            >
              Remove
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-[10px] truncate">{image.name}</p>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
          className={`relative w-full h-36 rounded-xl flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 border-2 border-dashed
            ${dragging
              ? 'border-[#8B5CF6] bg-purple-50'
              : 'border-slate-300 bg-slate-50 hover:border-purple-400 hover:bg-purple-50/40'}`}
        >
          {/* Upload icon */}
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${dragging ? 'bg-purple-100' : 'bg-white border border-slate-200'}`}>
            <svg className={`w-5 h-5 ${dragging ? 'text-[#6D28D9]' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>

          <div className="text-center px-4">
            <p className={`text-sm font-semibold ${dragging ? 'text-[#6D28D9]' : 'text-slate-600'}`}>
              {dragging ? 'Drop image here' : 'Upload Product Photo'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Drag &amp; drop or <span className="text-[#8B5CF6] font-medium">click to browse</span>
            </p>
          </div>

          <p className="text-[10px] text-slate-400 absolute bottom-2.5">JPG, PNG, WebP — max 10MB</p>
        </div>
      )}
    </div>
  );
}
