export const SCENARIOS = [
  {
    id: 1,
    title: "Budget Allocation",
    description:
      "You have ₹10,00,000 to allocate across departments. You must allocate all funds. Time is limited.",
    timeLimit: 90,
    options: [
      { id: "rnd", label: "R&D", risk: 3 },
      { id: "marketing", label: "Marketing", risk: 2 },
      { id: "operations", label: "Operations", risk: 1 },
      { id: "sales", label: "Sales", risk: 2 },
      { id: "support", label: "Support", risk: 1 },
    ],
  },
  {
    id: 2,
    title: "Hiring Decision",
    description: "You must hire one candidate. Information is incomplete.",
    timeLimit: 60,
    options: [
      { id: "a", label: "Candidate A (High skill, unknown loyalty)", risk: 3 },
      { id: "b", label: "Candidate B (Stable, low upside)", risk: 1 },
      { id: "c", label: "Candidate C (Fast learner, unproven)", risk: 2 },
    ],
  },
];
