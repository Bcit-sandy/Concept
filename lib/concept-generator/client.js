export async function callModel(prompt, systemInstruction) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  const url = `${baseUrl}?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system_instruction: systemInstruction ? {
        parts: [{ text: systemInstruction }]
      } : undefined,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Model API error: ${response.status} ${response.statusText} ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error("Model returned an empty response.");
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse model response as JSON:", text);
    throw new Error("Model response was not valid JSON.");
  }
}
