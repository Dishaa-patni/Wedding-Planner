'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Heart, Users, ClipboardList, Store, CheckSquare, Wallet, CalendarDays,
  Sparkles, Menu, X, Check, Star, ArrowRight, ChevronRight, Play, Shield,
  TrendingUp, Bell, Flower2
} from 'lucide-react'

/* --------------------------------------------
   Data
---------------------------------------------*/
const weddingImages = [
  { src: 'https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Wedding Ceremony' },
  { src: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Mandap Ceremony' },
  { src: 'https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Bridal Portrait' },
  { src: 'https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjB3ZWRkaW5nfGVufDB8fHx8MTc4NDEyODY0NHww&ixlib=rb-4.1.0&q=85', label: 'Couple Portrait' },
  { src: 'https://images.pexels.com/photos/35069916/pexels-photo-35069916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Reception' },
  { src: 'https://images.pexels.com/photos/32315685/pexels-photo-32315685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Mehendi Details' },
]

const features = [
  { icon: Heart, title: 'Wedding Management', desc: 'Orchestrate every event — from haldi and mehendi to the reception — with one unified timeline.', tag: 'Core' },
  { icon: Users, title: 'Team Management', desc: 'Assign planners, coordinators & assistants. Track their tasks, shifts, and performance in real time.', tag: 'Ops' },
  { icon: ClipboardList, title: 'Guest Management', desc: 'RSVPs, meal preferences, seating, and accommodations — all beautifully organized.', tag: 'Guests' },
  { icon: Store, title: 'Vendor Management', desc: 'Curated vendor directory, contracts, bookings & performance ratings in one place.', tag: 'Vendors' },
  { icon: CheckSquare, title: 'Task Tracking', desc: 'Kanban boards, deadlines and dependencies keep every wedding running like clockwork.', tag: 'Productivity' },
  { icon: Wallet, title: 'Payment Tracking', desc: 'Invoices, milestones, vendor payouts and client dues — with automatic reminders.', tag: 'Finance' },
  { icon: CalendarDays, title: 'Timeline', desc: 'Visual master timeline for every ritual, cue and vendor call across the wedding weekend.', tag: 'Schedule' },
]

const testimonials = [
  {
    name: 'Ananya Kapoor', role: 'Founder, Saat Phere Weddings',
    quote: 'Vivaha replaced 6 different tools we used for our destination weddings. Our team saves 20+ hours every week and our clients feel the difference.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Ananya+Kapoor&background=B76E79&color=fff&size=128'
  },
  {
    name: 'Rohan Mehta', role: 'CEO, The Baraat Company',
    quote: 'The payment tracking alone paid for our subscription in the first month. Beautiful, thoughtful software built by people who understand weddings.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=D4AF7A&color=fff&size=128'
  },
  {
    name: 'Isha Reddy', role: 'Head Planner, Marigold Events',
    quote: 'From vendor coordination to guest RSVPs, everything just flows. It feels less like software and more like a very capable second-in-command.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Isha+Reddy&background=B76E79&color=fff&size=128'
  },
]

const pricingPlans = [
  {
    name: 'Starter', price: '₹2,999', period: '/mo', tagline: 'For boutique planners',
    features: ['Up to 5 active weddings', '3 team members', 'Basic vendor directory', 'Guest & task management', 'Email support'],
    highlight: false,
  },
  {
    name: 'Studio', price: '₹7,999', period: '/mo', tagline: 'Most loved by growing studios',
    features: ['Up to 25 active weddings', '15 team members', 'Advanced vendor CRM', 'Payment tracking & invoicing', 'Client portal', 'Priority support'],
    highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', tagline: 'For destination wedding houses',
    features: ['Unlimited weddings & team', 'Custom integrations', 'Dedicated success manager', 'White-label client portal', 'SLA & onboarding'],
    highlight: false,
  },
]

const faqs = [
  { q: 'Is Vivaha built specifically for Indian weddings?', a: 'Yes — while it works beautifully for any wedding, every workflow (haldi, mehendi, sangeet, pheras, reception) is a first-class citizen. Vendor categories, ritual templates and payment structures are tuned for the Indian market.' },
  { q: 'Can my whole team collaborate inside a single wedding?', a: 'Absolutely. Invite planners, coordinators, and assistants with granular roles. Everyone sees the same timeline, tasks and vendor conversations — updated in real time.' },
  { q: 'How do you handle client payments and vendor payouts?', a: 'You can define milestone-based invoicing, take advance payments online, and schedule automatic vendor payouts. Clients get a beautiful branded portal to pay you.' },
  { q: 'Do I need to migrate my existing weddings?', a: 'No. You can import your ongoing weddings from a spreadsheet in minutes. Our onboarding team helps Studio and Enterprise customers migrate for free.' },
  { q: 'Is my clients\' data safe?', a: 'Yes. All data is encrypted in transit and at rest, hosted on ISO-27001 certified infrastructure. Only you and your invited team members can access your weddings.' },
  { q: 'Can I try it before I pay?', a: '14-day free trial, no credit card required. See a full working dashboard with sample weddings the moment you sign up.' },
]

/* --------------------------------------------
   Reusable pieces
---------------------------------------------*/
function Rose({ cx, cy, r = 10, color = '#B76E79', highlight = '#E7B7B0' }) {
  // Layered rose bloom
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* outer petals */}
      {[...Array(8)].map((_, i) => {
        const a = (i * 45 * Math.PI) / 180
        return (
          <ellipse
            key={`op-${i}`}
            cx={Math.cos(a) * r * 0.55}
            cy={Math.sin(a) * r * 0.55}
            rx={r * 0.55}
            ry={r * 0.8}
            transform={`rotate(${i * 45} ${Math.cos(a) * r * 0.55} ${Math.sin(a) * r * 0.55})`}
            fill={color}
            opacity="0.55"
          />
        )
      })}
      {/* mid petals */}
      {[...Array(6)].map((_, i) => {
        const a = (i * 60 * Math.PI) / 180 + 0.3
        return (
          <ellipse
            key={`mp-${i}`}
            cx={Math.cos(a) * r * 0.35}
            cy={Math.sin(a) * r * 0.35}
            rx={r * 0.42}
            ry={r * 0.6}
            transform={`rotate(${i * 60 + 20} ${Math.cos(a) * r * 0.35} ${Math.sin(a) * r * 0.35})`}
            fill={color}
            opacity="0.85"
          />
        )
      })}
      {/* center */}
      <circle cx="0" cy="0" r={r * 0.25} fill={highlight} />
      <circle cx="0" cy="0" r={r * 0.12} fill="#7C3E48" opacity="0.5" />
    </g>
  )
}

