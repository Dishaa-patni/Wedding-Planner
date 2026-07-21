'use client'

import { motion } from 'framer-motion'
import { Check, FileSpreadsheet, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CSV_HIGHLIGHTS, RECENT_IMPORTS } from '@/constants'

function UploadDropzone() {
  return (
    <div className="border-2 border-dashed border-[#B76E79]/30 rounded-2xl p-8 text-center bg-white/60">
      <div className="w-14 h-14 rounded-full gradient-rose mx-auto flex items-center justify-center shadow-lg">
        <Upload className="h-6 w-6 text-white" />
      </div>
      <div className="font-display text-xl mt-4">Drop your guest list here</div>
      <div className="text-sm text-foreground/60 mt-1">CSV, XLS or XLSX · up to 20,000 rows</div>
      <Button className="mt-5 rounded-full bg-[#B76E79] hover:bg-[#a55e69] text-white px-6">
        Browse files
      </Button>
    </div>
  )
}

function RecentImportsList() {
  return (
    <div className="mt-5 space-y-2">
      <div className="text-xs uppercase tracking-widest text-foreground/50">Recent imports</div>
      {RECENT_IMPORTS.map((file) => (
        <div
          key={file.name}
          className="flex items-center gap-3 bg-white/70 rounded-xl px-3 py-2.5 border border-white/70"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FBE9CF] flex items-center justify-center">
            <FileSpreadsheet className="h-4 w-4 text-[#B08750]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate">{file.name}</div>
            <div className="text-[10px] text-foreground/50">{file.count} imported</div>
          </div>
          <Check className="h-4 w-4 text-emerald-600" />
        </div>
      ))}
    </div>
  )
}

export default function CSVSection() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
              <Upload className="h-3 w-3 text-[#B76E79]" /> Guest CSV Upload
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Bring in your entire
              <br /> guest list <span className="gradient-text">in seconds</span>
            </h2>
            <p className="mt-5 text-foreground/70 text-lg max-w-lg">
              Drop a CSV or Excel — Vivaha auto-detects names, phone numbers, dietary tags, plus-ones and RSVP status. Send elegant invites right after.
            </p>
            <ul className="mt-6 space-y-3">
              {CSV_HIGHLIGHTS.map((text) => (
                <li key={text} className="flex gap-2.5 text-sm">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-[#B76E79]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-[#B76E79]" />
                  </div>
                  <span className="text-foreground/75">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-xl">
              <UploadDropzone />
              <RecentImportsList />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
