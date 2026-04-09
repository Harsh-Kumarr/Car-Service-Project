import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

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
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });
      
      // 🧠 PROMPT ENGINEERING (VERY IMPORTANT)
      const prompt = `
You are an expert car mechanic AI.

Analyze the following vehicle issue:
"${issue}"

Respond ONLY in JSON format:
{
  "causes": ["cause1", "cause2"],
  "costEstimate": number,
  "urgency": "low | medium | high"
}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      

      // 🔥 Extract JSON safely
      const cleaned = text.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(cleaned);

      return parsed;

    } catch (error) {
      console.error("AI Error:", error);

      // fallback (important)
      return {
        
        causes: ["Unable to analyze issue"],
        costEstimate: 0,
        urgency: "low",
      };
    }
  }
}

export default new AIService();