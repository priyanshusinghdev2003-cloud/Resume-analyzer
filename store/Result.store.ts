import { create } from "zustand";

interface Result {
  matchScore: number;
  strengths: string[];
  missingSkills: string[];
  improvementSuggestions: string[];
  keywordMatch: string[];
}
interface ResultStore {
  result: Result | null;
  setResult: (result: any) => void;
}

export const useResultStore = create<ResultStore>((set) => ({
  result: null,
  setResult: (result: any) => set({ result }),
}));
