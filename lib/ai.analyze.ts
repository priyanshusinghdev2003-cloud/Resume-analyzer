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

Return JSON ONLY with:
- matchScore (0–100)
- strengths (array)
- missingSkills (array)
- improvementSuggestions (array)
- keywordMatch (array)
- summary (string)

Resume:
${resumeText}

Job Description:
${jobDescription}
      `,
  });
  const cleaned = cleanJson(text);
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("AI raw output:", cleaned);
    throw new Error("Invalid AI response format");
  }
};
