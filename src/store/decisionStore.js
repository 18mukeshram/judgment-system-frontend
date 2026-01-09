import { create } from "zustand";

export const useDecisionStore = create((set) => ({
  scenarioIndex: 0,
  decisions: [],
  selectedOptions: [],
  locked: false,
  startTime: null,
  endTime: null,

  startScenario: () =>
    set({
      selectedOptions: [],
      locked: false,
      startTime: Date.now(),
      endTime: null,
    }),

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

  lockDecision: () =>
    set((state) => ({
      locked: true,
      endTime: Date.now(),
      decisions: [
        ...state.decisions,
        {
          selectedOptions: state.selectedOptions,
          startTime: state.startTime,
          endTime: Date.now(),
        },
      ],
      scenarioIndex: state.scenarioIndex + 1,
    })),
}));