function Leaf({ cx, cy, rx = 4, ry = 10, rotate = 0, color = '#8FA98A' }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill={color} opacity="0.75" />
      <line x1="0" y1={-ry} x2="0" y2={ry} stroke="#5C7A58" strokeWidth="0.4" opacity="0.6" />
    </g>
  )
}

function FloralCorner({ position = 'top-left', className = '' }) {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-x-[-1] scale-y-[-1]',
  }
  return (
    <svg
      viewBox="0 0 240 240"
      className={`pointer-events-none absolute w-52 h-52 md:w-72 md:h-72 lg:w-[22rem] lg:h-[22rem] opacity-90 ${positions[position]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vine stems */}
      <g stroke="#8FA98A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.75">
        <path d="M0 0 C 40 20, 70 40, 90 90" />
        <path d="M0 0 C 30 50, 60 70, 110 80" />
        <path d="M15 5 C 55 25, 80 55, 75 110" />
        <path d="M5 15 C 25 60, 55 90, 100 120" />
      </g>

      {/* Leaves along stems */}
      <Leaf cx="28" cy="22" rx="4" ry="10" rotate={-40} color="#7C9878" />
      <Leaf cx="45" cy="38" rx="3.5" ry="9" rotate={-30} color="#8FA98A" />
      <Leaf cx="60" cy="58" rx="4" ry="11" rotate={-10} color="#6E8B6A" />
      <Leaf cx="78" cy="80" rx="3.5" ry="9" rotate={5} color="#8FA98A" />
      <Leaf cx="35" cy="70" rx="4" ry="10" rotate={-60} color="#7C9878" />
      <Leaf cx="55" cy="95" rx="3.5" ry="9" rotate={-40} color="#6E8B6A" />
      <Leaf cx="88" cy="110" rx="4" ry="11" rotate={20} color="#8FA98A" />

      {/* Small buds */}
      <g fill="#E9B4B4" opacity="0.85">
        <circle cx="22" cy="30" r="2.5" />
        <circle cx="48" cy="20" r="2" />
        <circle cx="70" cy="45" r="2.5" />
        <circle cx="20" cy="65" r="2" />
      </g>

      {/* Rose blooms */}
      <Rose cx={90} cy={90} r={13} color="#B76E79" highlight="#F0C9C9" />
      <Rose cx={55} cy={45} r={10} color="#C88994" highlight="#F5D5D5" />
      <Rose cx={120} cy={35} r={9} color="#D4AF7A" highlight="#F3DEB8" />
      <Rose cx={30} cy={95} r={8} color="#E9B4B4" highlight="#FBE0E0" />
      <Rose cx={115} cy={115} r={11} color="#B76E79" highlight="#F0C9C9" />
      <Rose cx={155} cy={70} r={7} color="#D4AF7A" highlight="#F3DEB8" />

      {/* Tiny sparkle stars */}
      <g fill="#D4AF7A" opacity="0.7">
        <circle cx="130" cy="15" r="1.2" />
        <circle cx="160" cy="30" r="1" />
        <circle cx="180" cy="55" r="1.2" />
        <circle cx="140" cy="130" r="1" />
      </g>
    </svg>
  )
}

/* Elegant side bouquet (larger, for hero sides) */
function SideBouquet({ side = 'left', className = '' }) {
  const positions = {
    left: 'left-0 top-1/2 -translate-y-1/2 -translate-x-6',
    right: 'right-0 top-1/2 -translate-y-1/2 translate-x-6 scale-x-[-1]',
  }
  return (
    <svg
      viewBox="0 0 200 500"
      className={`pointer-events-none absolute hidden lg:block w-40 xl:w-56 h-[500px] opacity-90 ${positions[side]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* long trailing vine */}
      <g stroke="#8FA98A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M40 20 C 80 100, 30 200, 70 280 C 100 340, 40 420, 80 490" />
        <path d="M30 60 C 70 140, 50 220, 90 300" />
        <path d="M50 120 C 20 180, 60 260, 40 340" />
      </g>
      {/* leaves */}
      {[
        [55,60,-40],[75,110,-20],[35,150,-60],[80,190,-10],[45,240,-50],
        [75,285,5],[35,330,-55],[80,380,10],[50,430,-40],[80,470,15],[30,90,-70],[65,220,-15],[55,395,-30]
      ].map(([x,y,r],i)=>(<Leaf key={i} cx={x} cy={y} rx={4} ry={11} rotate={r} color={i%2?'#6E8B6A':'#8FA98A'} />))}
      {/* Roses */}
      <Rose cx={70} cy={70} r={12} color="#B76E79" highlight="#F0C9C9" />
      <Rose cx={40} cy={130} r={9} color="#D4AF7A" highlight="#F3DEB8" />
      <Rose cx={85} cy={170} r={11} color="#C88994" highlight="#F5D5D5" />
      <Rose cx={55} cy={230} r={10} color="#B76E79" highlight="#F0C9C9" />
      <Rose cx={90} cy={280} r={13} color="#D4AF7A" highlight="#F3DEB8" />
      <Rose cx={45} cy={340} r={9} color="#E9B4B4" highlight="#FBE0E0" />
      <Rose cx={80} cy={385} r={11} color="#B76E79" highlight="#F0C9C9" />
      <Rose cx={55} cy={440} r={10} color="#C88994" highlight="#F5D5D5" />
      <Rose cx={90} cy={480} r={8} color="#D4AF7A" highlight="#F3DEB8" />
      {/* buds */}
      <g fill="#E9B4B4" opacity="0.85">
        <circle cx="30" cy="100" r="2.5" />
        <circle cx="55" cy="160" r="2" />
        <circle cx="35" cy="260" r="2.5" />
        <circle cx="70" cy="320" r="2" />
        <circle cx="40" cy="410" r="2.5" />
      </g>
    </svg>
  )
}

