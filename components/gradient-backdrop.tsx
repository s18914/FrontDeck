export function GradientBackdrop() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[500px]">
      <div className="bg-brand-gradient absolute inset-0" />
      <div className="bg-fade-to-background absolute inset-0" />
    </div>
  )
}
