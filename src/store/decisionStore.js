import { create } from "zustand";

export const useDecisionStore = create((set) => ({
  currentScenarioId: 1,
  selectedOptions: [],
  locked: false,
  startTime: null,

  setSelected: (id) =>
    set((state) => {
      if (state.locked) return state;

      const exists = state.selectedOptions.includes(id);

      return {
        selectedOptions: exists
          ? state.selectedOptions.filter((x) => x !== id)
          : [...state.selectedOptions, id],
      };
    }),

  setStartTime: (time) => set({ startTime: time }),

  lockDecision: () => set({ locked: true }),
}));
