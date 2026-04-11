export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="card-light rounded-2xl p-7 flex gap-5 items-start group">
      {/* Icon box */}
      <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors duration-250">
        <span className="text-[#6D28D9] font-black text-lg leading-none select-none">{icon}</span>
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
