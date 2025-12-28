import { create } from "zustand";

interface Result {
  matchScore: number;
  strengths: string[];
  missingSkills: string[];
  improvementSuggestions: string[];
  keywordMatch: string[];
}
interface ResultStore {
  result: Result;
  setResult: (result: any) => void;
}

export const useResultStore = create<ResultStore>((set) => ({
  result: {
    matchScore: 73,
    strengths: [
      "Hands-on experience in building modern web applications with React and Next.js",
      "Strong foundation in Data Structures & Algorithms",
      "Practical skills in Database Management Systems and Web Development",
      "Continuous project development and self-directed learning",
    ],
    missingSkills: [
      "Angular or Vue.js",
      "TypeScript (beyond basic knowledge)",
      "Docker and containerization",
      "CI/CD pipelines",
    ],
    improvementSuggestions: [
      "Develop projects with multiple frontend frameworks to enhance versatility",
      "Expand problem-solving skills with more challenging DSA problems",
      "Explore scalable backend technologies like GraphQL",
      "Learn industry-standard testing frameworks like Jest or Cypress",
    ],
    keywordMatch: [
      "React",
      "Next.js",
      "Java",
      "C++",
      "JavaScript",
      "TypeScript",
      "Frontend",
      "Full Stack",
      "Node.js",
      "Express.js",
    ],
    summary:
      "However, he may benefit from expanding his skills in multiple frontend frameworks (e.g., Angular or Vue.js) and exploring scalable backend technologies like GraphQL. Additionally, he can improve his problem-solving skills by practicing more challenging DSA problems and learn industry-standard testing frameworks to enhance  challenging DSA problems and learn industry-standard testing frameworks to enhance his coding skills.",
  },
  setResult: (result: any) => set({ result }),
}));
