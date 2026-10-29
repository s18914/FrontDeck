import {
  integer,
  text,
  pgTable,
  uuid,
  varchar,
  jsonb,
  timestamp,
  pgEnum,
  boolean,
  real,
  index,
  primaryKey,
  unique,
} from 'drizzle-orm/pg-core'

export type Link = {
  title: string
  url: string
}

export const ratingEnum = pgEnum('rating', ['again', 'hard', 'good', 'easy'])

export const categoryTable = pgTable('category', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  color: varchar({ length: 7 }).notNull(),
})

export const levelTable = pgTable('level', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
  rank: integer().notNull().unique(),
})

export const tagTable = pgTable('tag', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull().unique(),
})

export const questionTable = pgTable('question', {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  answer: text().notNull(),
  sources: jsonb().$type<Link[]>().notNull().default([]),
  categoryId: uuid()
    .notNull()
    .references(() => categoryTable.id),
  levelId: uuid()
    .notNull()
    .references(() => levelTable.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const questionTagTable = pgTable(
  'question_tag',
  {
    questionId: uuid()
      .notNull()
      .references(() => questionTable.id, { onDelete: 'cascade' }),
    tagId: uuid()
      .notNull()
      .references(() => tagTable.id),
  },
  (t) => [primaryKey({ columns: [t.questionId, t.tagId] })],
)

export const userTable = pgTable('user', {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const repeatTable = pgTable(
  'repeat',
  {
    id: uuid().primaryKey().defaultRandom(),
    questionId: uuid()
      .notNull()
      .references(() => questionTable.id, { onDelete: 'cascade' }),
    userId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
    easeFactor: real().notNull().default(2.5),
    repetitions: integer().notNull().default(0),
    intervalDays: integer().notNull().default(0),
    dueDate: timestamp({ withTimezone: true }),
    lastReviewedAt: timestamp({ withTimezone: true }),
    isBookmarked: boolean().notNull().default(false),
  },
  (t) => [
    unique('repeat_user_question_unique').on(t.userId, t.questionId),
    index('repeat_user_due_idx').on(t.userId, t.dueDate),
  ],
)

export const repeatLogTable = pgTable('repeat_log', {
  id: uuid().primaryKey().defaultRandom(),
  repeatId: uuid()
    .notNull()
    .references(() => repeatTable.id, { onDelete: 'cascade' }),
  rating: ratingEnum().notNull(),
  reviewedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
