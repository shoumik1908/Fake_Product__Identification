import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '139,92,246' : '34,211,238';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="w-full bg-dark">

      {/* ═══════════ HERO (Full Viewport) ═══════════ */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: 'calc(100vh - 73px)', background: 'linear-gradient(135deg, #020617 0%, #170d2b 40%, #2d1354 70%, #4C1D95 100%)' }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Ambient orbs */}
        <div className="orb orb-purple w-96 h-96 -top-20 -left-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="orb orb-cyan w-80 h-80 -bottom-16 -right-16 animate-float" style={{ animationDelay: '2s' }} />
        <div className="orb orb-deep w-64 h-64 top-1/3 right-1/4 animate-float" style={{ animationDelay: '4s' }} />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20 animate-fade-up">

          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 glass-dark-light px-5 py-2 rounded-full mb-10 text-[11px] font-bold tracking-widest uppercase text-[#C4B5FD]">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse-purple inline-block" />
            AI-Powered Counterfeit Detection
          </div>

          {/* Main heading */}
          <h1 className="font-black tracking-tight leading-none mb-5" style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}>
            <span className="text-white">Veri</span><span className="text-gradient-purple">Scan</span>
          </h1>

          {/* Sub heading */}
          <p className="text-[#C4B5FD] font-light tracking-widest mb-6" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)', letterSpacing: '0.2em' }}>
            AI  ·  AUTHENTICATION  ·  PLATFORM
          </p>

          {/* Description */}
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed mb-12" style={{ fontSize: '1.05rem' }}>
            Instantly verify any product with our ResNet-50 deep learning model.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-verify-now"
              onClick={() => navigate('/scan')}
              className="btn-dark-primary px-9 py-4 rounded-full font-bold text-base flex items-center gap-3 cursor-pointer border-0"
            >
              Verify a Product
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/features')}
              className="px-8 py-4 rounded-full font-medium text-base text-[#C4B5FD] glass-dark-light hover:bg-purple-900/20 transition-all duration-300 border-0 cursor-pointer"
            >
              See How It Works
            </button>
          </div>

          {/* Trust line */}
          <p className="text-xs text-slate-600 tracking-widest mt-10 uppercase">
            No account required &nbsp;·&nbsp; Completely free &nbsp;·&nbsp; Instant results
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600 text-xs animate-bounce">
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#020617' }}>
        <div className="max-w-4xl mx-auto">
          <div className="relative card-dark rounded-3xl p-14 text-center overflow-hidden">
            <div
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(76,29,149,0.22) 0%, transparent 60%, rgba(34,211,238,0.06) 100%)',
              }}
            />
            <div className="orb orb-purple w-56 h-56 -top-12 -left-12 opacity-40" />
            <div className="orb orb-cyan w-48 h-48 -bottom-10 -right-10 opacity-20" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Stop Getting Fooled by Fakes
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Join thousands who use VeriScan AI to verify products before they pay.
                It takes under 30 seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/scan')}
                  className="btn-dark-primary px-10 py-4 rounded-full text-base font-bold cursor-pointer border-0 flex items-center gap-3"
                >
                  Start Verifying Free
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/features')}
                  className="px-8 py-4 rounded-full font-medium text-[#C4B5FD] glass-dark-light hover:bg-purple-900/20 transition-all border-0 cursor-pointer"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
