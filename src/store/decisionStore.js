import { create } from "zustand";

export const useDecisionStore = create(() => ({
  currentScenarioId: null,
  selectedOptions: [],
  locked: false,
  startTime: null,
}));
