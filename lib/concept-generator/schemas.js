import { z } from "zod";

export const conceptSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  target_scenario: z.string().min(1),
  problem_solved: z.string().min(1),
  interaction_model: z.string().min(1),
  key_features: z.array(z.string().min(1)).min(1),
  visual_direction: z.string().min(1),
  differentiator: z.string().min(1),
  main_risk: z.string().min(1),
  assumptions: z.array(z.string().min(1))
});

export const generateConceptsRequestSchema = z.object({
  productBrief: z.string().min(20),
  targetUser: z.string(),
  platform: z.enum(["web", "mobile", "desktop", "unknown"]),
  adjectives: z.array(z.string().min(1)).max(3),
  constraints: z.string()
});

export const generateConceptsResponseSchema = z.object({
  concepts: z.array(conceptSchema).length(3)
});

export const generateVariationRequestSchema = z.object({
  concept: conceptSchema,
  variationPrompt: z.string().min(3)
});

export const generateVariationResponseSchema = z.object({
  concept: conceptSchema
});

export const expandConceptRequestSchema = z.object({
  concept: conceptSchema
});

export const expandConceptResponseSchema = z.object({
  conceptId: z.string().min(1),
  refined_summary: z.string().min(1),
  feature_outline: z.array(z.string().min(1)).min(1),
  primary_user_flow: z.array(z.string().min(1)).min(1),
  open_questions: z.array(z.string().min(1)).min(1)
});

