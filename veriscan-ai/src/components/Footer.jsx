import { Link, useLocation } from 'react-router-dom';

const LINKS = {
  Product: ['Scan Now', 'Features', 'How it Works', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security'],
};

function LogoBadge() {
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)', boxShadow: '0 2px 10px rgba(76,29,149,0.4)' }}
    >
      VS
    </div>
  );
}

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer
      className={`w-full border-t ${isHome
        ? 'border-purple-900/20'
        : 'border-slate-200 bg-white'}`}
      style={isHome ? { background: '#020617' } : {}}
    >
      {/* Top glow line on dark */}
      {isHome && (
        <div className="absolute left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <LogoBadge />
              <span className={`text-lg font-bold ${isHome ? 'text-[#EDE9FE]' : 'text-[#0F172A]'}`}>
                Veri<span className="text-gradient-purple">Scan</span> AI
              </span>
            </Link>
            <p className={`text-sm leading-relaxed ${isHome ? 'text-slate-500' : 'text-slate-400'}`}>
              AI-powered counterfeit detection — free for everyone.
            </p>
            {/* Status badge */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-xs ${isHome ? 'text-slate-600' : 'text-slate-400'}`}>
                All systems operational
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isHome ? 'text-[#8B5CF6]' : 'text-[#6D28D9]'}`}>
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`text-sm transition-colors no-underline ${isHome
                        ? 'text-slate-500 hover:text-[#C4B5FD]'
                        : 'text-slate-400 hover:text-[#6D28D9]'}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${isHome ? 'border-purple-900/20' : 'border-slate-100'}`}>
          <p className={`text-sm ${isHome ? 'text-slate-600' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} VeriScan AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Security'].map((label) => (
              <a
                key={label}
                href="#"
                className={`text-xs no-underline transition-colors ${isHome ? 'text-slate-600 hover:text-slate-300' : 'text-slate-400 hover:text-[#6D28D9]'}`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
