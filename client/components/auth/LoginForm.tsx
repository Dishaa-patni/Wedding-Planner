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
import type { LoginFormData, UserRole } from '@/types/auth'

const INITIAL_FORM: LoginFormData = {
  role: 'admin',
  email: '',
  password: '',
  rememberMe: true,
}

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormData>(INITIAL_FORM)

  const setField = <K extends keyof LoginFormData>(key: K, value: LoginFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line no-console
    console.log('Login submit', form)
  }

  const canSubmit = Boolean(form.email && form.password)

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
          {AUTH_COPY.login.heading}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-foreground/65">{AUTH_COPY.login.subheading}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full rounded-full py-6 border-[#B76E79]/25 bg-white hover:bg-white/95 text-[#2E2E2E] shadow-sm"
      >
        <GoogleIcon />
        <span className="ml-2">{AUTH_COPY.login.googleLabel}</span>
      </Button>

      <OrDivider label={AUTH_COPY.login.orDivider} />

      <RoleToggle value={form.role} onChange={(role: UserRole) => setField('role', role)} />

      <div className="space-y-4">
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
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={form.rememberMe}
            onCheckedChange={(v) => setField('rememberMe', v === true)}
            className="border-[#B76E79]/40 data-[state=checked]:bg-[#B76E79]"
          />
          <span className="text-sm text-foreground/70">Remember me</span>
        </label>
        <a href="#" className="text-sm text-[#B76E79] hover:underline">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-full py-6 bg-[#B76E79] hover:bg-[#a55e69] text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {AUTH_COPY.login.submit}
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Button>

      <div className="text-center text-sm text-foreground/65">
        {AUTH_COPY.login.footerText}{' '}
        <Link
          href={AUTH_COPY.login.footerHref}
          className="text-[#B76E79] hover:underline font-medium"
        >
          {AUTH_COPY.login.footerLink}
        </Link>
      </div>
    </motion.form>
  )
}
