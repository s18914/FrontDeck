ALTER TABLE "repeat" DROP CONSTRAINT "repeat_userId_questionId_unique";--> statement-breakpoint
CREATE INDEX "repeat_user_due_idx" ON "repeat" USING btree ("user_id","due_date");