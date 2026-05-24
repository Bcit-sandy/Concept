import fs from "fs/promises";
import path from "path";
import { callModel } from "./client";

const PROMPTS_DIR = path.join(process.cwd(), "lib", "concept-generator", "prompts");

async function loadPrompt(filename) {
  const filePath = path.join(PROMPTS_DIR, filename);
  return await fs.readFile(filePath, "utf-8");
}

export async function generateConcepts(payload) {
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
  const template = await loadPrompt("expand.md");
  const prompt = `
Expand the following concept into a deeper feature outline and user flow:

Concept:
${JSON.stringify(concept, null, 2)}
  `;

  return await callModel(prompt, template);
}
