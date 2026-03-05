import { z } from "zod";

// Core User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
});
export type User = z.infer<typeof userSchema>;
export type InsertUser = Omit<User, "id">;

// Exercise schemas
export const exerciseOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});
export type ExerciseOption = z.infer<typeof exerciseOptionSchema>;

export const exerciseSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["definition_matching", "identity_guess", "case_selection", "component_matching"]),
  instructions: z.string(),
  question: z.string(),
  options: z.array(exerciseOptionSchema).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string(),
});
export type Exercise = z.infer<typeof exerciseSchema>;

// Lesson schemas
export const lessonItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortDescription: z.string(),
});
export type LessonItem = z.infer<typeof lessonItemSchema>;

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  items: z.array(lessonItemSchema),
  exercises: z.array(exerciseSchema),
});
export type Lesson = z.infer<typeof lessonSchema>;

// Progress schema for localStorage
export const progressSchema = z.object({
  completedExercises: z.array(z.string()),
  lessonStatus: z.record(z.string(), z.enum(["not_started", "in_progress", "completed"])),
  scores: z.record(z.string(), z.number()),
});
export type Progress = z.infer<typeof progressSchema>;