function Petals() {
  const [petals, setPetals] = useState([])
  useEffect(() => {
    const palette = ['#B76E79', '#E7B7B0', '#D4AF7A', '#F0C9C9', '#C88994', '#EFCBA6']
    const arr = Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 12 + Math.random() * 18,
      size: 10 + Math.random() * 22,
      shape: i % 4, // 0 = petal, 1 = 5-petal flower, 2 = rose, 3 = tiny bud
      hue: palette[Math.floor(Math.random() * palette.length)],
      hue2: palette[Math.floor(Math.random() * palette.length)],
      swayX: 40 + Math.random() * 120,
    }))
    setPetals(arr)
  }, [])

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map(p => {
        const style = {
          left: `${p.left}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration}s`,
          '--sway-x': `${p.swayX}px`,
        }
        if (p.shape === 1) {
          // 5-petal flower
          return (
            <svg key={p.id} viewBox="0 0 40 40" className="petal" style={style}>
              <g opacity="0.75">
                {[...Array(5)].map((_, k) => {
                  const a = (k * 72 * Math.PI) / 180
                  return (
                    <ellipse
                      key={k}
                      cx={20 + Math.cos(a) * 8}
                      cy={20 + Math.sin(a) * 8}
                      rx="7"
                      ry="10"
                      fill={p.hue}
                      transform={`rotate(${k * 72} ${20 + Math.cos(a) * 8} ${20 + Math.sin(a) * 8})`}
                    />
                  )
                })}
                <circle cx="20" cy="20" r="4" fill={p.hue2} />
                <circle cx="20" cy="20" r="1.6" fill="#7C3E48" />
              </g>
            </svg>
          )
        }
        if (p.shape === 2) {
          // rose bloom
          return (
            <svg key={p.id} viewBox="0 0 40 40" className="petal" style={style}>
              <g opacity="0.8">
                {[...Array(8)].map((_, k) => {
                  const a = (k * 45 * Math.PI) / 180
                  return (
                    <ellipse
                      key={k}
                      cx={20 + Math.cos(a) * 6}
                      cy={20 + Math.sin(a) * 6}
                      rx="6"
                      ry="9"
                      fill={p.hue}
                      opacity="0.6"
                      transform={`rotate(${k * 45} ${20 + Math.cos(a) * 6} ${20 + Math.sin(a) * 6})`}
                    />
                  )
                })}
                {[...Array(6)].map((_, k) => {
                  const a = (k * 60 * Math.PI) / 180 + 0.3
                  return (
                    <ellipse
                      key={`m${k}`}
                      cx={20 + Math.cos(a) * 3.5}
                      cy={20 + Math.sin(a) * 3.5}
                      rx="4.2"
                      ry="6"
                      fill={p.hue}
                      transform={`rotate(${k * 60 + 20} ${20 + Math.cos(a) * 3.5} ${20 + Math.sin(a) * 3.5})`}
                    />
                  )
                })}
                <circle cx="20" cy="20" r="2.5" fill={p.hue2} />
              </g>
            </svg>
          )
        }
        if (p.shape === 3) {
          // little bud/circle
          return (
            <svg key={p.id} viewBox="0 0 24 24" className="petal" style={style}>
              <circle cx="12" cy="12" r="4" fill={p.hue} opacity="0.7" />
              <circle cx="12" cy="12" r="1.6" fill={p.hue2} />
            </svg>
          )
        }
        // simple petal
        return (
          <svg key={p.id} viewBox="0 0 24 24" className="petal" style={style} fill={p.hue}>
            <path d="M12 2 C 17 8, 20 13, 12 22 C 4 13, 7 8, 12 2 Z" opacity="0.65" />
          </svg>
        )
      })}
    </div>
  )
}

