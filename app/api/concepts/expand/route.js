import { NextResponse } from "next/server";
import { expandConcept } from "@/lib/concept-generator/service";
import {
  expandConceptRequestSchema,
  expandConceptResponseSchema
} from "@/lib/concept-generator/schemas";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = expandConceptRequestSchema.parse(body);
    const expanded = await expandConcept(payload.concept);
    const response = expandConceptResponseSchema.parse(expanded);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Expand API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to expand concept."
      },
      { status: 400 }
    );
  }
}
