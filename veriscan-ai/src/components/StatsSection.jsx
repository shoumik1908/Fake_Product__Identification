const STATS = [
  { value: '97%', label: 'Accuracy Rate', desc: 'On benchmark product datasets' },
  { value: '10K+', label: 'Products Verified', desc: 'Scanned across major brands' },
  { value: '<2s', label: 'Result Time', desc: 'From upload to verdict' },
  { value: 'Free', label: 'Always', desc: 'No account, no credit card' },
];

export default function StatsSection() {
  return (
    <section style={{ background: '#F8FAFC' }} className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-2">By The Numbers</h2>
          <p className="text-slate-500 text-base">Performance metrics that define our platform.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="card-light rounded-2xl p-7 text-center flex flex-col gap-2">
              <div className="text-4xl font-black text-[#6D28D9]">{s.value}</div>
              <div className="text-sm font-bold text-[#0F172A]">{s.label}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