/* --------------------------------------------
   Navbar
---------------------------------------------*/
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
      <div className={`container mx-auto px-4 md:px-6`}>
        <div className={`glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? 'shadow-lg' : ''}`}>
          {/* Menu links (left/center on md+) */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="px-3 py-2 text-sm text-foreground/80 hover:text-rose-gold rounded-lg hover:bg-white/60 transition">
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile: brand left */}
          <a href="#" className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-rose flex items-center justify-center shadow">
              <Flower2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-xl text-rose-gold">Vivaha</span>
          </a>

          {/* Right side: brand + auth */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 mr-2">
              <div className="w-9 h-9 rounded-full gradient-rose flex items-center justify-center shadow-md">
                <Flower2 className="w-4 h-4 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-xl text-rose-gold">Vivaha</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">Wedding OS</div>
              </div>
            </div>
            <Button variant="ghost" className="hidden sm:inline-flex text-foreground/80 hover:text-rose-gold hover:bg-white/60">
              Log in
            </Button>
            <Button className="bg-rose-gold hover:bg-[#a55e69] text-white shadow-md hover:shadow-lg transition-all rounded-full px-4 md:px-5">
              Start Free Trial <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <button className="md:hidden p-2 text-foreground/80" onClick={() => setOpen(!open)} aria-label="menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass rounded-2xl p-3 space-y-1"
            >
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm rounded-lg hover:bg-white/70 hover:text-rose-gold">
                  {l.label}
                </a>
              ))}
              <a href="#" className="block px-4 py-2.5 text-sm rounded-lg hover:bg-white/70 hover:text-rose-gold">Log in</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

