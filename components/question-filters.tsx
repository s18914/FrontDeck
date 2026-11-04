import Form from 'next/form'
import Link from 'next/link'
import { buttonClasses } from './ui/button'

const LEVELS = ['junior', 'mid', 'senior']

const fieldClasses =
  'h-10 w-full rounded-md border-2 border-gray-500 bg-transparent px-3 text-sm dark:border-gray-400'

type QuestionFiltersProps = {
  categories: { slug: string; name: string }[]
  tags: string[]
  values: {
    search?: string
    category?: string
    level?: string
    tag?: string
  }
}

export function QuestionFilters({
  categories,
  tags,
  values,
}: QuestionFiltersProps) {
  return (
    <Form action="/questions" className="grid gap-4">
      {/* A new key remounts the fields, so their default values follow the URL
          after "Clear" or back/forward navigation. */}
      <div
        key={JSON.stringify(values)}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <label className="grid gap-1 text-sm font-medium">
          Search
          <input
            type="search"
            name="search"
            defaultValue={values.search}
            placeholder="e.g. closure"
            maxLength={100}
            className={fieldClasses}
          />
        </label>

        <SelectField
          label="Category"
          name="category"
          defaultValue={values.category}
          allLabel="All categories"
          options={categories.map((c) => ({ value: c.slug, label: c.name }))}
        />
        <SelectField
          label="Level"
          name="level"
          defaultValue={values.level}
          allLabel="All levels"
          options={LEVELS.map((level) => ({
            value: level,
            label: level[0].toUpperCase() + level.slice(1),
          }))}
        />
        <SelectField
          label="Tag"
          name="tag"
          defaultValue={values.tag}
          allLabel="All tags"
          options={tags.map((tag) => ({ value: tag, label: tag }))}
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" className={buttonClasses()}>
          Apply filters
        </button>
        <Link href="/questions" className={buttonClasses({ variant: 'ghost' })}>
          Clear
        </Link>
      </div>
    </Form>
  )
}

type SelectFieldProps = {
  label: string
  name: string
  defaultValue?: string
  allLabel: string
  options: { value: string; label: string }[]
  className?: string
}

function SelectField({
  label,
  name,
  defaultValue,
  allLabel,
  options,
  className = '',
}: SelectFieldProps) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <span className="relative">
        <select
          name={name}
          defaultValue={defaultValue ?? ''}
          className={`${fieldClasses} select-picker pr-10 ${className}`}
        >
          <option value="">{allLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  )
}
