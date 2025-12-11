import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade, Navigation, A11y } from 'swiper/modules';

const Home: React.FC = () => {
  // Calculator State
  const [spend, setSpend] = useState(10000);
  const [conversion, setConversion] = useState(2.5);
  const [ltv, setLtv] = useState(500);
  const [growth, setGrowth] = useState(20); // Changed default from 25 to 20 for conservative estimate
  const [projection, setProjection] = useState(0);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    // Logic: 
    // Annual Spend = spend * 12
    // Baseline Revenue (approx 4x ROAS) = spend * 12 * 4
    // New Formula: Apply growth uplift strictly to conversion rate
    
    const annualSpend = spend * 12;
    // Assuming a base ROAS of ~4 without the "Widget"
    const baseRevenue = annualSpend * 4; 
    
    // Apply growth uplift directly to the conversion rate (Conservative approach)
    const projectedConversion = conversion * (1 + (growth / 100));
    
    // Volume multiplier derived from improved conversion and LTV
    // Normalized against arbitrary baselines (2% conv, $400 LTV) for the scenario
    const volumeMultiplier = (projectedConversion / 2) * (ltv / 400); 

    const projectedRev = baseRevenue * volumeMultiplier;
    const estimatedProfit = projectedRev - annualSpend;
    const estimatedRoi = annualSpend > 0 ? (estimatedProfit / annualSpend) * 100 : 0;

    setProjection(projectedRev);
    setRoi(estimatedRoi);
  }, [spend, conversion, ltv, growth]);

  const testimonials = [
    {
      quote: "Marketing Widget transformed our messy data into a clear roadmap. We doubled our ROAS in 90 days.",
      author: "Sarah Jenkins",
      role: "CMO, TechFlow",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The AI-driven insights gave us the confidence to scale our ad spend. The results speak for themselves.",
      author: "Michael Chen",
      role: "Founder, ScaleUp Apparel",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Finally, an agency that understands that 'brand awareness' doesn't pay the bills. Revenue first.",
      author: "Elena Rodriguez",
      role: "VP Growth, MediCare",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Their team's dedication to data accuracy is unmatched. We finally trust our dashboard numbers.",
      author: "David Kim",
      role: "Director of Marketing, FinTech Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The AI strategies helped us uncover audiences we didn't know existed. Incredible ROI.",
      author: "Jessica Lee",
      role: "Head of Digital, EcoGoods",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="flex flex-col items-center bg-background-home min-h-screen text-slate-300 font-sora">
      {/* New Hero Section */}
      <section className="relative overflow-hidden w-full pt-16 lg:pt-24 pb-24">
        {/* Background Blurs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300"></span>
              Elite Growth Partner for performance-heavy brands
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl font-display">
              Turn messy marketing into a <span className="text-emerald-300">predictable revenue engine</span>.
            </h1>
            <p className="mt-6 text-balance text-base text-slate-300 sm:text-lg max-w-2xl mx-auto">
              Marketing Widget sits between your data and your decisions – fixing tracking, simplifying funnels,
              and giving your team a clear, calm roadmap for compounding growth.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300 transition-colors hover:scale-105">
                Book a 30-min Growth Session
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-3.5 text-sm font-bold text-slate-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors bg-slate-900/40 backdrop-blur-sm">
                Explore Growth Playbooks
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              No fluffy audits. No vanity metrics. Just an honest growth roadmap – or we walk away.
            </p>
          </div>

          {/* Dashboard Showcase */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-start max-w-6xl mx-auto">
            {/* Live Dashboard Card */}
            <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 md:p-8 shadow-xl shadow-emerald-500/10 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Live Growth Dashboard</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-50">$380,420 <span className="text-xs font-normal text-slate-400">/ last 30 days</span></p>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 px-4 py-2 text-right border border-emerald-500/20">
                  <p className="text-[10px] uppercase tracking-wide text-emerald-300 font-bold">Attributed Growth</p>
                  <p className="text-sm font-semibold text-emerald-300">+38.6%</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">Tracking Confidence</p>
                  <p className="mt-2 text-xl font-semibold text-slate-50">97.2%</p>
                  <p className="mt-1 text-xs text-slate-400">Cross-platform signals verified</p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">Media Efficiency</p>
                  <p className="mt-2 text-xl font-semibold text-slate-50">4.3x</p>
                  <p className="mt-1 text-xs text-slate-400">Blended MER, last 90 days</p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">Decision Lag</p>
                  <p className="mt-2 text-xl font-semibold text-slate-50">-63%</p>
                  <p className="mt-1 text-xs text-slate-400">From messy dashboards to clarity</p>
                </div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="rounded-3xl border border-emerald-500/40 bg-slate-900/60 p-6 shadow-lg shadow-emerald-500/30 backdrop-blur-md">
              <h2 className="text-sm font-semibold tracking-wide text-emerald-300 uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">calculate</span> ROI Scenario
              </h2>
              <p className="mt-1 text-xs text-slate-400">Rough projection with conservative assumptions.</p>

              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="mb-1.5 block text-slate-300 font-medium" htmlFor="mw_spend">Monthly ad spend (USD)</label>
                  <input 
                    id="mw_spend" 
                    type="number" 
                    min="1000" 
                    step="100" 
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-xs text-slate-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" 
                    value={spend}
                    onChange={(e) => setSpend(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-slate-300 font-medium" htmlFor="mw_conversion">Site conversion rate (%)</label>
                    <input 
                        id="mw_conversion" 
                        type="number" 
                        min="0.3" 
                        max="25" 
                        step="0.1" 
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-xs text-slate-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" 
                        value={conversion}
                        onChange={(e) => setConversion(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-slate-300 font-medium" htmlFor="mw_ltv">Customer LTV (USD)</label>
                    <input 
                        id="mw_ltv" 
                        type="number" 
                        min="50" 
                        step="10" 
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-xs text-slate-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" 
                        value={ltv}
                        onChange={(e) => setLtv(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-slate-300 font-medium" htmlFor="mw_growth">Expected lift (%)</label>
                  <input 
                    id="mw_growth" 
                    type="number" 
                    min="5" 
                    max="200" 
                    step="5" 
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-xs text-slate-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all" 
                    value={growth}
                    onChange={(e) => setGrowth(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-900/80 border border-white/5 p-4 text-xs">
                <p className="text-[11px] uppercase tracking-wide text-slate-400 font-bold">12-month projection</p>
                <p className="mt-2 text-2xl font-bold text-emerald-300 text-glow">
                    ${projection.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                  Approx. incremental revenue attributed to Marketing Widget interventions.
                </p>
                <p className="mt-3 text-[11px] text-slate-300 pt-3 border-t border-white/5 flex justify-between">
                  <span>Estimated ROI:</span>
                  <span className="font-semibold text-emerald-300">{roi.toLocaleString(undefined, { maximumFractionDigits: 1 })}%</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 hover:shadow-emerald-500/30">
              <span className="material-symbols-outlined text-lg">smart_toy</span>
              AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel (Swiper) */}
      <section className="w-full max-w-6xl px-6 py-20 bg-[#0d121c] border-y border-white/5">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-white mb-4">Trusted by Innovative Teams</h2>
           <p className="text-slate-400">See what happens when you prioritize data over assumptions.</p>
        </div>
        
        <Swiper
          modules={[Pagination, Autoplay, EffectFade, Navigation, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          speed={800}
          loop={true}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          a11y={{ prevSlideMessage: 'Previous slide', nextSlideMessage: 'Next slide' }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              effect: 'slide' // Switch to slide effect for multiple items
            },
            1024: {
              slidesPerView: 3,
              effect: 'slide'
            },
          }}
          className="pb-12 px-4 md:px-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="h-full">
               <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl h-full flex flex-col hover:border-slate-600 transition-colors">
                  <div className="mb-6 text-[#00c77d]">
                     <span className="material-icons text-4xl opacity-50">format_quote</span>
                  </div>
                  <p className="text-slate-300 text-lg mb-8 flex-grow leading-relaxed">"{item.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                     <img src={item.image} alt={item.author} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
                     <div>
                        <p className="text-white font-bold text-sm">{item.author}</p>
                        <p className="text-slate-500 text-xs">{item.role}</p>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Session CTA */}
      <section className="py-20 w-full max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">One calm, brutally honest growth session.</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">Bring your current numbers, channels, and constraints. We'll map the 80/20 levers and show you where messy data is silently capping your growth.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
             <div className="bg-slate-900/50 p-8 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-[#00c77d] mb-4">In the 30-min session, we'll:</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                   <li className="flex items-start gap-3"><span className="material-icons text-[#00c77d] text-sm mt-1">check</span> Trace the full customer journey from first touch to repeat purchase.</li>
                   <li className="flex items-start gap-3"><span className="material-icons text-[#00c77d] text-sm mt-1">check</span> Spot tracking leaks and attribution blind spots.</li>
                   <li className="flex items-start gap-3"><span className="material-icons text-[#00c77d] text-sm mt-1">check</span> Rank growth opportunities by effort vs. impact.</li>
                   <li className="flex items-start gap-3"><span className="material-icons text-[#00c77d] text-sm mt-1">check</span> Outline a 90-day roadmap you can follow.</li>
                </ul>
             </div>
             
             <div className="bg-slate-900/50 p-8 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-[#00c77d] mb-4">Request Session</h3>
                <div className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm rounded p-4">
                   <strong>Note:</strong> Scheduling widget currently in maintenance. Please email us directly.
                </div>
             </div>
          </div>
      </section>
    </div>
  );
};

export default Home;