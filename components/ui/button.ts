const base =
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  // The gradient is twice as wide as the button and slides to the right on hover.
  gradient:
    'bg-linear-to-r from-primary-700 via-accent-700 to-primary-700 bg-size-[200%_100%] bg-left text-white transition-[background-position] duration-500 ease-out hover:bg-right motion-reduce:transition-none',
  primary:
    'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900',
  outline:
    'border border-gray-400 hover:border-gray-600 dark:border-dark-border-strong dark:hover:border-gray-400',
  ghost: 'hover:bg-gray-100 dark:hover:bg-dark-high',
}

const sizes = {
  sm: 'h-8 rounded-md px-3 text-xs',
  md: 'h-10 rounded-md px-4 text-sm',
  lg: 'h-12 rounded-lg px-6 text-base',
}

type ButtonStyle = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

/**
 * Button classes for both `<button>` and `<Link>`, so a link can look like a
 * button without nesting a button inside an anchor.
 */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
}: ButtonStyle = {}) {
  return `${base} ${variants[variant]} ${sizes[size]}`
}
