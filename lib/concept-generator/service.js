import fs from "fs/promises";
import path from "path";
import { callModel } from "./client";
import { mockConcepts } from "./mock-data";

const PROMPTS_DIR = path.join(process.cwd(), "lib", "concept-generator", "prompts");

async function loadPrompt(filename) {
  const filePath = path.join(PROMPTS_DIR, filename);
  return await fs.readFile(filePath, "utf-8");
}

export async function generateConcepts(payload) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found, falling back to mock data.");
    return mockConcepts.map((concept, index) => ({
      ...concept,
      id: `concept_${index + 1}`,
      assumptions: [
        ...concept.assumptions,
        payload.constraints
          ? `Constraints considered: ${payload.constraints}`
          : "No additional constraints were provided."
      ]
    }));
  }

  const template = await loadPrompt("generate.md");
  const prompt = `
Generate 3 product concepts for the following brief:
Brief: ${payload.productBrief}
Target User: ${payload.targetUser}
Platform: ${payload.platform}
Adjectives: ${payload.adjectives.join(", ")}
Constraints: ${payload.constraints || "None"}
  `;
  
  return await callModel(prompt, template);
}

export async function generateVariation(concept, variationPrompt) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found, falling back to mock variation.");
    return {
      ...concept,
      id: `${concept.id}_variant`,
      title: `${concept.title} Variant`,
      summary: `${concept.summary} Variation intent: ${variationPrompt}.`,
      visual_direction: `${concept.visual_direction}, tuned for ${variationPrompt.toLowerCase()}`,
      differentiator: `${concept.differentiator} Adapted to emphasize ${variationPrompt.toLowerCase()}.`,
      assumptions: [
        ...concept.assumptions,
        `Variation requested: ${variationPrompt}`
      ]
    };
  }

  const template = await loadPrompt("variation.md");
  const prompt = `
Apply the following variation to this concept:
Variation: ${variationPrompt}

Concept to modify:
${JSON.stringify(concept, null, 2)}
  `;

  return await callModel(prompt, template);
}

export async function expandConcept(concept) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found, falling back to mock expansion.");
    return {
      conceptId: concept.id,
      refined_summary: concept.summary,
      feature_outline: concept.key_features,
      primary_user_flow: [
        "Enter a brief with target user and constraints",
        "Compare the generated concept directions",
        "Choose a concept to refine",
        "Apply a variation prompt if needed",
        "Expand the selected concept into a working outline"
      ],
      open_questions: [
        `How should ${concept.title} handle edge cases for ${concept.target_scenario.toLowerCase()}?`,
        `What evidence would validate the differentiator: ${concept.differentiator}?`
      ]
    };
  }

  const template = await loadPrompt("expand.md");
  const prompt = `
Expand the following concept into a deeper feature outline and user flow:

Concept:
${JSON.stringify(concept, null, 2)}
  `;

  return await callModel(prompt, template);
}