/* --------------------------------------------
   Hero — headline + carousel glass card
---------------------------------------------*/
function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % weddingImages.length), 3800)
    return () => clearInterval(t)
  }, [])

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 md:pt-40 pb-24 md:pb-32">
      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <SideBouquet side="left" className="opacity-70" />
      <SideBouquet side="right" className="opacity-70" />

      {/* subtle radial glow */}
      <div aria-hidden className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(1000px 500px at 15% 20%, rgba(212,175,122,0.18), transparent 60%), radial-gradient(900px 500px at 85% 30%, rgba(183,110,121,0.15), transparent 60%)' }} />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left */}
          <motion.div
            style={{ y: yLeft }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-7 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs md:text-sm text-foreground/75 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-rose-gold" />
              <span>The Wedding OS for modern planners</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] leading-[1.05] tracking-tight text-foreground">
              Plan, Manage <span className="gradient-text">& Celebrate</span><br className="hidden md:block"/>
              Weddings <span className="italic text-rose-gold">Effortlessly</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/70 max-w-xl">
              From the first client meeting to the final celebration, manage every wedding, team, task and payment in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-rose-gold hover:bg-[#a55e69] text-white rounded-full px-7 py-6 text-base shadow-lg hover:shadow-xl transition-all group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-7 py-6 text-base border-rose-gold/40 text-rose-gold hover:bg-rose-gold/10 hover:text-rose-gold bg-white/50 backdrop-blur">
                <Play className="mr-2 h-4 w-4" />
                See Dashboard
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 md:gap-8">
              <div className="flex -space-x-3">
                {['Ananya+K','Rohan+M','Isha+R','Vikram+S'].map((n,i)=>(
                  <img key={i} src={`https://ui-avatars.com/api/?name=${n}&background=${i%2?'D4AF7A':'B76E79'}&color=fff&size=64`} className="w-9 h-9 rounded-full border-2 border-white shadow" alt=""/>
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

          {/* Right — Glass Carousel Card (compact) */}
          <motion.div
            style={{ y: yRight }}
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative float-slow w-full max-w-[380px]">
              {/* Glow blobs behind card */}
              <div className="absolute -inset-10 -z-10">
                <div className="absolute top-4 -left-6 w-40 h-40 rounded-full bg-rose-gold/25 blur-3xl"/>
                <div className="absolute -bottom-6 -right-6 w-56 h-56 rounded-full bg-[#D4AF7A]/30 blur-3xl"/>
              </div>

              {/* Decorative ring behind */}
              <div aria-hidden className="absolute -inset-3 rounded-[2rem] border border-rose-gold/20" />
              <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] border border-[#D4AF7A]/20" />

              <div className="glass-strong rounded-[1.75rem] p-3 md:p-3.5 relative">
                {/* small ribbon */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur border border-rose-gold/20 text-[10px] tracking-[0.25em] uppercase text-rose-gold shadow flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" /> Featured Wedding
                  </div>
                </div>

                {/* image frame */}
                <div className="relative rounded-[1.25rem] overflow-hidden aspect-[4/5] shadow-inner">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />

                  {/* corner floral overlay */}
                  <svg viewBox="0 0 80 80" className="absolute top-2 right-2 w-14 h-14 opacity-90">
                    <Rose cx={40} cy={40} r={10} color="#F0C9C9" highlight="#FBE0E0" />
                  </svg>

                  {/* live badge */}
                  <div className="absolute top-3 left-3">
                    <div className="glass px-2.5 py-1 rounded-full text-[10px] text-foreground/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse" /> Live board
                    </div>
                  </div>

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

                {/* Mini stats row */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { k: '312', v: 'Guests' },
                    { k: '24', v: 'Vendors' },
                    { k: '87%', v: 'Paid' },
                  ].map((s,i)=>(
                    <div key={i} className="bg-white/75 rounded-lg py-2 text-center border border-white/70">
                      <div className="font-display text-base md:text-lg text-rose-gold leading-none">{s.k}</div>
                      <div className="text-[9px] uppercase tracking-widest text-foreground/60 mt-1">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating chip cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden md:block absolute -left-16 top-16 glass rounded-2xl px-3.5 py-2.5 shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-gold/15 flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5 text-rose-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] text-foreground/60">Reminder</div>
                    <div className="text-xs font-medium">Florist · 4:00 PM</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden md:block absolute -right-10 bottom-24 glass rounded-2xl px-3.5 py-2.5 shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF7A]/25 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-[#B08750]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-foreground/60">This month</div>
                    <div className="text-xs font-medium">₹18.4L tracked</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------
   Marquee: trusted by
---------------------------------------------*/
function TrustedStrip() {
  const items = ['Saat Phere Studio', 'Marigold Events', 'The Baraat Co.', 'Shubh Muhurat', 'Anaya Weddings', 'Sindoor & Silk', 'Regal Rituals']
  return (
    <section className="relative py-10 border-y border-rose-gold/10 bg-white/30 backdrop-blur">
      <div className="container mx-auto px-6">
        <div className="text-center text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6">Trusted by boutique wedding studios across India</div>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-80">
          {items.map((n,i)=>(
            <div key={i} className="font-display text-lg md:text-xl text-foreground/60 hover:text-rose-gold transition-colors">{n}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------
   Features grid
---------------------------------------------*/
function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <FloralCorner position="top-right" className="opacity-30" />
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
            <Sparkles className="h-3 w-3 text-rose-gold" /> Everything you need. Nothing you don't.
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            A single, <span className="gradient-text">graceful workspace</span><br/> for the entire wedding
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
          <p className="mt-6 text-foreground/70 text-lg">
            Seven thoughtfully designed modules that replace the chaos of spreadsheets, whatsapp groups and sticky notes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            const wide = i === 0
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`${wide ? 'sm:col-span-2' : ''}`}
              >
                <Card className="h-full group relative overflow-hidden glass border-white/70 rounded-2xl p-6 md:p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl gradient-rose flex items-center justify-center shadow-lg shadow-rose-gold/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline" className="border-rose-gold/30 text-rose-gold bg-white/60 text-[10px] tracking-widest uppercase">{f.tag}</Badge>
                  </div>
                  <h3 className="font-display text-2xl mt-5 text-foreground">{f.title}</h3>
                  <p className="mt-2 text-foreground/65 leading-relaxed">{f.desc}</p>
                  <div className="mt-5 flex items-center text-sm text-rose-gold gap-1 opacity-70 group-hover:opacity-100 transition">
                    Learn more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* subtle floral corner inside card */}
                  <svg viewBox="0 0 100 100" className="absolute -bottom-2 -right-2 w-24 h-24 opacity-[0.08] pointer-events-none">
                    <g fill="#B76E79">
                      {[...Array(6)].map((_,k)=>{
                        const a = (k*60*Math.PI)/180
                        return <ellipse key={k} cx={70+Math.cos(a)*10} cy={70+Math.sin(a)*10} rx="5" ry="9" transform={`rotate(${k*60} ${70+Math.cos(a)*10} ${70+Math.sin(a)*10})`}/>
                      })}
                      <circle cx="70" cy="70" r="4" fill="#D4AF7A"/>
                    </g>
                  </svg>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------
   Dashboard preview
---------------------------------------------*/
function DashboardPreview() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="dashboard" className="relative py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(700px 400px at 50% 20%, rgba(183,110,121,0.10), transparent 70%)' }} />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
            <ClipboardList className="h-3 w-3 text-rose-gold" /> Live Dashboard
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
                <span className="w-3 h-3 rounded-full bg-rose-gold/70"/>
                <span className="w-3 h-3 rounded-full bg-[#D4AF7A]/70"/>
                <span className="w-3 h-3 rounded-full bg-[#C99A7C]/70"/>
              </div>
              <div className="ml-3 text-xs text-foreground/50">vivaha.app / dashboard</div>
            </div>

            <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
              {/* Left column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white/80 rounded-2xl p-5 border border-white">
                  <div className="text-xs uppercase tracking-widest text-foreground/50">Upcoming Wedding</div>
                  <div className="font-display text-2xl mt-1">Aditi & Karthik</div>
                  <div className="text-sm text-foreground/60 mt-1">28 Dec · Udaipur · 320 guests</div>
                  <div className="mt-4 h-2 bg-rose-gold/10 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] gradient-rose rounded-full" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-foreground/60">
                    <span>72% planned</span><span>28 days to go</span>
                  </div>
                </div>

                <div className="bg-white/80 rounded-2xl p-5 border border-white">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-foreground/50">Payments</div>
                    <Wallet className="h-4 w-4 text-rose-gold"/>
                  </div>
                  <div className="font-display text-3xl mt-1 text-rose-gold">₹18.4L</div>
                  <div className="text-xs text-foreground/60">Tracked this month · <span className="text-emerald-600">+24%</span></div>
                  <div className="mt-4 grid grid-cols-4 gap-1 h-16 items-end">
                    {[40,65,55,80,45,90,60,72,88,50,70,95].map((h,i)=>(
                      <div key={i} className="rounded-t bg-gradient-to-t from-[#D4AF7A]/50 to-rose-gold/80" style={{ height: `${h}%`}}/>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center */}
              <div className="lg:col-span-5 bg-white/80 rounded-2xl p-5 border border-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-foreground/50">Wedding Timeline</div>
                    <div className="font-display text-xl">Aditi & Karthik · Day 2</div>
                  </div>
                  <Badge className="bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/15 border-0">On Track</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { t: '07:00', e: 'Haldi ceremony · Poolside', c: 'bg-[#F5D571]', done: true },
                    { t: '11:30', e: 'Mehendi artists arrive', c: 'bg-[#B76E79]', done: true },
                    { t: '16:00', e: 'Sangeet rehearsal', c: 'bg-[#D4AF7A]', done: false },
                    { t: '19:30', e: 'Cocktail dinner setup', c: 'bg-[#C99A7C]', done: false },
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

              {/* Right */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white/80 rounded-2xl p-5 border border-white">
                  <div className="text-xs uppercase tracking-widest text-foreground/50">Team on duty</div>
                  <div className="mt-3 space-y-3">
                    {[
                      { n: 'Priya', r: 'Lead Planner', c: 'B76E79' },
                      { n: 'Aarav', r: 'Vendor Lead', c: 'D4AF7A' },
                      { n: 'Neha', r: 'Guest Desk', c: 'C99A7C' },
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

          {/* Floating annotations */}
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

/* --------------------------------------------
   Testimonials
---------------------------------------------*/
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
                <div className="absolute top-4 right-4 font-display text-6xl text-rose-gold/15 leading-none select-none">“</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------
   Pricing
---------------------------------------------*/
function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <FloralCorner position="bottom-left" className="opacity-30" />
      <div className="container mx-auto px-4 md:px-6">
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
                  <Badge className="bg-rose-gold hover:bg-rose-gold text-white shadow-lg px-3 py-1 rounded-full">Most Popular</Badge>
                </div>
              )}
              <Card className={`rounded-2xl p-8 h-full transition-all ${p.highlight ? 'glass-strong border-rose-gold/30 shadow-2xl' : 'glass border-white/70'} hover:-translate-y-1`}>
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
                      <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${p.highlight ? 'bg-rose-gold text-white' : 'bg-rose-gold/10 text-rose-gold'}`}>
                        <Check className="h-3 w-3"/>
                      </div>
                      <span className="text-foreground/75">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full mt-8 rounded-full py-6 ${p.highlight ? 'bg-rose-gold hover:bg-[#a55e69] text-white shadow-lg' : 'bg-white/80 hover:bg-white text-rose-gold border border-rose-gold/30'}`}>
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

/* --------------------------------------------
   FAQ
---------------------------------------------*/
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
              <AccordionItem key={i} value={`item-${i}`} className="border-rose-gold/10">
                <AccordionTrigger className="text-left font-display text-lg md:text-xl hover:text-rose-gold hover:no-underline py-5">
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

/* --------------------------------------------
   CTA banner
---------------------------------------------*/
function CTA() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden gradient-rose p-10 md:p-16 text-center text-white shadow-2xl">
          <div aria-hidden className="absolute inset-0 opacity-30"
            style={{ background: 'radial-gradient(400px 200px at 20% 30%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(400px 200px at 80% 70%, rgba(255,220,180,0.5), transparent 60%)' }} />
          <FloralCorner position="top-left" className="opacity-25" />
          <FloralCorner position="bottom-right" className="opacity-25" />
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
              <Button size="lg" className="bg-white text-rose-gold hover:bg-white/90 rounded-full px-7 py-6 shadow-xl">
                Start Free Trial <ArrowRight className="ml-1.5 h-4 w-4"/>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white rounded-full px-7 py-6">
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------
   Footer
---------------------------------------------*/
function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-rose-gold/10 bg-white/40 backdrop-blur">
      <FloralCorner position="bottom-right" className="opacity-20" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-rose flex items-center justify-center shadow-md">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display text-2xl text-rose-gold">Vivaha</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">Wedding OS</div>
              </div>
            </div>
            <p className="mt-4 text-foreground/70 max-w-sm">
              A calmer, more elegant way to run a wedding planning business. Made with love in India, for the world's most magical weddings.
            </p>
            <div className="flex items-center gap-2 mt-5 text-xs text-foreground/60">
              <Shield className="h-3.5 w-3.5 text-rose-gold"/> SOC 2 · ISO-27001 hosted · GDPR ready
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
                  <li key={x}><a href="#" className="text-sm text-foreground/75 hover:text-rose-gold transition">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-divider my-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/60">
          <div>© {new Date().getFullYear()} Vivaha Technologies Pvt. Ltd. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-rose-gold">Privacy</a>
            <a href="#" className="hover:text-rose-gold">Terms</a>
            <a href="#" className="hover:text-rose-gold">Security</a>
            <span className="flex items-center gap-1">Crafted with <Heart className="h-3 w-3 fill-rose-gold text-rose-gold"/> in Mumbai</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* --------------------------------------------
   Main App
---------------------------------------------*/
const App = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <Petals />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustedStrip />
        <Features />
        <DashboardPreview />
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
