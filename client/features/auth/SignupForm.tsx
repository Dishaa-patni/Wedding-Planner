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
import { signupSchema, type SignupFormValues } from './schemas'
import { AUTH_COPY } from './constants'
import { SITE, USER_ROLES } from '@/constants'
import { useGoogleOAuth, useRegisterUser } from './hooks'

const INITIAL_FORM: SignupFormValues = {
  role: USER_ROLES.ADMIN,
  // companyName: '',
  ownerName: '',
  email: '',
  password: '',
  confirmPassword: '',
  inviteCode: '',
  agreedToTerms: false,
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-xs text-[#DC2626]">{message}</p>
}

export default function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const registerUser = useRegisterUser()
  const { startGoogleOAuth } = useGoogleOAuth()
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
  } = useForm<SignupFormValues>({
    defaultValues: INITIAL_FORM,
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  })

  const role = watch('role')
  const isTeam = role === USER_ROLES.TEAM
  const isPending = isSubmitting || registerUser.isPending

  const onSubmit = async (values: SignupFormValues) => {
    await registerUser.mutateAsync(values)
    reset(INITIAL_FORM)
    router.push('/dashboard')
  }

  const onGoogleSignup = () => {
    startGoogleOAuth(isTeam ? getValues('inviteCode') : undefined)
  }
  const passwordField = register('password', {
    onChange: () => {
      if (!getValues('confirmPassword')) return

      void trigger('confirmPassword')
    },
  })

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
          {AUTH_COPY.signup.heading}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-foreground/65">
          {AUTH_COPY.signup.subheading}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onGoogleSignup}
        className="w-full rounded-full py-6 border-[#B76E79]/25 bg-white hover:bg-white/95 text-[#2E2E2E] shadow-sm"
      >
        <GoogleIcon />
        <span className="ml-2">{AUTH_COPY.signup.googleLabel}</span>
      </Button>

      <OrDivider label={AUTH_COPY.signup.orDivider} />

      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <RoleToggle value={field.value} onChange={field.onChange} />
        )}
      />

      <div className="space-y-4">
        {/* {!isTeam && (
          <FieldGroup label="Company Name" htmlFor="companyName">
            <Input
              id="companyName"
              placeholder="Enter Your Company Name"
              {...register('companyName')}
              className="h-11 rounded-lg bg-white border-[#B76E79]/20"
            />
            <FieldError message={errors.companyName?.message} />
          </FieldGroup>
        )} */}

        <FieldGroup label={isTeam ? 'Full Name' : 'Owner Name'} htmlFor="ownerName">
          <Input
            id="ownerName"
            placeholder="Enter Your Full Name"
            {...register('ownerName')}
            className="h-11 rounded-lg bg-white border-[#B76E79]/20"
          />
          <FieldError message={errors.ownerName?.message} />
        </FieldGroup>

        {isTeam && (
          <FieldGroup label="Invite Code" htmlFor="inviteCode">
            <Input
              id="inviteCode"
              placeholder="VIVAHA-XXXXX"
              {...register('inviteCode')}
              className="h-11 rounded-lg bg-white border-[#B76E79]/20 tracking-widest uppercase"
            />
            <FieldError message={errors.inviteCode?.message} />
          </FieldGroup>
        )}

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldGroup label="Password" htmlFor="password">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...passwordField}
                className="h-11 rounded-lg bg-white border-[#B76E79]/20 pr-10"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/45 transition-colors hover:text-[#B76E79] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B76E79] rounded-sm"
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

          <FieldGroup label="Confirm" htmlFor="confirmPassword">
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                className="h-11 rounded-lg bg-white border-[#B76E79]/20 pr-10"
              />
              <button
                type="button"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/45 transition-colors hover:text-[#B76E79] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B76E79] rounded-sm"
              >
                {showConfirmPassword ? (
                  <Eye className="h-4 w-4" aria-hidden />
                ) : (
                  <EyeOff className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
            <FieldError message={errors.confirmPassword?.message} />
          </FieldGroup>
        </div>
      </div>

      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <Controller
            control={control}
            name="agreedToTerms"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(value) => field.onChange(value === true)}
                className="mt-0.5 border-[#B76E79]/40 data-[state=checked]:bg-[#B76E79]"
              />
            )}
          />
          <span className="text-[13px] text-foreground/70 leading-relaxed">
            I agree to {SITE.name}’s{' '}
            <a href="#" className="text-[#B76E79] hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#B76E79] hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <FieldError message={errors.agreedToTerms?.message} />
      </div>

      <Button
        type="submit"
        disabled={!isValid || isPending}
        className="w-full rounded-full py-6 bg-[#B76E79] hover:bg-[#a55e69] text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isTeam ? AUTH_COPY.signup.submitTeam : AUTH_COPY.signup.submit}
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Button>

      <div className="text-center text-sm text-foreground/65">
        {AUTH_COPY.signup.footerText}{' '}
        <Link
          href={AUTH_COPY.signup.footerHref}
          className="text-[#B76E79] hover:underline font-medium"
        >
          {AUTH_COPY.signup.footerLink}
        </Link>
      </div>
    </motion.form>
  )
}
