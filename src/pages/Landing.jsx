import { Link } from 'react-router-dom'
import { ArrowRight, Play, Building2, GraduationCap, Landmark, Users, Briefcase, Layers, Sparkles, ArrowDown, Check } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              LIVE SKILL INTELLIGENCE • MAHARASHTRA DEMO
            </div>
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-[#0B2447]">
              Bridging the gap <br className="hidden sm:inline" />between <span className="text-[#2563eb]">education</span> <br className="hidden sm:inline" />and industry.
            </h1>
            <p className="mt-3 sm:mt-4 text-base lg:text-lg leading-relaxed text-slate-600 max-w-[560px]">
              SkillSync AI connects students, companies and government through real-time skill intelligence.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link to="/roles" className="inline-flex items-center justify-center gap-2 bg-[#0B2447] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#12325f] transition shadow-xs w-full sm:w-auto">
                Explore Platform <ArrowRight size={16}/>
              </Link>
              <a href="#how" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-50 transition w-full sm:w-auto">
                <Play size={16} className="text-slate-500"/> See How It Works
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-[520px]">
              {[
                { v:"12,450", l:"Students" },
                { v:"186", l:"Companies" },
                { v:"742", l:"Skills Tracked" },
                { v:"94", l:"Emerging Skills" },
              ].map(s=>(
                <div key={s.l} className="bg-white border border-slate-200 rounded-xl px-3 py-3 text-center shadow-xs">
                  <div className="text-base sm:text-[18px] font-extrabold text-[#0B2447]">{s.v}</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-slate-500 uppercase mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Demo statistics • Maharashtra skill intelligence dataset</p>
          </div>

          {/* Ecosystem visual */}
          <div className="bg-white border border-slate-200 rounded-[20px] p-6 lg:p-7 shadow-sm">
            <div className="text-[11px] font-bold tracking-widest text-slate-500 text-center">SKILL INTELLIGENCE ECOSYSTEM</div>

            <div className="mt-6 flex flex-col items-center">
              <div className="bg-[#0B2447] text-white rounded-xl px-5 py-3 flex items-center gap-2.5 shadow">
                <Building2 size={18}/><span className="text-sm font-bold tracking-wide">COMPANIES</span>
              </div>
              <ArrowDown size={16} className="text-slate-400 my-1.5"/>
              <div className="bg-blue-50 border border-blue-200 text-[#0B2447] rounded-full px-4 py-1.5 text-xs font-semibold">Industry Skill Demand</div>
              <ArrowDown size={16} className="text-slate-400 my-1.5"/>
              <div className="bg-gradient-to-br from-[#0B2447] to-[#1e4a8a] text-white rounded-2xl px-6 py-4 text-center shadow-lg w-full max-w-[280px]">
                <div className="text-[11px] tracking-widest opacity-80 font-semibold">SKILL INTELLIGENCE</div>
                <div className="text-[18px] font-extrabold tracking-tight">ENGINE</div>
                <div className="text-[11px] opacity-70 mt-1">Real-time analysis • 742 skills</div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-2">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-center">
                    <GraduationCap size={18} className="mx-auto text-emerald-600"/>
                    <div className="text-xs font-bold text-emerald-800 mt-1">STUDENTS</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-xs space-y-1.5">
                    <div className="flex justify-between"><span className="text-slate-500">Skill Gaps</span><span className="w-2 h-2 bg-amber-400 rounded-full mt-1"></span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Recommended Courses</span><span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span></div>
                    <div className="text-[11px] font-semibold text-emerald-600 text-center pt-1">→ Industry Ready</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
                    <Landmark size={18} className="mx-auto text-amber-600"/>
                    <div className="text-xs font-bold text-amber-800 mt-1">GOVERNMENT</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-xs space-y-1.5">
                    <div className="flex justify-between"><span className="text-slate-500">Skill Trends</span><span className="w-2 h-2 bg-violet-400 rounded-full mt-1"></span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Course Gaps</span><span className="w-2 h-2 bg-red-400 rounded-full mt-1"></span></div>
                    <div className="text-[11px] font-semibold text-amber-600 text-center pt-1">→ New Programs</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Live sync • Updated just now
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder cards */}
      <section id="stakeholders" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: GraduationCap, title:"STUDENT", desc:"Discover the skills you need to become industry-ready.", color:"bg-emerald-600", to:"/student" },
            { icon: Building2, title:"COMPANY", desc:"Tell us what skills your industry needs.", color:"bg-blue-600", to:"/company" },
            { icon: Landmark, title:"GOVERNMENT", desc:"Use skill intelligence to build future-ready programs.", color:"bg-amber-600", to:"/government" },
          ].map(c=>(
            <div key={c.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center text-white`}><c.icon size={20}/></div>
              <div className="mt-3 text-xs font-bold tracking-widest text-slate-500">{c.title}</div>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              <Link to={c.to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2447]">Enter Portal <ArrowRight size={14}/></Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white border-y border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold tracking-widest text-blue-600">HOW IT WORKS</div>
            <h2 className="mt-2 text-[28px] font-extrabold text-[#0B2447] leading-tight">A closed-loop skill ecosystem</h2>
            <p className="mt-2 text-sm text-slate-600">From industry demand to student readiness to government action — in real time.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {[
              { n:"01", t:"Industry shares skill requirements", d:"Companies define required skills, proficiency & importance for each role.", icon: Building2 },
              { n:"02", t:"Platform analyzes skill demand", d:"SkillSync AI aggregates demand across 186 companies & 742 skills.", icon: Layers },
              { n:"03", t:"Students discover their skill gaps", d:"Personal gap analysis vs industry benchmark + radar visualization.", icon: GraduationCap },
              { n:"04", t:"Government identifies training gaps", d:"Demand vs course coverage → 71% gap flagged → new program proposed.", icon: Landmark },
            ].map(s=>(
              <div key={s.n} className="relative bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-[#0B2447] text-white flex items-center justify-center text-xs font-bold">{s.n}</div>
                <s.icon size={18} className="absolute top-5 right-5 text-slate-400"/>
                <h3 className="mt-3 text-sm font-bold text-[#0B2447] leading-tight">{s.t}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#0B2447] rounded-2xl p-6 lg:p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs tracking-widest opacity-70 font-semibold">DEMO STORY IN 15 SECONDS</div>
              <p className="mt-2 text-sm leading-relaxed max-w-[640px] opacity-90">
                <span className="font-bold">Company:</span> “We need React, Node & Docker.” → <span className="font-bold">Platform:</span> “High demand.” → <span className="font-bold">Student:</span> “Weak in React & Node.” → <span className="font-bold">Platform:</span> “Here are your gaps & courses.” → <span className="font-bold">Government:</span> “GenAI demand 89%, coverage 18% → Create new course.”
              </p>
            </div>
            <Link to="/roles" className="shrink-0 bg-white text-[#0B2447] px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2">Start Demo <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      <footer className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-[#0B2447] text-white flex items-center justify-center font-bold text-[10px]">SS</span> SkillSync AI — Demo Prototype • Maharashtra • SIH 2026</div>
        <div>Frontend-only • Mock data • No backend • Recharts + Tailwind</div>
      </footer>
    </div>
  )
}
