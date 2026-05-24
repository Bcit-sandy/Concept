import { NextResponse } from "next/server";
import { generateVariation } from "@/lib/concept-generator/service";
import {
  generateVariationRequestSchema,
  generateVariationResponseSchema
} from "@/lib/concept-generator/schemas";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = generateVariationRequestSchema.parse(body);
    const concept = await generateVariation(payload.concept, payload.variationPrompt);
    const response = generateVariationResponseSchema.parse({ concept });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Variation API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate variation."
      },
      { status: 400 }
    );
  }
}
