import { NextResponse } from "next/server";
import {
  expandConceptRequestSchema,
  expandConceptResponseSchema
} from "@/lib/concept-generator/schemas";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = expandConceptRequestSchema.parse(body);
    const response = expandConceptResponseSchema.parse({
      conceptId: payload.concept.id,
      refined_summary: payload.concept.summary,
      feature_outline: payload.concept.key_features,
      primary_user_flow: [
        "Enter a brief with target user and constraints",
        "Compare the generated concept directions",
        "Choose a concept to refine",
        "Apply a variation prompt if needed",
        "Expand the selected concept into a working outline"
      ],
      open_questions: [
        `How should ${payload.concept.title} handle edge cases for ${payload.concept.target_scenario.toLowerCase()}?`,
        `What evidence would validate the differentiator: ${payload.concept.differentiator}?`
      ]
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to expand concept."
      },
      { status: 400 }
    );
  }
}

