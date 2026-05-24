import { NextResponse } from "next/server";
import {
  generateVariationRequestSchema,
  generateVariationResponseSchema
} from "@/lib/concept-generator/schemas";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = generateVariationRequestSchema.parse(body);
    const nextConcept = {
      ...payload.concept,
      id: `${payload.concept.id}_variant`,
      title: `${payload.concept.title} Variant`,
      summary: `${payload.concept.summary} Variation intent: ${payload.variationPrompt}.`,
      visual_direction: `${payload.concept.visual_direction}, tuned for ${payload.variationPrompt.toLowerCase()}`,
      differentiator: `${payload.concept.differentiator} Adapted to emphasize ${payload.variationPrompt.toLowerCase()}.`,
      assumptions: [
        ...payload.concept.assumptions,
        `Variation requested: ${payload.variationPrompt}`
      ]
    };

    const response = generateVariationResponseSchema.parse({ concept: nextConcept });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate variation."
      },
      { status: 400 }
    );
  }
}

