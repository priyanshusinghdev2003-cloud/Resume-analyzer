import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import cleanJson from "../utils/helper";

export const getResumeAnalyzerResult = async (
  resumeText: string,
  jobDescription: string
) => {
  const { text } = await generateText({
    model: groq("llama-3.1-8b-instant"),
    maxRetries: 0,
    prompt: `
      You are an ATS and technical recruiter.

Analyze the resume and job description.

Return ONLY valid JSON. No explanation. No notes.
JSON format:
{
  "matchScore": number,
  "strengths": string[],
  "missingSkills": string[],
  "improvementSuggestions": string[],
  "keywordMatch": string[],
  "summary": string
}
Resume:
${resumeText}

Job Description:
${jobDescription}
      `,
  });
  const jsonText = cleanJson(text);
  if (!jsonText) {
    console.error("AI raw output (no JSON found):", text);
    return null; 
  }
  try {
    return JSON.parse(jsonText);
  } catch (e) {
    console.error("AI raw output:", jsonText);
    return null;
  }
};
