import { NextResponse } from "next/server";
import { mockConcepts } from "@/lib/concept-generator/mock-data";
import {
  generateConceptsRequestSchema,
  generateConceptsResponseSchema
} from "@/lib/concept-generator/schemas";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = generateConceptsRequestSchema.parse(body);
    const response = generateConceptsResponseSchema.parse({
      concepts: mockConcepts.map((concept, index) => ({
        ...concept,
        id: `concept_${index + 1}`,
        assumptions: [
          ...concept.assumptions,
          payload.constraints
            ? `Constraints considered: ${payload.constraints}`
            : "No additional constraints were provided."
        ]
      }))
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate concepts."
      },
      { status: 400 }
    );
  }
}

