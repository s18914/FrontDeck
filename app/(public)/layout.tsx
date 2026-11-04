import { GradientBackdrop } from '@/components/gradient-backdrop'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className="relative isolate flex flex-1 flex-col">
      <GradientBackdrop />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
