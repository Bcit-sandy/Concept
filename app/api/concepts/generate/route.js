import { NextResponse } from "next/server";
import { generateConcepts } from "@/lib/concept-generator/service";
import {
  generateConceptsRequestSchema,
  generateConceptsResponseSchema
} from "@/lib/concept-generator/schemas";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = generateConceptsRequestSchema.parse(body);
    const concepts = await generateConcepts(payload);
    const response = generateConceptsResponseSchema.parse({ concepts });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Generate API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate concepts."
      },
      { status: 400 }
    );
  }
}
