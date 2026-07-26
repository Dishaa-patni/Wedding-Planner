'use client'

import { motion } from 'framer-motion'
import {

  Camera,
  ChevronRight,
  Clock,
  Flower2,
  Gem,
  Heart,
  Palette,
  Plus,
  Sparkles,
  Star,
} from 'lucide-react'
import { NavigationCard } from './components/navigationCard'

const MEDIA = {
  mandap:
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=700&q=80',
  mehendi:
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=700&q=80',
  tablescape:
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=80',
  palace:
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=700&q=80',
} as const

const THEMES = {
  folders: 12,
  inspirations: 132,
  weddingsUsed: 18,
  updated: '2 hours ago',
  palette: ['#F3D9CE', '#E6B7A5', '#C89B7B', '#8E5A3B', '#3B2A26'],
  chips: ['Pastel', 'Royal', 'Luxury', 'Minimal'],
  covers: [MEDIA.mandap, MEDIA.mehendi, MEDIA.tablescape],
} as const

const OCCASIONS = [
  { label: 'Haldi', count: 42, tint: 'from-[#FDE8B0] to-[#F6C56A]', ring: '#E4A833' },
  { label: 'Mehendi', count: 36, tint: 'from-[#DDEBC5] to-[#A9C878]', ring: '#7FA24F' },
  { label: 'Sangeet', count: 28, tint: 'from-[#F3D2E4] to-[#E39BC3]', ring: '#C56C9A' },
  { label: 'Wedding', count: 54, tint: 'from-[#F5D8CB] to-[#E1957C]', ring: '#B96A4E' },
  { label: 'Reception', count: 31, tint: 'from-[#E5DAF3] to-[#B49BE0]', ring: '#8A6BC0' },
] as const

const PREVIOUS_WORK = [
  { couple: 'Ananya & Vihaan', venue: 'Udaipur', cover: MEDIA.palace },
  { couple: 'Riya & Kabir', venue: 'Goa', cover: MEDIA.tablescape },
  { couple: 'Diya & Aarav', venue: 'Jaipur', cover: MEDIA.mandap },
] as const

const FAVORITES = [MEDIA.mehendi, MEDIA.mandap, MEDIA.tablescape, MEDIA.palace] as const

