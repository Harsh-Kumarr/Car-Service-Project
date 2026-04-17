import { GoogleGenAI } from "@google/genai";

// The client automatically picks up GEMINI_API_KEY from process.env
const ai = new GoogleGenAI({});

class AIService {
  async diagnose(issue) {
    if (!issue) {
      return {
        causes: [],
        costEstimate: 0,
        urgency: "low",
      };
    }

    try {
      const prompt = `
You are an expert car mechanic AI.

Analyze the following vehicle issue:
"${issue}"

Respond ONLY in JSON format:
{
  "causes": ["cause1", "cause2"],
  "costEstimate": number*10,
  "urgency": "low | medium | high"
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const text = response.text;

      // Extract JSON safely
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      return parsed;

    } catch (error) {
      console.error("AI Error:", error);

      // SMART LOCAL MOCK AI (works without API key)
      const issueLower = issue.toLowerCase();
      
      let mockResponse = {
        causes: ["General wear and tear", "Requires physical inspection"],
        costEstimate: 1500,
        urgency: "medium",
      };

      if (issueLower.includes("brake") || issueLower.includes("squeak")) {
        mockResponse = {
          causes: ["Worn out brake pads", "Warped brake rotors"],
          costEstimate: 4500,
          urgency: "high",
        };
      } else if (issueLower.includes("engine") || issueLower.includes("start")) {
        mockResponse = {
          causes: ["Dead battery", "Faulty starter motor", "Spark plug failure"],
          costEstimate: 3000,
          urgency: "high",
        };
      } else if (issueLower.includes("ac") || issueLower.includes("cool")) {
        mockResponse = {
          causes: ["Refrigerant leak", "Damaged AC compressor"],
          costEstimate: 2000,
          urgency: "medium",
        };
      } else if (issueLower.includes("oil") || issueLower.includes("leak")) {
        mockResponse = {
          causes: ["Oil pan gasket leak", "Loose oil filter"],
          costEstimate: 800,
          urgency: "low",
        };
      }

      return mockResponse;
    }
  }
}

export default new AIService();