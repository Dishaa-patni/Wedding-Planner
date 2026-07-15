'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Heart, Users, ClipboardList, Store, CheckSquare, Wallet, CalendarDays,
  Sparkles, Menu, X, Check, Star, ArrowRight, ChevronRight, Play, Shield,
  TrendingUp, Bell, Flower2, Upload, CalendarClock, UserCheck, Flower,
  BellRing, IndianRupee, FileSpreadsheet
} from 'lucide-react'
import { FloralCorner } from '@/components/floral'

/* ============================================================
   Data
============================================================ */
const weddingImages = [
  { src: 'https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Haldi' },
  { src: 'https://images.pexels.com/photos/32315685/pexels-photo-32315685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Mehendi' },
  { src: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Mandap Ceremony' },
  { src: 'https://images.pexels.com/photos/35069916/pexels-photo-35069916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Reception' },
  { src: 'https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Couple Portrait' },
  { src: 'https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Wedding Decoration' },
]

const features = [
  { icon: Heart, title: 'Wedding Management', desc: 'Orchestrate every event — from haldi and mehendi to the reception — with one unified master plan.', tag: 'Core' },
  { icon: Users, title: 'Team Management', desc: 'Assign planners, coordinators & assistants. Track tasks, shifts, and performance in real time.', tag: 'Ops' },
  { icon: ClipboardList, title: 'Guest Management', desc: 'RSVPs, meal preferences, seating, and accommodations — all beautifully organized.', tag: 'Guests' },
  { icon: FileSpreadsheet, title: 'Guest CSV Upload', desc: 'Import thousands of guests from a spreadsheet in seconds. Auto-detect names, phones and dietary tags.', tag: 'Import' },
  { icon: Store, title: 'Vendor Management', desc: 'Curated vendor directory, contracts, bookings & performance ratings in one place.', tag: 'Vendors' },
  { icon: Wallet, title: 'Payment Tracking', desc: 'Invoices, milestones, vendor payouts and client dues — with automatic reminders.', tag: 'Finance' },
  { icon: CalendarDays, title: 'Timeline', desc: 'A visual master timeline for every ritual, cue and vendor call across the wedding weekend.', tag: 'Schedule' },
  { icon: CheckSquare, title: 'Task Tracking', desc: 'Kanban boards, deadlines and dependencies keep every wedding running like clockwork.', tag: 'Productivity' },
]

const testimonials = [
  {
    name: 'Ananya Kapoor', role: 'Founder, Saat Phere Weddings',
    quote: 'Vivaha replaced 6 different tools we used for destination weddings. Our team saves 20+ hours every week and clients feel the difference.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Ananya+Kapoor&background=B76E79&color=fff&size=128'
  },
  {
    name: 'Rohan Mehta', role: 'CEO, The Baraat Company',
    quote: 'The payment tracking alone paid for our subscription in the first month. Beautiful, thoughtful software built by people who understand weddings.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=D8B26E&color=fff&size=128'
  },
  {
    name: 'Isha Reddy', role: 'Head Planner, Marigold Events',
    quote: 'From vendor coordination to guest RSVPs, everything just flows. It feels less like software and more like a very capable second-in-command.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Isha+Reddy&background=B76E79&color=fff&size=128'
  },
]

const pricingPlans = [
  { name: 'Starter', price: '₹2,999', period: '/mo', tagline: 'For boutique planners',
    features: ['Up to 5 active weddings', '3 team members', 'Basic vendor directory', 'Guest & task management', 'Email support'], highlight: false },
  { name: 'Studio', price: '₹7,999', period: '/mo', tagline: 'Most loved by growing studios',
    features: ['Up to 25 active weddings', '15 team members', 'Advanced vendor CRM', 'Payment tracking & invoicing', 'Client portal', 'Priority support'], highlight: true },
  { name: 'Enterprise', price: 'Custom', period: '', tagline: 'For destination wedding houses',
    features: ['Unlimited weddings & team', 'Custom integrations', 'Dedicated success manager', 'White-label client portal', 'SLA & onboarding'], highlight: false },
]

const faqs = [
  { q: 'Is Vivaha built specifically for Indian weddings?', a: 'Yes — while it works beautifully for any wedding, every workflow (haldi, mehendi, sangeet, pheras, reception) is a first-class citizen. Vendor categories, ritual templates and payment structures are tuned for the Indian market.' },
  { q: 'Can my whole team collaborate inside a single wedding?', a: 'Absolutely. Invite planners, coordinators, and assistants with granular roles. Everyone sees the same timeline, tasks and vendor conversations — updated in real time.' },
  { q: 'How do you handle client payments and vendor payouts?', a: 'You can define milestone-based invoicing, take advance payments online, and schedule automatic vendor payouts. Clients get a beautiful branded portal to pay you.' },
  { q: 'Can I import my guest list from a spreadsheet?', a: 'Yes. Upload a CSV or Excel file with any column layout — Vivaha auto-detects names, phone numbers, dietary preferences and RSVP status. Thousands of guests in under a minute.' },
  { q: 'Is my clients\' data safe?', a: 'Yes. All data is encrypted in transit and at rest, hosted on ISO-27001 certified infrastructure. Only you and your invited team members can access your weddings.' },
  { q: 'Can I try it before I pay?', a: '14-day free trial, no credit card required. See a full working dashboard with sample weddings the moment you sign up.' },
]

/* ============================================================
   Petal shower — teardrop petals only, soft & luxurious
============================================================ */
function Petals() {
  const [petals, setPetals] = useState([])
  useEffect(() => {
    const palette = ['#EAC7CE', '#F6DDE1', '#FBE9CF', '#D8B26E', '#F0D6D6', '#FADCDE', '#E7B7B0', '#F5CBD1']
    const arr = Array.from({ length: 38 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 22,
      duration: 20 + Math.random() * 22,
      size: 12 + Math.random() * 20,
      hue: palette[Math.floor(Math.random() * palette.length)],
      hue2: palette[Math.floor(Math.random() * palette.length)],
      swayX: 30 + Math.random() * 140,
      opacity: 0.4 + Math.random() * 0.4,
      variant: i % 3,
      tilt: Math.random() * 60 - 30,
    }))
    setPetals(arr)
  }, [])

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map(p => {
        const style = {
          left: `${p.left}%`,
          width: `${p.size}px`,
          height: `${p.size * 1.35}px`,
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration}s`,
          '--sway-x': `${p.swayX}px`,
          opacity: p.opacity,
          transform: `rotate(${p.tilt}deg)`,
        }
        if (p.variant === 0) {
          // Classic teardrop petal with subtle gradient
          return (
            <svg key={p.id} viewBox="0 0 24 32" className="petal" style={style}>
              <defs>
                <linearGradient id={`pg-${p.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={p.hue2} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={p.hue} stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M12 1 C 19 9, 22 18, 12 31 C 2 18, 5 9, 12 1 Z" fill={`url(#pg-${p.id})`} />
              <path d="M12 4 C 15 12, 15 20, 12 28" stroke={p.hue2} strokeWidth="0.5" fill="none" opacity="0.5" />
            </svg>
          )
        }
        if (p.variant === 1) {
          // Curved rose-petal shape
          return (
            <svg key={p.id} viewBox="0 0 28 32" className="petal" style={style}>
              <defs>
                <linearGradient id={`pg-${p.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={p.hue2} stopOpacity="0.85" />
                  <stop offset="100%" stopColor={p.hue} stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M14 2 C 24 8, 26 20, 20 30 C 15 26, 10 26, 6 30 C 2 22, 6 10, 14 2 Z" fill={`url(#pg-${p.id})`} />
              <path d="M14 5 C 16 12, 15 22, 13 28" stroke={p.hue2} strokeWidth="0.4" fill="none" opacity="0.4" />
            </svg>
          )
        }
        // Elongated slender petal
        return (
          <svg key={p.id} viewBox="0 0 20 36" className="petal" style={style}>
            <defs>
              <linearGradient id={`pg-${p.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={p.hue2} stopOpacity="0.85" />
                <stop offset="100%" stopColor={p.hue} stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d="M10 1 C 17 12, 16 24, 10 35 C 4 24, 3 12, 10 1 Z" fill={`url(#pg-${p.id})`} />
          </svg>
        )
      })}
    </div>
  )
}

/* ============================================================
   Navbar
============================================================ */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features', label: 'Features' },
    { href: '#dashboard', label: 'Dashboard' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`glass rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between transition-all duration-500 ${scrolled ? 'shadow-lg' : ''}`}>
          {/* Brand LEFT */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full gradient-rose flex items-center justify-center shadow-md">
              <Flower2 className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl text-[#B76E79]">Vivaha</div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-foreground/50 -mt-0.5 hidden sm:block">Wedding OS</div>
            </div>
          </a>

          {/* Menu links center */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="px-3 py-2 text-sm text-foreground/75 hover:text-[#B76E79] rounded-lg hover:bg-white/60 transition">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex text-foreground/80 hover:text-[#B76E79] hover:bg-white/60 rounded-full">
              Login
            </Button>
            <Button className="bg-[#B76E79] hover:bg-[#a55e69] text-white shadow-md hover:shadow-lg transition-all rounded-full px-4 md:px-5">
              Start Free Trial <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <button className="lg:hidden p-2 text-foreground/80" onClick={() => setOpen(!open)} aria-label="menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3 space-y-1"
            >
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm rounded-lg hover:bg-white/70 hover:text-[#B76E79]">
                  {l.label}
                </a>
              ))}
              <a href="#" className="block px-4 py-2.5 text-sm rounded-lg hover:bg-white/70 hover:text-[#B76E79]">Login</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

/* ============================================================
   Hero — headline + floating widgets around wedding image
============================================================ */
function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % weddingImages.length), 3800)
    return () => clearInterval(t)
  }, [])

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -30])
  const floralY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28">
      {/* Background florals now come from the site-wide bg image; keep hero clean */}

      {/* subtle radial glow */}
      <div aria-hidden className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(1000px 500px at 15% 20%, rgba(216,178,110,0.10), transparent 60%), radial-gradient(900px 500px at 85% 30%, rgba(234,199,206,0.20), transparent 60%)' }} />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <motion.div
            style={{ y: yLeft }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-7 relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs md:text-sm text-foreground/75 mb-6 border border-[#EAC7CE]/60"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" />
              <span className="tracking-wide">Built for Modern Wedding Planners</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] leading-[1.05] tracking-tight text-foreground">
              Plan, Manage <span className="gradient-text">& Celebrate</span><br className="hidden md:block"/>
              Weddings <span className="italic text-[#B76E79]">Effortlessly</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/70 max-w-xl">
              From the first client meeting to the final celebration, manage every wedding, team, vendor, task and payment in one beautiful workspace.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-[#B76E79] hover:bg-[#a55e69] text-white rounded-full px-7 py-6 text-base shadow-lg hover:shadow-xl transition-all group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-7 py-6 text-base border-[#B76E79]/40 text-[#B76E79] hover:bg-[#B76E79]/10 hover:text-[#B76E79] bg-white/50 backdrop-blur">
                <Play className="mr-2 h-4 w-4" />
                View Live Demo
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 md:gap-8">
              <div className="flex -space-x-3">
                {['Ananya+K','Rohan+M','Isha+R','Vikram+S'].map((n,i)=>(
                  <img key={i} src={`https://ui-avatars.com/api/?name=${n}&background=${i%2?'D8B26E':'B76E79'}&color=fff&size=64`} className="w-9 h-9 rounded-full border-2 border-white shadow" alt=""/>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-current"/>)}
                  <span className="ml-1 text-foreground/80 font-medium">4.9</span>
                </div>
                <div className="text-foreground/60">Loved by 500+ planning studios</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Wedding image + floating UI widgets */}
          <motion.div
            style={{ y: yRight }}
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto w-full max-w-[420px] h-[540px] md:h-[580px]">
              {/* Glow */}
              <div className="absolute -inset-8 -z-10">
                <div className="absolute top-4 -left-6 w-40 h-40 rounded-full bg-[#EAC7CE]/45 blur-3xl"/>
                <div className="absolute -bottom-6 -right-6 w-56 h-56 rounded-full bg-[#D8B26E]/35 blur-3xl"/>
              </div>

              {/* Central glass card with carousel */}
              <div className="absolute inset-x-8 top-6 bottom-16 float-slow">
                <div className="glass-strong rounded-[1.75rem] p-3 h-full">
                  <div className="relative rounded-[1.35rem] overflow-hidden h-full shadow-inner">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={idx}
                        src={weddingImages[idx].src}
                        alt={weddingImages[idx].label}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 1 }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                    {/* Ribbon */}
                    <div className="absolute top-3 left-3">
                      <div className="glass px-2.5 py-1 rounded-full text-[10px] text-foreground/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B76E79] animate-pulse" /> Live board
                      </div>
                    </div>

                    {/* Bottom label + dots */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                      <div className="text-white drop-shadow">
                        <div className="text-[9px] tracking-[0.25em] uppercase opacity-80">Now Showing</div>
                        <div className="font-display text-lg md:text-xl leading-tight">{weddingImages[idx].label}</div>
                      </div>
                      <div className="flex gap-1">
                        {weddingImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIdx(i)}
                            className={`h-1 rounded-full transition-all ${i===idx ? 'w-4 bg-white' : 'w-1 bg-white/50 hover:bg-white/80'}`}
                            aria-label={`slide ${i+1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating widgets */}
              {/* 1. Upcoming Ceremony — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-3 md:-left-8 top-2 glass rounded-2xl px-3.5 py-2.5 shadow-xl w-[190px] z-20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#EAC7CE] flex items-center justify-center flex-shrink-0">
                      <CalendarClock className="w-4 h-4 text-[#B76E79]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] uppercase tracking-widest text-foreground/50">Upcoming Ceremony</div>
                      <div className="text-xs font-semibold truncate">Aditi & Karthik</div>
                      <div className="text-[10px] text-foreground/60">28 Dec · Udaipur</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 2. Guests Confirmed — top right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute -right-2 md:-right-6 top-24 glass rounded-2xl px-3.5 py-2.5 shadow-xl w-[170px] z-20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FBE9CF] flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-4 h-4 text-[#B08750]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] uppercase tracking-widest text-foreground/50">Guests Confirmed</div>
                      <div className="text-sm font-display text-[#B76E79]">312<span className="text-[10px] text-foreground/50">/320</span></div>
                      <div className="h-1 mt-1 bg-foreground/10 rounded-full overflow-hidden">
                        <div className="h-full w-[97%] gradient-rose"/>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 3. Vendor Reminder — left middle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 glass rounded-2xl px-3.5 py-2.5 shadow-xl w-[180px] z-20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F6DDE1] flex items-center justify-center flex-shrink-0">
                      <Flower className="w-4 h-4 text-[#B76E79]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] uppercase tracking-widest text-foreground/50">Vendor Reminder</div>
                      <div className="text-xs font-semibold">Florist call</div>
                      <div className="text-[10px] text-foreground/60">Today · 4:00 PM</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 4. Team Assigned — right middle */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="absolute -right-4 md:-right-10 top-[58%] glass rounded-2xl px-3.5 py-2.5 shadow-xl w-[180px] z-20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E6EEDD] flex items-center justify-center flex-shrink-0">
                      <CheckSquare className="w-4 h-4 text-[#6E8B6A]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] uppercase tracking-widest text-foreground/50">Team Assigned</div>
                      <div className="text-xs font-semibold">Priya + 4 coordinators</div>
                      <div className="flex -space-x-1.5 mt-1">
                        {['Priya','Aarav','Neha','Rahul','Mira'].map((n,k)=>(
                          <img key={k} alt="" src={`https://ui-avatars.com/api/?name=${n}&background=${k%2?'D8B26E':'B76E79'}&color=fff&size=48`} className="w-5 h-5 rounded-full border border-white"/>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* 5. Pending Payment — bottom center */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 glass rounded-2xl px-4 py-3 shadow-xl w-[240px] z-20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FBE9CF] flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-[#B08750]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-foreground/50">Pending Payment</div>
                        <div className="font-display text-lg text-[#B76E79] leading-none mt-0.5">₹2,40,000</div>
                        <div className="text-[10px] text-foreground/60">Due in 3 days</div>
                      </div>
                    </div>
                    <Button size="sm" className="h-7 px-3 rounded-full bg-[#B76E79] hover:bg-[#a55e69] text-white text-[10px]">
                      Remind
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Trusted strip
============================================================ */
function TrustedStrip() {
  const items = ['Saat Phere Studio', 'Marigold Events', 'The Baraat Co.', 'Shubh Muhurat', 'Anaya Weddings', 'Sindoor & Silk', 'Regal Rituals']
  return (
    <section className="relative py-10 border-y border-[#EAC7CE]/30 bg-white/40 backdrop-blur">
      <div className="container mx-auto px-6">
        <div className="text-center text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6">Trusted by boutique wedding studios across India</div>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-80">
          {items.map((n,i)=>(
            <div key={i} className="font-display text-lg md:text-xl text-foreground/60 hover:text-[#B76E79] transition-colors">{n}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Features
============================================================ */
function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
            <Sparkles className="h-3 w-3 text-[#B76E79]" /> Everything you need. Nothing you don't.
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            A single, <span className="gradient-text">graceful workspace</span><br/> for the entire wedding
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
          <p className="mt-6 text-foreground/70 text-lg">
            Eight thoughtfully designed modules that replace the chaos of spreadsheets, WhatsApp groups and sticky notes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <Card className="h-full group relative overflow-hidden glass border-white/70 rounded-2xl p-6 md:p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl gradient-rose flex items-center justify-center shadow-lg shadow-[#B76E79]/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline" className="border-[#B76E79]/30 text-[#B76E79] bg-white/60 text-[10px] tracking-widest uppercase">{f.tag}</Badge>
                  </div>
                  <h3 className="font-display text-2xl mt-5 text-foreground">{f.title}</h3>
                  <p className="mt-2 text-foreground/65 leading-relaxed">{f.desc}</p>
                  <div className="mt-5 flex items-center text-sm text-[#B76E79] gap-1 opacity-70 group-hover:opacity-100 transition">
                    Learn more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Dashboard preview
============================================================ */
function DashboardPreview() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="dashboard" className="relative py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(700px 400px at 50% 20%, rgba(183,110,121,0.08), transparent 70%)' }} />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
            <ClipboardList className="h-3 w-3 text-[#B76E79]" /> Live Dashboard
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            One dashboard.<br/> <span className="gradient-text">Every wedding, at a glance.</span>
          </h2>
          <p className="mt-5 text-foreground/70 text-lg">A calm, focused command center that surfaces exactly what needs your attention today.</p>
        </motion.div>

        <motion.div ref={ref} style={{ y }} className="relative">
          <div className="glass-strong rounded-3xl p-4 md:p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#B76E79]/70"/>
                <span className="w-3 h-3 rounded-full bg-[#D8B26E]/70"/>
                <span className="w-3 h-3 rounded-full bg-[#EAC7CE]"/>
              </div>
              <div className="ml-3 text-xs text-foreground/50">vivaha.app / dashboard</div>
            </div>

            <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white/80 rounded-2xl p-5 border border-white">
                  <div className="text-xs uppercase tracking-widest text-foreground/50">Upcoming Wedding</div>
                  <div className="font-display text-2xl mt-1">Aditi & Karthik</div>
                  <div className="text-sm text-foreground/60 mt-1">28 Dec · Udaipur · 320 guests</div>
                  <div className="mt-4 h-2 bg-[#B76E79]/10 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] gradient-rose rounded-full" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-foreground/60">
                    <span>72% planned</span><span>28 days to go</span>
                  </div>
                </div>

                <div className="bg-white/80 rounded-2xl p-5 border border-white">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-foreground/50">Payments</div>
                    <Wallet className="h-4 w-4 text-[#B76E79]"/>
                  </div>
                  <div className="font-display text-3xl mt-1 text-[#B76E79]">₹18.4L</div>
                  <div className="text-xs text-foreground/60">Tracked this month · <span className="text-emerald-600">+24%</span></div>
                  <div className="mt-4 grid grid-cols-12 gap-1 h-16 items-end">
                    {[40,65,55,80,45,90,60,72,88,50,70,95].map((h,i)=>(
                      <div key={i} className="rounded-t bg-gradient-to-t from-[#D8B26E]/50 to-[#B76E79]/80" style={{ height: `${h}%`}}/>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/80 rounded-2xl p-5 border border-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-foreground/50">Wedding Timeline</div>
                    <div className="font-display text-xl">Aditi & Karthik · Day 2</div>
                  </div>
                  <Badge className="bg-[#B76E79]/10 text-[#B76E79] hover:bg-[#B76E79]/15 border-0">On Track</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { t: '07:00', e: 'Haldi ceremony · Poolside', c: 'bg-[#F5D571]', done: true },
                    { t: '11:30', e: 'Mehendi artists arrive', c: 'bg-[#B76E79]', done: true },
                    { t: '16:00', e: 'Sangeet rehearsal', c: 'bg-[#D8B26E]', done: false },
                    { t: '19:30', e: 'Cocktail dinner setup', c: 'bg-[#EAC7CE]', done: false },
                  ].map((r,i)=>(
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-xs w-12 text-foreground/60">{r.t}</div>
                      <div className={`w-2.5 h-2.5 rounded-full ${r.c}`}/>
                      <div className="flex-1 text-sm">{r.e}</div>
                      {r.done ? <Check className="h-4 w-4 text-emerald-600"/> : <div className="h-4 w-4 rounded-full border border-foreground/20"/>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white/80 rounded-2xl p-5 border border-white">
                  <div className="text-xs uppercase tracking-widest text-foreground/50">Team on duty</div>
                  <div className="mt-3 space-y-3">
                    {[
                      { n: 'Priya', r: 'Lead Planner', c: 'B76E79' },
                      { n: 'Aarav', r: 'Vendor Lead', c: 'D8B26E' },
                      { n: 'Neha', r: 'Guest Desk', c: 'EAC7CE' },
                    ].map((m,i)=>(
                      <div key={i} className="flex items-center gap-3">
                        <img alt="" src={`https://ui-avatars.com/api/?name=${m.n}&background=${m.c}&color=fff&size=64`} className="w-9 h-9 rounded-full"/>
                        <div>
                          <div className="text-sm font-medium">{m.n}</div>
                          <div className="text-xs text-foreground/60">{m.r}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/80 rounded-2xl p-5 border border-white">
                  <div className="text-xs uppercase tracking-widest text-foreground/50">Guest RSVPs</div>
                  <div className="font-display text-3xl mt-1">312<span className="text-base text-foreground/50">/320</span></div>
                  <div className="mt-3 h-2 rounded-full bg-foreground/10 overflow-hidden">
                    <div className="h-full w-[97%] gradient-rose"/>
                  </div>
                  <div className="mt-2 text-xs text-foreground/60">97% confirmed · 5 pending</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}
            className="hidden md:block absolute -top-6 -right-4 glass rounded-2xl px-4 py-2.5 shadow-lg"
          >
            <div className="text-xs text-foreground/60">Auto-synced with</div>
            <div className="text-sm font-medium">Google Calendar & WhatsApp</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   CSV Upload highlight section
============================================================ */
function CSVSection() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
              <Upload className="h-3 w-3 text-[#B76E79]" /> Guest CSV Upload
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Bring in your entire<br/> guest list <span className="gradient-text">in seconds</span>
            </h2>
            <p className="mt-5 text-foreground/70 text-lg max-w-lg">
              Drop a CSV or Excel — Vivaha auto-detects names, phone numbers, dietary tags, plus-ones and RSVP status. Send elegant invites right after.
            </p>
            <ul className="mt-6 space-y-3">
              {['Smart column detection','WhatsApp invitations in one click','Duplicate & error auto-cleanup','Meal & seating preferences imported'].map((t,i)=>(
                <li key={i} className="flex gap-2.5 text-sm">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-[#B76E79]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-[#B76E79]"/>
                  </div>
                  <span className="text-foreground/75">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="border-2 border-dashed border-[#B76E79]/30 rounded-2xl p-8 text-center bg-white/60">
                <div className="w-14 h-14 rounded-full gradient-rose mx-auto flex items-center justify-center shadow-lg">
                  <Upload className="h-6 w-6 text-white"/>
                </div>
                <div className="font-display text-xl mt-4">Drop your guest list here</div>
                <div className="text-sm text-foreground/60 mt-1">CSV, XLS or XLSX · up to 20,000 rows</div>
                <Button className="mt-5 rounded-full bg-[#B76E79] hover:bg-[#a55e69] text-white px-6">
                  Browse files
                </Button>
              </div>

              <div className="mt-5 space-y-2">
                <div className="text-xs uppercase tracking-widest text-foreground/50">Recent imports</div>
                {[
                  { n: 'aditi_karthik_guests.csv', c: '312 rows', ok: true },
                  { n: 'reception_extended.xlsx', c: '184 rows', ok: true },
                  { n: 'sangeet_family.csv', c: '96 rows', ok: true },
                ].map((r,i)=>(
                  <div key={i} className="flex items-center gap-3 bg-white/70 rounded-xl px-3 py-2.5 border border-white/70">
                    <div className="w-8 h-8 rounded-lg bg-[#FBE9CF] flex items-center justify-center">
                      <FileSpreadsheet className="h-4 w-4 text-[#B08750]"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{r.n}</div>
                      <div className="text-[10px] text-foreground/50">{r.c} imported</div>
                    </div>
                    <Check className="h-4 w-4 text-emerald-600"/>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Testimonials
============================================================ */
function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Trusted by the <span className="gradient-text">planners</span> who make magic
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t,i)=>(
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i*0.1 }}
            >
              <Card className="glass rounded-2xl p-7 h-full border-white/70 relative overflow-hidden">
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_,k)=><Star key={k} className="h-4 w-4 fill-current"/>)}
                </div>
                <p className="text-foreground/80 leading-relaxed text-[15px]">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full ring-2 ring-white shadow"/>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-foreground/60">{t.role}</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 font-display text-6xl text-[#B76E79]/15 leading-none select-none">“</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Pricing
============================================================ */
function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Simple, <span className="gradient-text">graceful pricing</span>
          </h2>
          <p className="mt-5 text-foreground/70 text-lg">Pick a plan that fits your studio. Cancel anytime. No credit card required for the 14-day trial.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((p,i)=>(
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i*0.1 }}
              className={`relative ${p.highlight ? 'md:-mt-4' : ''}`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-[#B76E79] hover:bg-[#B76E79] text-white shadow-lg px-3 py-1 rounded-full">Most Popular</Badge>
                </div>
              )}
              <Card className={`rounded-2xl p-8 h-full transition-all ${p.highlight ? 'glass-strong border-[#B76E79]/30 shadow-2xl' : 'glass border-white/70'} hover:-translate-y-1`}>
                <div className="text-xs uppercase tracking-widest text-foreground/50">{p.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-5xl text-foreground">{p.price}</span>
                  <span className="text-foreground/60">{p.period}</span>
                </div>
                <p className="mt-2 text-sm text-foreground/60">{p.tagline}</p>
                <div className="gold-divider my-6" />
                <ul className="space-y-3">
                  {p.features.map((f,k)=>(
                    <li key={k} className="flex gap-3 text-sm">
                      <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${p.highlight ? 'bg-[#B76E79] text-white' : 'bg-[#B76E79]/10 text-[#B76E79]'}`}>
                        <Check className="h-3 w-3"/>
                      </div>
                      <span className="text-foreground/75">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full mt-8 rounded-full py-6 ${p.highlight ? 'bg-[#B76E79] hover:bg-[#a55e69] text-white shadow-lg' : 'bg-white/80 hover:bg-white text-[#B76E79] border border-[#B76E79]/30'}`}>
                  {p.name === 'Enterprise' ? 'Talk to Sales' : 'Start Free Trial'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FAQ
============================================================ */
function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Questions? <span className="gradient-text">We have answers.</span>
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
        </motion.div>

        <div className="glass rounded-2xl p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f,i)=>(
              <AccordionItem key={i} value={`item-${i}`} className="border-[#B76E79]/10">
                <AccordionTrigger className="text-left font-display text-lg md:text-xl hover:text-[#B76E79] hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CTA
============================================================ */
function CTA() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden gradient-rose p-10 md:p-16 text-center text-white shadow-2xl">
          <div aria-hidden className="absolute inset-0 opacity-30"
            style={{ background: 'radial-gradient(400px 200px at 20% 30%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(400px 200px at 80% 70%, rgba(255,220,180,0.5), transparent 60%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h3 className="font-display text-3xl md:text-5xl leading-tight">
              Ready to plan weddings <em className="not-italic">effortlessly</em>?
            </h3>
            <p className="mt-4 text-white/85 text-lg">Join 500+ wedding studios using Vivaha. 14-day free trial. No credit card.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-white text-[#B76E79] hover:bg-white/90 rounded-full px-7 py-6 shadow-xl">
                Start Free Trial <ArrowRight className="ml-1.5 h-4 w-4"/>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white rounded-full px-7 py-6">
                View Live Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Footer
============================================================ */
function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-[#EAC7CE]/30 bg-white/40 backdrop-blur">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-rose flex items-center justify-center shadow-md">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display text-2xl text-[#B76E79]">Vivaha</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">Wedding OS</div>
              </div>
            </div>
            <p className="mt-4 text-foreground/70 max-w-sm">
              A calmer, more elegant way to run a wedding planning business. Made with love in India, for the world's most magical weddings.
            </p>
            <div className="flex items-center gap-2 mt-5 text-xs text-foreground/60">
              <Shield className="h-3.5 w-3.5 text-[#B76E79]"/> SOC 2 · ISO-27001 hosted · GDPR ready
            </div>
          </div>

          {[
            { h: 'Product', l: ['Features', 'Dashboard', 'Pricing', 'Integrations', 'Changelog'] },
            { h: 'Company', l: ['About', 'Careers', 'Press', 'Contact', 'Blog'] },
            { h: 'Resources', l: ['Help center', 'Templates', 'Guides', 'API', 'Status'] },
          ].map((c,i)=>(
            <div key={i}>
              <div className="text-xs uppercase tracking-widest text-foreground/50 mb-4">{c.h}</div>
              <ul className="space-y-2.5">
                {c.l.map(x=>(
                  <li key={x}><a href="#" className="text-sm text-foreground/75 hover:text-[#B76E79] transition">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-divider my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/60">
          <div>© {new Date().getFullYear()} Vivaha Technologies Pvt. Ltd. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[#B76E79]">Privacy</a>
            <a href="#" className="hover:text-[#B76E79]">Terms</a>
            <a href="#" className="hover:text-[#B76E79]">Security</a>
            <span className="flex items-center gap-1">Crafted with <Heart className="h-3 w-3 fill-[#B76E79] text-[#B76E79]"/> in Mumbai</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   Main App
============================================================ */
const App = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Site-wide watercolor floral background */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://customer-assets-39nsmqrw.emergentagent.net/job_weddings-hub-7/artifacts/wshm155x_ChatGPT%20Image%20Jul%2015%2C%202026%2C%2009_38_19%20PM.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.45,
        }}
      />
      {/* Soft ivory wash so content stays readable */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(255,249,246,0.55) 0%, rgba(255,249,246,0.7) 50%, rgba(255,249,246,0.75) 100%)',
        }}
      />
      <Petals />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustedStrip />
        <Features />
        <DashboardPreview />
        <CSVSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}

export default App
