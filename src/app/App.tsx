import { useEffect, useState } from 'react';
import {
  Phone, Mail, Facebook, Twitter, Instagram, Youtube,
  Menu, X, Star, MapPin, Clock, MessageCircle, Download,
  Users, BookOpen, Bus, Music, Palette, Globe,
  Trophy, Check, ArrowRight, ChevronDown, ChevronLeft,
  ChevronRight, FlaskConical, Microscope,
  Dumbbell, Cpu, Play, Camera, Wifi,
  Baby, Calendar, FileText, IndianRupee,
} from 'lucide-react';

import {
  ACADEMIC_CALENDAR,
  ACADEMIC_SESSION,
  ACADEMICS,
  ADMISSION_STEPS,
  EVENTS_DATA,
  FAQS,
  FACILITIES,
  FACULTY,
  FEE_STRUCTURE,
  GALLERY_ITEMS,
  NEWS,
  NAV_LINKS,
  SCHOOL,
  STATS,
  SYLLABUS_GRADES,
  TESTIMONIALS,
  TOPPERS,
  WHY_US,
} from '../data/school';
import { fetchHolidayItems, buildHolidayCalendar } from '../services/holidayService';
import type { HolidayItem } from '../types/holiday';

const serif = { fontFamily: "'Playfair Display', serif" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">{children}</div>;
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`text-4xl font-bold leading-tight ${light ? 'text-white' : 'text-[#0F2645]'}`} style={serif}>
      {children}
    </h2>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [academicTab, setAcademicTab] = useState('primary');
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', grade: '', message: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFee, setShowFee] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [holidayItems, setHolidayItems] = useState<HolidayItem[]>([]);
  const [holidayLoading, setHolidayLoading] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const loadHolidays = async () => {
      setHolidayLoading(true);

      try {
        const holidays = await fetchHolidayItems(ACADEMIC_SESSION);
        setHolidayItems(holidays);
      } finally {
        setHolidayLoading(false);
      }
    };

    loadHolidays();
  }, []);

  useEffect(() => {
    if (showCalendar || showFee || showSyllabus) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showCalendar, showFee, showSyllabus]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  const activeAc = ACADEMICS.find(a => a.id === academicTab) ?? ACADEMICS[2];
  const filteredGallery = galleryFilter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === galleryFilter);
  const t = TESTIMONIALS[testimonialIdx];
  const calendarEntries = buildHolidayCalendar(holidayItems);

  return (
    <div className="bg-background text-foreground">

      {/* ── ACADEMIC CALENDAR MODAL ──────────────────── */}
      {showCalendar && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowCalendar(false)}>
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-[#1B4F8A] text-white px-8 py-5 flex items-center justify-between">
              <div>
                <div className="font-bold text-xl" style={serif}>Academic Calendar {ACADEMIC_SESSION}</div>
                <div className="text-blue-200 text-sm mt-0.5">A K Public School · CBSE · Bokaro</div>
              </div>
              <button onClick={() => setShowCalendar(false)} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
              {holidayLoading && (
                <div className="text-sm text-muted-foreground mb-4">Loading holiday schedule for session {ACADEMIC_SESSION}...</div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                {(calendarEntries.length ? calendarEntries : ACADEMIC_CALENDAR).map(({ month, events }) => (
                  <div key={month} className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="font-bold text-[#1B4F8A] mb-2 text-sm uppercase tracking-wide">{month}</div>
                    <ul className="space-y-1">
                      {events.map(ev => (
                        <li key={ev} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                          {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-5">* Session: {ACADEMIC_SESSION}. Dates subject to change. Please check with school office for confirmation.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── FEE STRUCTURE MODAL ──────────────────────── */}
      {showFee && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowFee(false)}>
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-[#0F2645] text-white px-8 py-5 flex items-center justify-between">
              <div>
                <div className="font-bold text-xl" style={serif}>Fee Structure 2025–26</div>
                <div className="text-blue-200 text-sm mt-0.5">A K Public School · Indicative fees · Contact school for final details</div>
              </div>
              <button onClick={() => setShowFee(false)} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left p-3 font-bold text-[#0F2645] rounded-tl-xl">Class / Grade</th>
                      <th className="text-right p-3 font-bold text-[#0F2645]">Annual Fee</th>
                      <th className="text-right p-3 font-bold text-[#0F2645]">Monthly</th>
                      <th className="text-right p-3 font-bold text-[#0F2645] rounded-tr-xl">Admission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEE_STRUCTURE.map((row, i) => (
                      <tr key={i} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-gray-50/60'}`}>
                        <td className="p-3 text-[#0F2645] font-medium">{row.class}</td>
                        <td className="p-3 text-right text-[#1B4F8A] font-bold">{row.annual}</td>
                        <td className="p-3 text-right text-muted-foreground">{row.monthly}</td>
                        <td className="p-3 text-right text-amber-600 font-semibold">{row.admission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                <strong>Note:</strong> Fees above are indicative. Transportation, uniform, and stationery charges are separate. Contact the school office at <strong>+91 82100 00154</strong> for the final fee schedule and payment plans.
              </div>
              <div className="mt-3 flex gap-3">
                <button className="flex-1 bg-[#1B4F8A] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                  <Download size={16} /> Download Fee Sheet
                </button>
                <button onClick={() => { setShowFee(false); scrollTo('#contact'); }} className="flex-1 border border-border text-[#0F2645] font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SYLLABUS MODAL ───────────────────────────── */}
      {showSyllabus && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowSyllabus(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-[#1B4F8A] text-white px-8 py-5 flex items-center justify-between rounded-t-3xl">
              <div>
                <div className="font-bold text-xl" style={serif}>Download Syllabus</div>
                <div className="text-blue-200 text-sm mt-0.5">Grade-wise CBSE Syllabus 2025–26</div>
              </div>
              <button onClick={() => setShowSyllabus(false)} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {SYLLABUS_GRADES.map(({ label }) => (
                <button key={label}
                  className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl px-5 py-3.5 transition-colors group">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-[#1B4F8A]" />
                    <span className="font-semibold text-[#0F2645] text-sm">{label}</span>
                  </div>
                  <Download size={16} className="text-[#1B4F8A] group-hover:scale-110 transition-transform" />
                </button>
              ))}
              <p className="text-xs text-muted-foreground text-center pt-2">Contact school if a syllabus file is unavailable.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── 1. UTILITY BAR ───────────────────────────── */}
      <div className="bg-[#0B1D3A] text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-5">
            <a href={`tel:${SCHOOL.phone}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone size={13} /> {SCHOOL.phone}
            </a>
            <a href={`mailto:${SCHOOL.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail size={13} /> {SCHOOL.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-amber-400 transition-colors"><Icon size={13} /></a>
              ))}
            </div>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-amber-400 transition-colors text-xs">Parent Login</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-amber-400 transition-colors text-xs">Student Login</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-amber-400 transition-colors text-xs">Admin Login</a>
          </div>
        </div>
      </div>

      {/* ── 2. STICKY HEADER ─────────────────────────── */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 bg-[#1B4F8A] rounded-xl flex items-center justify-center text-white font-bold text-base" style={serif}>AK</div>
            <div className="text-left hidden sm:block">
              <div className="font-bold text-[#0F2645] leading-tight text-base" style={serif}>A K Public School</div>
              <div className="text-[11px] text-muted-foreground">CBSE · Montessori to Class 12 · Bokaro</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <button key={link.label} onClick={() => scrollTo(link.href)}
                className="px-3 py-2 text-sm text-[#0F2645] hover:text-[#1B4F8A] font-medium rounded-lg hover:bg-blue-50 transition-colors">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo('#admissions')}
              className="hidden sm:block bg-amber-500 hover:bg-amber-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm">
              Apply Now
            </button>
            <button onClick={() => setNavOpen(v => !v)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Menu">
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button key={link.label} onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-3 text-[#0F2645] font-medium rounded-xl hover:bg-blue-50 transition-colors">
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('#admissions')} className="mt-2 bg-amber-500 text-white font-bold px-5 py-3 rounded-xl">
              Apply Now
            </button>
          </div>
        )}
      </header>

      {/* ── 3. HERO ──────────────────────────────────── */}
      <section id="home" className="relative" style={{ minHeight: '88vh' }}>
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop&auto=format"
          alt="A K Public School campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D3A]/92 via-[#0B1D3A]/60 to-[#0B1D3A]/20" />
        <div className="relative max-w-7xl mx-auto px-4 flex items-center" style={{ minHeight: '88vh' }}>
          <div className="max-w-2xl text-white py-24">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-8 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Admissions Open {SCHOOL.year}
            </div>
            <h1 className="text-5xl lg:text-[3.75rem] font-bold leading-tight mb-6" style={serif}>
              Where Every Child <em className="not-italic text-amber-400">Discovers</em> Their Potential
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-4 max-w-xl">
              {SCHOOL.tagline}. A CBSE school in Bokaro, Jharkhand offering Montessori to Class 12 with world-class facilities.
            </p>
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-10">
              <MapPin size={14} /> {SCHOOL.address}
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('#admissions')}
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                Apply for Admission <ArrowRight size={20} />
              </button>
              <button onClick={() => scrollTo('#contact')}
                className="border-2 border-white/70 text-white hover:bg-white hover:text-[#0F2645] font-bold px-8 py-4 rounded-xl text-lg transition-all">
                Book a Campus Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHOOL TIMINGS STRIP ─────────────────────── */}
      <section className="bg-amber-500 py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            <div className="flex items-center gap-3 text-[#0B1D3A]">
              <div className="w-10 h-10 bg-[#0B1D3A] rounded-xl flex items-center justify-center">
                <Clock size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide opacity-70">Morning Shift</div>
                <div className="font-bold text-lg leading-tight">7:00 AM – 12:30 PM</div>
                <div className="text-xs opacity-70">Montessori to Class 5 · Mon–Sat</div>
              </div>
            </div>
            <div className="w-px h-12 bg-[#0B1D3A]/20 hidden lg:block" />
            <div className="flex items-center gap-3 text-[#0B1D3A]">
              <div className="w-10 h-10 bg-[#0B1D3A] rounded-xl flex items-center justify-center">
                <Clock size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide opacity-70">Day Shift</div>
                <div className="font-bold text-lg leading-tight">10:30 AM – 4:30 PM</div>
                <div className="text-xs opacity-70">Class 6 to Class 12 · Mon–Sat</div>
              </div>
            </div>
            <div className="w-px h-12 bg-[#0B1D3A]/20 hidden lg:block" />
            <div className="flex items-center gap-3 text-[#0B1D3A]">
              <div className="w-10 h-10 bg-[#0B1D3A] rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide opacity-70">Office Hours</div>
                <div className="font-bold text-lg leading-tight">8:00 AM – 5:00 PM</div>
                <div className="text-xs opacity-70">Monday to Saturday</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. STATS STRIP ───────────────────────────── */}
      <section className="bg-[#1B4F8A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-1" style={serif}>{value}</div>
                <div className="text-blue-200 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ABOUT ─────────────────────────────────── */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=550&fit=crop&auto=format"
                alt="Students at A K Public School"
                className="rounded-3xl object-cover w-full h-[480px] shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-bold" style={serif}>17+</div>
                <div className="text-sm font-medium leading-tight mt-0.5">Years of<br />Excellence</div>
              </div>
            </div>
            <div>
              <SectionLabel>About Us</SectionLabel>
              <SectionHeading>A Legacy of Learning,<br />A Future of Leaders</SectionHeading>
              <p className="text-muted-foreground text-lg leading-relaxed mt-6 mb-4">
                Established in {SCHOOL.est}, A K Public School has grown into one of Bokaro&apos;s most trusted CBSE institutions. Located at Karbala Road, Sultan Nagar, Chas, we provide quality education from Montessori to Class 12 with a focus on academics, character, and all-round development.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our students consistently achieve top board results while excelling in sports, arts, and co-curricular activities. With smart classrooms, dedicated faculty, AC Montessori rooms, and a caring environment, we ensure every child feels safe, inspired, and ready to succeed.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                  <div className="font-bold text-[#1B4F8A] text-lg mb-2" style={serif}>Our Vision</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">To be Bokaro&apos;s most respected institution, nurturing confident, compassionate, and globally-minded citizens.</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                  <div className="font-bold text-amber-700 text-lg mb-2" style={serif}>Our Mission</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">To deliver quality education through innovation, discipline, and empathy — shaping children into tomorrow&apos;s leaders.</p>
                </div>
              </div>
              <button onClick={() => scrollTo('#academics')} className="text-[#1B4F8A] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Explore our programs <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PRINCIPAL'S MESSAGE ───────────────────── */}
      <section className="py-20 bg-[#F2F6FF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <SectionLabel>Leadership</SectionLabel>
              <SectionHeading>Principal&apos;s Message</SectionHeading>
            </div>
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-blue-100 flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-shrink-0 text-center">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format"
                  alt="Mrs. Rubina Siddiqui, Principal"
                  className="w-36 h-36 rounded-full object-cover border-4 border-amber-400 shadow-lg mx-auto mb-2"
                />
                <div className="font-bold text-[#0F2645] text-sm">Mrs. Rubina Siddiqui</div>
                <div className="text-muted-foreground text-xs">Principal, AKPS</div>
              </div>
              <div>
                <div className="text-6xl text-amber-400 leading-none mb-2" style={serif}>&ldquo;</div>
                <p className="text-[#0F2645] text-lg leading-relaxed italic mb-4" style={serif}>
                  At A K Public School, we believe that every child is unique and deserving of the best. Our goal is not merely academic excellence but the complete development of character, curiosity, and confidence. We are committed to making Bokaro proud — one student at a time.
                </p>
                <div className="text-muted-foreground text-sm">M.Ed., M.Sc. &nbsp;&middot;&nbsp; 18 Years of Experience &nbsp;&middot;&nbsp; Bokaro, Jharkhand</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. ACADEMICS ─────────────────────────────── */}
      <section id="academics" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <SectionLabel>Programs</SectionLabel>
            <SectionHeading>Academic Programs</SectionHeading>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Comprehensive CBSE curriculum from Montessori to Class 12, designed to challenge and inspire at every stage.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {ACADEMICS.map(ac => (
              <button key={ac.id} onClick={() => setAcademicTab(ac.id)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  academicTab === ac.id ? 'bg-[#1B4F8A] text-white shadow-md' : 'bg-gray-100 text-[#0F2645] hover:bg-blue-50'
                }`}>
                {ac.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <img
              src={`https://images.unsplash.com/${activeAc.image}?w=700&h=450&fit=crop&auto=format`}
              alt={activeAc.label}
              className="rounded-3xl w-full h-80 object-cover shadow-xl"
            />
            <div>
              <div className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {activeAc.grades}
              </div>
              <h3 className="text-3xl font-bold text-[#0F2645] mb-5" style={serif}>{activeAc.label}</h3>
              <div className="space-y-2 mb-6">
                {activeAc.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2 text-muted-foreground">
                    <Check size={16} className="text-green-500 flex-shrink-0" /> {h}
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="text-xs font-semibold text-[#1B4F8A] uppercase tracking-wide mb-1">Core Subjects</div>
                <div className="text-sm text-muted-foreground">{activeAc.subjects}</div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setShowSyllabus(true)}
                  className="bg-[#1B4F8A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download size={16} /> Download Syllabus
                </button>
                <button onClick={() => setShowCalendar(true)}
                  className="border border-border text-[#0F2645] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Calendar size={16} /> Academic Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Quick links row */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12 pt-10 border-t border-border">
            <button onClick={() => setShowCalendar(true)}
              className="flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 rounded-2xl border border-blue-200 transition-colors text-left group">
              <Calendar size={22} className="text-[#1B4F8A] flex-shrink-0" />
              <div>
                <div className="font-bold text-[#0F2645] text-sm group-hover:text-[#1B4F8A]">Academic Calendar</div>
                <div className="text-xs text-muted-foreground">Holidays, vacations & school events</div>
              </div>
              <ArrowRight size={16} className="text-[#1B4F8A] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button onClick={() => setShowSyllabus(true)}
              className="flex items-center gap-4 p-5 bg-amber-50 hover:bg-amber-100 rounded-2xl border border-amber-200 transition-colors text-left group">
              <FileText size={22} className="text-amber-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-[#0F2645] text-sm group-hover:text-amber-700">Grade-wise Syllabus</div>
                <div className="text-xs text-muted-foreground">Download class-specific syllabus PDFs</div>
              </div>
              <ArrowRight size={16} className="text-amber-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button onClick={() => setShowFee(true)}
              className="flex items-center gap-4 p-5 bg-green-50 hover:bg-green-100 rounded-2xl border border-green-200 transition-colors text-left group">
              <IndianRupee size={22} className="text-green-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-[#0F2645] text-sm group-hover:text-green-700">Fee Structure</div>
                <div className="text-xs text-muted-foreground">Class-wise fees for 2025–26</div>
              </div>
              <ArrowRight size={16} className="text-green-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 8. WHY CHOOSE US ─────────────────────────── */}
      <section className="py-24 bg-[#F2F6FF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Advantage</SectionLabel>
            <SectionHeading>Why Choose A K Public School?</SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100 hover:shadow-md hover:-translate-y-1 transition-all group">
                <div className="w-14 h-14 bg-blue-100 group-hover:bg-[#1B4F8A] rounded-2xl flex items-center justify-center mb-5 transition-colors">
                  <Icon size={24} className="text-[#1B4F8A] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#0F2645] text-lg mb-2" style={serif}>{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ADMISSIONS ────────────────────────────── */}
      <section id="admissions" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <SectionLabel>Enrollments</SectionLabel>
            <SectionHeading>Admission Process {SCHOOL.year}</SectionHeading>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A simple, transparent process designed to make joining our school family easy.
            </p>
          </div>

          <div className="grid md:grid-cols-6 gap-6 relative mb-14">
            {ADMISSION_STEPS.map(({ step, title, desc }, i) => (
              <div key={step} className="text-center relative">
                {i < ADMISSION_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 z-0" />
                )}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md mx-auto mb-3 ${
                  i < 2 ? 'bg-[#1B4F8A] text-white' : 'bg-white border-2 border-[#1B4F8A] text-[#1B4F8A]'
                }`} style={serif}>{step}</div>
                <h4 className="font-bold text-[#0F2645] text-sm mb-1">{title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-[#0F2645] mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-[#1B4F8A]" /> Key Dates
              </h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  ['Admissions Open', 'Dec 2024'],
                  ['Last Date (Mont–KG)', 'Jan 31, 2025'],
                  ['Entrance Test (Cl 1–9)', 'Feb 8, 2025'],
                  ['Results Announced', 'Feb 15, 2025'],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between text-muted-foreground">
                    <span>{k}</span><span className="font-semibold text-[#0F2645]">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h4 className="font-bold text-[#0F2645] mb-4 flex items-center gap-2">
                <Check size={18} className="text-amber-600" /> Documents Required
              </h4>
              <ul className="space-y-1.5">
                {["Birth Certificate (original)", "Previous year's report card", "Aadhaar Card (child & parents)", "4 passport-size photos", "Transfer Certificate (if applicable)", "Medical fitness certificate"].map(doc => (
                  <li key={doc} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" /> {doc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0F2645] text-white rounded-2xl p-6">
              <h4 className="font-bold mb-3 text-lg" style={serif}>Ready to join?</h4>
              <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                Seats are limited. Secure your child&apos;s spot at A K Public School for the {SCHOOL.year} academic year.
              </p>
              <button onClick={() => scrollTo('#contact')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-xl transition-colors mb-3">
                Apply Now
              </button>
              <button onClick={() => setShowFee(true)}
                className="w-full border border-white/30 text-white py-3 rounded-xl text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <IndianRupee size={16} /> View Fee Structure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FACULTY ──────────────────────────────── */}
      <section id="faculty" className="py-24 bg-[#F2F6FF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Our Team</SectionLabel>
            <SectionHeading>Faculty & Leadership</SectionHeading>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACULTY.map(f => (
              <div key={f.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-100 hover:shadow-md transition-all group">
                <div className="h-52 bg-blue-100 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${f.image}?w=400&h=300&fit=crop&auto=format`}
                    alt={f.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-[#0F2645]" style={serif}>{f.name}</h4>
                  <div className="text-[#1B4F8A] text-sm font-semibold mb-1">{f.role}</div>
                  <div className="text-muted-foreground text-xs">{f.qual}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="border-2 border-[#1B4F8A] text-[#1B4F8A] font-bold px-8 py-3 rounded-xl hover:bg-[#1B4F8A] hover:text-white transition-colors">
              View All Faculty
            </button>
          </div>
        </div>
      </section>

      {/* ── 11. FACILITIES ───────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Infrastructure</SectionLabel>
            <SectionHeading>Our Facilities</SectionHeading>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Everything your child needs to learn, grow, and thrive — all under one roof in Chas, Bokaro.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACILITIES.map(f => (
              <div key={f.title} className="rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
                <div className="h-44 bg-blue-100 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${f.image}?w=500&h=300&fit=crop&auto=format`}
                    alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-white border border-border border-t-0 rounded-b-2xl p-4">
                  <div className="font-bold text-[#0F2645] mb-0.5">{f.title}</div>
                  <div className="text-muted-foreground text-sm">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Features icon grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { Icon: Camera, label: 'CCTV' },
              { Icon: Cpu, label: 'Smart Class' },
              { Icon: Baby, label: 'AC Montessori' },
              { Icon: Dumbbell, label: 'Playground' },
              { Icon: Music, label: 'Music Room' },
              { Icon: FlaskConical, label: 'Science Lab' },
              { Icon: Wifi, label: 'Wi-Fi Campus' },
              { Icon: Bus, label: 'Transport' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <Icon size={20} className="text-[#1B4F8A]" />
                <span className="text-xs font-semibold text-[#0F2645]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. CO-CURRICULAR ────────────────────────── */}
      <section className="py-24 bg-[#0F2645] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Beyond Academics</div>
            <SectionHeading light>Student Life & Co-curriculars</SectionHeading>
            <p className="text-blue-200 mt-4 max-w-xl mx-auto">
              We nurture talent beyond textbooks — through sports, arts, music, and leadership activities.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { Icon: Trophy, label: 'Sports & Athletics', sub: 'Cricket, football & more' },
              { Icon: Music, label: 'Music & Singing', sub: 'Vocal & instrumental' },
              { Icon: Palette, label: 'Visual Arts', sub: 'Drawing & craft' },
              { Icon: Globe, label: 'Debate & Quiz', sub: 'Public speaking' },
              { Icon: Microscope, label: 'Science Club', sub: 'Projects & experiments' },
              { Icon: Users, label: 'Leadership & Houses', sub: '4-house system' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="text-center p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10">
                <Icon size={26} className="text-amber-400 mx-auto mb-3" />
                <div className="font-semibold text-sm mb-1 leading-tight">{label}</div>
                <div className="text-blue-300 text-xs">{sub}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { image: 'photo-1461896836934-ffe607ba8211', label: 'Annual Sports Day' },
              { image: 'photo-1511379938547-c1f69419868d', label: 'Music & Cultural Fest' },
              { image: 'photo-1513364776144-60967b0f800f', label: 'Art Exhibition' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl overflow-hidden group h-52 relative bg-blue-900">
                <img
                  src={`https://images.unsplash.com/${item.image}?w=600&h=400&fit=crop&auto=format`}
                  alt={item.label}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/80 to-transparent flex items-end p-5">
                  <span className="text-white font-bold text-lg" style={serif}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. ACHIEVEMENTS ─────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Pride</SectionLabel>
            <SectionHeading>Achievements & Results</SectionHeading>
          </div>
          <h3 className="text-xl font-bold text-[#0F2645] mb-6 text-center" style={serif}>Board Exam Toppers 2023–24</h3>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-14">
            {TOPPERS.map(top => (
              <div key={top.name} className={`rounded-2xl overflow-hidden text-center shadow-md border ${top.topper ? 'border-amber-300' : 'border-border'}`}>
                {top.topper && <div className="bg-amber-500 text-white text-xs font-bold py-1.5 tracking-wide uppercase">School Topper</div>}
                <div className="p-6">
                  <img
                    src={`https://images.unsplash.com/${top.image}?w=150&h=150&fit=crop&auto=format`}
                    alt={top.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-blue-100"
                  />
                  <div className="font-bold text-[#0F2645]" style={serif}>{top.name}</div>
                  <div className="text-muted-foreground text-xs mb-2">{top.grade}</div>
                  <div className="text-2xl font-bold text-[#1B4F8A]" style={serif}>{top.score}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { award: 'Best CBSE School – Bokaro', body: 'Jharkhand Education Board, 2023' },
              { award: 'Excellence in Sports', body: 'District Sports Council, 2024' },
              { award: 'Smart School Award', body: 'CBSE Regional Level, 2023' },
              { award: 'Community Impact Award', body: 'Bokaro Municipal Corp, 2024' },
            ].map(a => (
              <div key={a.award} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200 text-center">
                <Trophy size={22} className="text-amber-500 mx-auto mb-3" />
                <div className="font-bold text-[#0F2645] text-sm mb-1">{a.award}</div>
                <div className="text-muted-foreground text-xs">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. GALLERY ──────────────────────────────── */}
      <section id="gallery" className="py-24 bg-[#F2F6FF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <SectionLabel>Life at AKPS</SectionLabel>
            <SectionHeading>Photo Gallery</SectionHeading>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'campus', 'classrooms', 'sports', 'events'].map(filter => (
              <button key={filter} onClick={() => setGalleryFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                  galleryFilter === filter
                    ? 'bg-[#1B4F8A] text-white shadow-md'
                    : 'bg-white text-[#0F2645] border border-border hover:border-[#1B4F8A]'
                }`}>
                {filter === 'all' ? 'All Photos' : filter}
              </button>
            ))}
          </div>
          <div className="columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredGallery.map(item => (
              <div key={item.id} className="break-inside-avoid group overflow-hidden rounded-2xl relative bg-blue-200">
                <img
                  src={`https://images.unsplash.com/${item.image}?w=600&h=${item.tall ? 500 : 320}&fit=crop&auto=format`}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-[#1B4F8A] text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Play size={18} /> Watch Video Tour
            </button>
            <button className="border-2 border-[#1B4F8A] text-[#1B4F8A] font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ── 15. NEWS & EVENTS ────────────────────────── */}
      <section id="events" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Stay Updated</SectionLabel>
            <SectionHeading>News & Events</SectionHeading>
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F2645] text-xl" style={serif}>Latest News</h3>
                <button onClick={() => setShowCalendar(true)} className="text-[#1B4F8A] text-sm font-semibold hover:underline flex items-center gap-1">
                  <Calendar size={14} /> Academic Calendar
                </button>
              </div>
              {NEWS.map((news, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex gap-4">
                  <img
                    src={`https://images.unsplash.com/${news.img}?w=120&h=90&fit=crop&auto=format`}
                    alt={news.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-blue-100 text-[#1B4F8A] text-xs font-semibold px-2 py-0.5 rounded-full">{news.tag}</span>
                      <span className="text-muted-foreground text-xs">{news.date}</span>
                    </div>
                    <h4 className="font-bold text-[#0F2645] mb-1 leading-snug text-sm">{news.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{news.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#0F2645] text-xl" style={serif}>Upcoming Events</h3>
                <button onClick={() => setShowCalendar(true)} className="text-[#1B4F8A] text-sm font-semibold hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {EVENTS_DATA.map((ev, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-border shadow-sm flex items-center gap-4">
                    <div className="w-14 flex-shrink-0 text-center bg-[#1B4F8A] text-white rounded-xl py-2.5">
                      <div className="text-xl font-bold leading-none" style={serif}>{ev.day}</div>
                      <div className="text-[10px] text-blue-200 uppercase mt-0.5">{ev.month}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F2645] text-sm">{ev.title}</div>
                      <div className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                        <Clock size={11} /> {ev.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 16. TESTIMONIALS ─────────────────────────── */}
      <section className="py-24 bg-[#0F2645] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Voices</div>
            <SectionHeading light>What Our Community Says</SectionHeading>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 text-center">
              <div className="flex justify-center mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xl text-blue-100 leading-relaxed mb-8 italic" style={serif}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <img
                src={`https://images.unsplash.com/${t.image}?w=100&h=100&fit=crop&auto=format`}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-amber-400"
              />
              <div className="font-bold text-white">{t.name}</div>
              <div className="text-blue-300 text-sm mt-0.5">{t.role}</div>
            </div>
            <div className="flex justify-center items-center gap-3 mt-8">
              <button onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors">
                <ChevronLeft size={18} />
              </button>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === testimonialIdx ? 'bg-amber-400 w-6' : 'bg-white/40 w-2'}`} />
              ))}
              <button onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 17. FAQ ──────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Help</SectionLabel>
            <SectionHeading>Frequently Asked Questions</SectionHeading>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-[#0F2645] pr-4 text-sm leading-snug">{faq.q}</span>
                  <ChevronDown size={18} className={`text-[#1B4F8A] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 18. CONTACT ──────────────────────────────── */}
      <section id="contact" className="py-24 bg-[#F2F6FF]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>Reach Us</SectionLabel>
            <SectionHeading>Contact & Enquiry</SectionHeading>
            <p className="text-muted-foreground mt-3">We are located at Karbala Road, Sultan Nagar, Chas, Bokaro</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
              <h3 className="font-bold text-[#0F2645] text-xl mb-6" style={serif}>Send an Enquiry</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2645] mb-1.5">Full Name *</label>
                    <input type="text" placeholder="Your name"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-input-background"
                      value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2645] mb-1.5">Phone / WhatsApp *</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-input-background"
                      value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2645] mb-1.5">Email Address</label>
                  <input type="email" placeholder="your@email.com"
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-input-background"
                    value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2645] mb-1.5">Class Applying For</label>
                  <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-input-background text-foreground"
                    value={form.grade} onChange={e => setForm(p => ({ ...p, grade: e.target.value }))}>
                    <option value="">Select class</option>
                    {['Play Group', 'Nursery', 'LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F2645] mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Your questions or comments..."
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] bg-input-background resize-none"
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                </div>
                <button className="w-full bg-[#1B4F8A] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors">
                  Submit Enquiry
                </button>
              </div>
            </div>

            <div>
              <div className="rounded-2xl overflow-hidden h-56 bg-blue-200 mb-6 relative">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&h=300&fit=crop&auto=format"
                  alt="Bokaro, Jharkhand"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-xl text-center">
                    <MapPin size={20} className="text-[#1B4F8A] mx-auto mb-1" />
                    <div className="text-sm font-bold text-[#0F2645]">A K Public School</div>
                    <div className="text-xs text-muted-foreground">Karbala Road, Sultan Nagar, Chas</div>
                    <div className="text-xs text-muted-foreground">Bokaro, Jharkhand – 827013</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { Icon: MapPin, label: 'Address', value: SCHOOL.address },
                  { Icon: Phone, label: 'Phone / WhatsApp', value: SCHOOL.phone },
                  { Icon: Mail, label: 'Email', value: SCHOOL.email },
                  { Icon: Mail, label: 'Alt. Email', value: SCHOOL.email2 },
                  { Icon: Clock, label: 'Office Hours', value: 'Mon – Sat: 8:00 AM – 5:00 PM' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-blue-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={17} className="text-[#1B4F8A]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</div>
                      <div className="text-sm font-medium text-[#0F2645] mt-0.5">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/${SCHOOL.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={18} /> Chat on WhatsApp: {SCHOOL.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 19. FINAL CTA ────────────────────────────── */}
      <section className="bg-amber-500 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1D3A] mb-4" style={serif}>
            Give Your Child the Best Start.
          </h2>
          <p className="text-[#0B1D3A]/80 text-xl mb-3">
            Admissions are now open for {SCHOOL.year}. Montessori to Class 11.
          </p>
          <p className="text-[#0B1D3A]/60 text-sm mb-10">
            A K Public School · Karbala Road, Sultan Nagar, Chas, Bokaro · +91 82100 00154
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollTo('#contact')}
              className="bg-[#0B1D3A] hover:bg-[#1B4F8A] text-white font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg flex items-center gap-2">
              Apply Now <ArrowRight size={20} />
            </button>
            <a href={`https://wa.me/${SCHOOL.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="border-2 border-[#0B1D3A] text-[#0B1D3A] font-bold px-10 py-4 rounded-xl text-lg hover:bg-[#0B1D3A] hover:text-white transition-all flex items-center gap-2">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── 20. FOOTER ───────────────────────────────── */}
      <footer className="bg-[#0B1D3A] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-[#0B1D3A] text-base" style={serif}>AK</div>
                <div>
                  <div className="font-bold text-white" style={serif}>A K Public School</div>
                  <div className="text-xs text-blue-300">CBSE · Montessori to Class 12 · Bokaro</div>
                </div>
              </div>
              <p className="text-blue-300 text-sm leading-relaxed mb-5 max-w-xs">
                Nurturing curious minds and building confident leaders in Chas, Bokaro, Jharkhand since {SCHOOL.est}.
              </p>
              <div className="flex gap-2 mb-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              <div className="text-xs text-blue-400 space-y-1">
                <div>{SCHOOL.affiliation}</div>
                <div>Affiliated to CBSE, New Delhi</div>
              </div>
            </div>

            <div>
              <div className="font-bold text-white text-sm uppercase tracking-wide mb-4">Quick Links</div>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Academics', 'Admissions', 'Faculty', 'Gallery', 'Events', 'Contact'].map(l => (
                  <li key={l}><a href="#" className="text-blue-300 hover:text-amber-400 text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold text-white text-sm uppercase tracking-wide mb-4">Academics</div>
              <ul className="space-y-2">
                {['Montessori', 'Pre-Primary', 'Primary (1–5)', 'Middle School (6–8)', 'Secondary (9–10)', 'Senior Secondary (11–12)', 'CBSE Curriculum', 'Academic Calendar'].map(l => (
                  <li key={l}>
                    {l === 'Academic Calendar'
                      ? <button onClick={() => setShowCalendar(true)} className="text-blue-300 hover:text-amber-400 text-sm transition-colors text-left">{l}</button>
                      : <a href="#" className="text-blue-300 hover:text-amber-400 text-sm transition-colors">{l}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold text-white text-sm uppercase tracking-wide mb-4">Parent Resources</div>
              <ul className="space-y-2 mb-5">
                {[
                  { label: 'Fee Structure', action: () => setShowFee(true) },
                  { label: 'Syllabus Download', action: () => setShowSyllabus(true) },
                  { label: 'Academic Calendar', action: () => setShowCalendar(true) },
                  { label: 'Circulars', action: null },
                  { label: 'TC Request', action: null },
                  { label: 'Transport Routes', action: null },
                ].map(({ label, action }) => (
                  <li key={label}>
                    {action
                      ? <button onClick={action} className="text-blue-300 hover:text-amber-400 text-sm transition-colors text-left">{label}</button>
                      : <a href="#" className="text-blue-300 hover:text-amber-400 text-sm transition-colors">{label}</a>
                    }
                  </li>
                ))}
              </ul>
              <div className="space-y-1.5">
                <a href={`tel:${SCHOOL.phone}`} className="flex items-center gap-2 text-blue-300 hover:text-amber-400 text-sm transition-colors">
                  <Phone size={12} /> {SCHOOL.phone}
                </a>
                <a href={`mailto:${SCHOOL.email}`} className="flex items-center gap-2 text-blue-300 hover:text-amber-400 text-sm transition-colors">
                  <Mail size={12} /> {SCHOOL.email}
                </a>
                <div className="flex items-start gap-2 text-blue-300 text-sm mt-2">
                  <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">Karbala Road, Sultan Nagar, Chas, Bokaro, JH – 827013</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
            <div>© 2025 A K Public School, Bokaro. All rights reserved.</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
