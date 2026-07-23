'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, ImagePlus, Loader2, Sparkles, X } from 'lucide-react'
import { appToast } from '@/components/ui/app-toaster'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE } from '@/constants'

export default function OrganizationOnboardingScreen() {
  const router = useRouter()
  const [organizationName, setOrganizationName] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const logoPreviewUrl = useMemo(() => {
    if (!logoFile) return null

    return URL.createObjectURL(logoFile)
  }, [logoFile])

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl)
      }
    }
  }, [logoPreviewUrl])

  const canSubmit = organizationName.trim().length >= 2 && !isSubmitting

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!organizationName.trim()) {
      appToast.error({
        title: 'Organization name required',
        description: 'Add your company or organization name to continue.',
      })
      return
    }

    setIsSubmitting(true)

    appToast.success({
      title: 'Organization ready',
      description: 'Next we will save this through the organization API.',
    })

    router.push('/dashboard')
  }

  return (
    <main className="min-h-dvh bg-[#FFF9F6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-5xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B76E79]/20 bg-white px-4 py-2 text-sm font-medium text-[#B76E79] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Organization setup
            </div>

            <div>
              <h1 className="font-display text-4xl leading-tight text-[#2E2E2E] sm:text-5xl">
                Create your planning organization
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/65">
                This is your company-level space in {SITE.name}. Your team members and wedding workspaces
                will live under this organization.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-foreground/70">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6DDE1] text-[#B76E79]">1</span>
                Add your organization name
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBE9CF] text-[#B08750]">2</span>
                Upload a logo now or skip it
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6EEDD] text-[#7C9878]">3</span>
                Start creating wedding workspaces
              </div>
            </div>
          </section>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[#B76E79]/15 bg-white/85 p-5 shadow-xl shadow-[#B76E79]/10 backdrop-blur sm:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#B76E79] text-white shadow-md">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-[#2E2E2E]">Organization details</h2>
                <p className="mt-1 text-sm text-foreground/60">You can edit these details later in settings.</p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/55">
                  Organization name
                </span>
                <Input
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  placeholder="e.g. Disha Events"
                  className="h-12 rounded-xl border-[#B76E79]/20 bg-white text-base"
                />
              </label>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/55">
                  Logo optional
                </span>
                <div className="flex flex-col gap-4 rounded-xl border border-dashed border-[#B76E79]/30 bg-[#FFF9F6] p-4 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#B76E79]/20 bg-white">
                    {logoPreviewUrl ? (
                      <img src={logoPreviewUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImagePlus className="h-7 w-7 text-[#B76E79]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2E2E2E]">Upload your organization logo</p>
                    <p className="mt-1 text-xs leading-5 text-foreground/60">
                      PNG, JPG, or WEBP works best. This will appear in your dashboard header later.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button type="button" variant="outline" className="rounded-full" asChild>
                        <label>
                          Choose logo
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="sr-only"
                            onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
                          />
                        </label>
                      </Button>
                      {logoFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="rounded-full text-foreground/60"
                          onClick={() => setLogoFile(null)}
                        >
                          <X className="h-4 w-4" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!canSubmit}
              className="mt-7 h-12 w-full rounded-full bg-[#B76E79] text-white shadow-lg hover:bg-[#a55e69]"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Continue to dashboard
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