export default function MediaLibraryScreen() {
  return (
    <section className="w-full max-w-[1500px] pb-3 pl-0 lg:pl-2">
      <header className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-sm text-[#756967]">
            <span>Workspace</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#4B3D3A]">Media Library</span>
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#D77474]">
            CREATIVE WORKSPACE
          </p>
          <h1 className="mt-1.5 font-display text-[42px] leading-none text-[#3B2928] sm:text-[50px]">
            The Library
            <span className="ml-3 inline-block h-2 w-2 rounded-full bg-[#D8B26E] align-middle" />
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#756967]">
            Choose where you want to organize inspiration, finished work, or saved references.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#EAD6D2] bg-white/74 px-5 text-sm font-semibold text-[#5F5250] shadow-[0_14px_32px_-24px_rgba(91,55,49,0.42)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <Plus className="h-4 w-4" />
            New Collection
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D77474] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] transition hover:-translate-y-0.5 hover:bg-[#C96464]"
          >
            <Sparkles className="h-4 w-4" />
            Add Inspiration
          </button>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
        <NavigationCard
          eyebrow={{ icon: Palette, label: 'Most Used · Themes' }}
          title="Themes"
          subtitle="Curated decoration styles, palettes and design languages."
          action="Open Themes"
          accent="rose"
        >
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1fr]">
            <div className="relative min-h-[170px]">
              {THEMES.covers.map((src, index) => (
                <motion.div
                  key={src}
                  className="absolute overflow-hidden rounded-[22px] border-[3px] border-white shadow-[0_18px_38px_-22px_rgba(91,55,49,0.48)]"
                  whileHover={{ scale: 1.03 }}
                  style={{
                    width: '58%',
                    height: '78%',
                    top: `${index * 10}%`,
                    left: `${index * 15}%`,
                    zIndex: index,
                  }}
                >
                  <img src={src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </motion.div>
              ))}
              <div className="absolute bottom-0 left-2 z-10 flex w-fit items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 shadow-[0_14px_32px_-22px_rgba(91,55,49,0.5)]">
                <span className="pr-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A7B78]">
                  Palette
                </span>
                {THEMES.palette.map((color) => (
                  <span
                    key={color}
                    className="h-4 w-4 rounded-full ring-1 ring-black/5"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex min-h-[170px] flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  {THEMES.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#EAD6D2] bg-white px-3 py-1.5 text-xs font-medium text-[#756967]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                  <Stat value={THEMES.inspirations} label="Inspirations" />
                  <Stat value={THEMES.weddingsUsed} label="Weddings Used" />
                  <Stat value={THEMES.folders} label="Folders" />
                  <div>
                    <p className="flex items-center gap-2 text-sm text-[#756967]">
                      <Clock className="h-4 w-4 text-[#D77474]" />
                      {THEMES.updated}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A7B78]">
                      Updated
                    </p>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </NavigationCard>

        <NavigationCard
          eyebrow={{ icon: Gem, label: 'By Ritual · Occasions' }}
          title="Occasions"
          subtitle="Haldi, Mehendi, Wedding, Reception & more."
          action="Open Occasions"
          accent="gold"
          compact
        >
          <div className="grid max-h-[238px] gap-2 overflow-y-auto pr-1">
            {OCCASIONS.map((occasion) => (
              <div
                key={occasion.label}
                className="flex items-center gap-3 rounded-[18px] border border-[#EAD6D2] bg-white/72 px-3 py-2.5"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${occasion.tint} ring-1 ring-white`}
                  style={{
                    boxShadow: `0 0 0 1px ${occasion.ring}22, 0 10px 22px -16px ${occasion.ring}88`,
                  }}
                >
                  <Flower2 className="h-4 w-4 text-white" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold leading-tight text-[#3B2928]">
                    {occasion.label}
                  </span>
                  <span className="block text-xs text-[#756967]">{occasion.count} inspirations</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#8A7B78]" />
              </div>
            ))}
          </div>
        </NavigationCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
        <NavigationCard
          eyebrow={{ icon: Camera, label: 'Archive · Previous Work' }}
          title="Previous Work"
          subtitle="Completed weddings, on-set photos and delivered films."
          action="Browse Archive"
          accent="rose"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {PREVIOUS_WORK.map((work) => (
              <motion.div
                key={work.couple}
                whileHover={{ y: -3 }}
                className="group relative aspect-[5/3] overflow-hidden rounded-[20px] border border-white shadow-[0_16px_34px_-22px_rgba(91,55,49,0.48)]"
              >
                <img
                  src={work.cover}
                  alt={work.couple}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/5 to-transparent" />
                <div className="absolute inset-x-4 bottom-3 text-white">
                  <p className="font-display text-lg leading-tight">{work.couple}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] opacity-85">{work.venue}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-[#756967]">
            <span>
              <b className="text-[#3B2928]">24</b> weddings
            </span>
            <span>
              <b className="text-[#3B2928]">1,208</b> photos
            </span>
            <span>
              <b className="text-[#3B2928]">76</b> reels
            </span>
          </div>
        </NavigationCard>

        <NavigationCard
          eyebrow={{ icon: Star, label: 'Pinned · Favorites' }}
          title="Favorites"
          subtitle="Your team's most-reused references."
          action="See Favorites"
          accent="gold"
          compact
        >
          <div className="grid grid-cols-4 gap-3">
            {FAVORITES.map((src, index) => (
              <motion.div
                key={`${src}-${index}`}
                whileHover={{ y: -3 }}
                className="group relative aspect-square overflow-hidden rounded-[18px] border border-white shadow-[0_14px_30px_-22px_rgba(91,55,49,0.5)]"
              >
                <img src={src} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                {index === 0 ? (
                  <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/92">
                    <Heart className="h-4 w-4 fill-[#D77474] text-[#D77474]" />
                  </span>
                ) : null}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#756967]">
            <b className="text-[#3B2928]">38</b> saved references
          </p>
        </NavigationCard>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-display text-[25px] leading-none text-[#3B2928]">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A7B78]">
        {label}
      </p>
    </div>
  )
}

