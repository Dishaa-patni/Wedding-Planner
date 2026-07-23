'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import RoleToggle from './RoleToggle'
import { GoogleIcon, OrDivider, FieldGroup } from './AuthPrimitives'
import { AUTH_COPY } from './constants'
import { loginSchema, type LoginFormValues } from './schemas'
import { USER_ROLES } from '@/constants'
import { useGoogleOAuth, useLoginUser } from './hooks'

const INITIAL_FORM: LoginFormValues = {
  role: USER_ROLES.ADMIN,
  email: '',
  password: '',
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-xs text-[#DC2626]">{message}</p>
}

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const loginUser = useLoginUser()
  const { startGoogleOAuth } = useGoogleOAuth()
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginFormValues>({
    defaultValues: INITIAL_FORM,
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  })
  const isPending = isSubmitting || loginUser.isPending

  const onSubmit = async (values: LoginFormValues) => {
    await loginUser.mutateAsync(values)
    reset(INITIAL_FORM)
    router.push('/dashboard')
  }

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
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
        onClick={() => startGoogleOAuth()}
        className="w-full rounded-full py-6 border-[#B76E79]/25 bg-white hover:bg-white/95 text-[#2E2E2E] shadow-sm"
      >
        <GoogleIcon />
        <span className="ml-2">{AUTH_COPY.login.googleLabel}</span>
      </Button>

      <OrDivider label={AUTH_COPY.login.orDivider} />

      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <RoleToggle value={field.value} onChange={field.onChange} />
        )}
      />

      <div className="space-y-4">
        <FieldGroup label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            placeholder="you@studio.com"
            {...register('email')}
            className="h-11 rounded-lg bg-white border-[#B76E79]/20"
          />
          <FieldError message={errors.email?.message} />
        </FieldGroup>

        <FieldGroup label="Password" htmlFor="password">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="h-11 rounded-lg bg-white border-[#B76E79]/20 pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-foreground/45 transition-colors hover:text-[#B76E79] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B76E79]"
            >
              {showPassword ? (
                <Eye className="h-4 w-4" aria-hidden />
              ) : (
                <EyeOff className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
        </FieldGroup>
      </div>


      <Button
        type="submit"
        disabled={!isValid || isPending}
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
