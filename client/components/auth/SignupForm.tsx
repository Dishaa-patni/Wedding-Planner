'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import RoleToggle from './RoleToggle'
import { GoogleIcon, OrDivider, FieldGroup } from './AuthPrimitives'
import { AUTH_COPY } from '@/constants/auth'
import { SITE } from '@/constants'
import type { SignupFormData, UserRole } from '@/types/auth'

const INITIAL_FORM: SignupFormData = {
  role: 'admin',
  companyName: '',
  ownerName: '',
  email: '',
  password: '',
  confirmPassword: '',
  inviteCode: '',
  agreedToTerms: false,
}

export default function SignupForm() {
  const [form, setForm] = useState<SignupFormData>(INITIAL_FORM)
  const isTeam = form.role === 'team'

  const setField = <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line no-console
    console.log('Signup submit', form)
  }

  const canSubmit =
    form.agreedToTerms &&
    form.email &&
    form.password &&
    form.password === form.confirmPassword &&
    (isTeam ? form.ownerName && form.inviteCode : form.companyName && form.ownerName)

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4 sm:space-y-5"
    >
      <div>
        <h1 className="font-display text-3xl sm:text-[2.2rem] leading-tight text-[#2E2E2E]">
          {AUTH_COPY.signup.heading}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-foreground/65">{AUTH_COPY.signup.subheading}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full rounded-full py-6 border-[#B76E79]/25 bg-white hover:bg-white/95 text-[#2E2E2E] shadow-sm"
      >
        <GoogleIcon />
        <span className="ml-2">{AUTH_COPY.signup.googleLabel}</span>
      </Button>

      <OrDivider label={AUTH_COPY.signup.orDivider} />

      <RoleToggle value={form.role} onChange={(role: UserRole) => setField('role', role)} />

      <div className="space-y-4">
        {!isTeam && (
          <FieldGroup label="Company Name" htmlFor="companyName">
            <Input
              id="companyName"
              placeholder="Saat Phere Weddings"
              value={form.companyName}
              onChange={(e) => setField('companyName', e.target.value)}
              className="h-11 rounded-lg bg-white border-[#B76E79]/20"
            />
          </FieldGroup>
        )}

        <FieldGroup label={isTeam ? 'Full Name' : 'Owner Name'} htmlFor="ownerName">
          <Input
            id="ownerName"
            placeholder="Priya Sharma"
            value={form.ownerName}
            onChange={(e) => setField('ownerName', e.target.value)}
            className="h-11 rounded-lg bg-white border-[#B76E79]/20"
          />
        </FieldGroup>

        {isTeam && (
          <FieldGroup label="Invite Code" htmlFor="inviteCode">
            <Input
              id="inviteCode"
              placeholder="VIVAHA-XXXXX"
              value={form.inviteCode}
              onChange={(e) => setField('inviteCode', e.target.value)}
              className="h-11 rounded-lg bg-white border-[#B76E79]/20 tracking-widest uppercase"
            />
          </FieldGroup>
        )}

        <FieldGroup label="Business Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            placeholder="you@studio.com"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            className="h-11 rounded-lg bg-white border-[#B76E79]/20"
          />
        </FieldGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldGroup label="Password" htmlFor="password">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setField('password', e.target.value)}
              className="h-11 rounded-lg bg-white border-[#B76E79]/20"
            />
          </FieldGroup>
          <FieldGroup label="Confirm" htmlFor="confirmPassword">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) => setField('confirmPassword', e.target.value)}
              className="h-11 rounded-lg bg-white border-[#B76E79]/20"
            />
          </FieldGroup>
        </div>
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <Checkbox
          checked={form.agreedToTerms}
          onCheckedChange={(v) => setField('agreedToTerms', v === true)}
          className="mt-0.5 border-[#B76E79]/40 data-[state=checked]:bg-[#B76E79]"
        />
        <span className="text-[13px] text-foreground/70 leading-relaxed">
          I agree to {SITE.name}’s <a href="#" className="text-[#B76E79] hover:underline">Terms</a>
          {' '}and <a href="#" className="text-[#B76E79] hover:underline">Privacy Policy</a>.
        </span>
      </label>

      <Button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-full py-6 bg-[#B76E79] hover:bg-[#a55e69] text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isTeam ? AUTH_COPY.signup.submitTeam : AUTH_COPY.signup.submit}
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Button>

      <div className="text-center text-sm text-foreground/65">
        {AUTH_COPY.signup.footerText}{' '}
        <Link href={AUTH_COPY.signup.footerHref} className="text-[#B76E79] hover:underline font-medium">
          {AUTH_COPY.signup.footerLink}
        </Link>
      </div>
    </motion.form>
  )
}
