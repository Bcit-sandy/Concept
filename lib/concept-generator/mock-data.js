export const mockConcepts = [
  {
    title: "Signal Workshop",
    summary:
      "A structured concept lab that helps one designer compare three sharply different product directions from the same brief.",
    target_scenario:
      "A solo product designer needs credible directions before moving into wireframes.",
    problem_solved:
      "Early idea exploration is inconsistent when the product brief is still vague.",
    interaction_model:
      "The user submits a brief once and reviews a fixed set of concept cards side by side.",
    key_features: [
      "brief intake with constraints",
      "parallel concept generation",
      "card-based comparison"
    ],
    visual_direction: "editorial, warm, calm, structured, low-noise",
    differentiator:
      "The product emphasizes contrast between directions instead of collapsing everything into a single answer.",
    main_risk: "If the brief is thin, the concepts can still feel too adjacent.",
    assumptions: ["The user is exploring software concepts rather than service design."]
  },
  {
    title: "Constraint Lens",
    summary:
      "A concept generator tuned to show how the same idea changes under different product and delivery constraints.",
    target_scenario:
      "A PM needs to understand how constraints like low engineering lift or strict compliance affect product direction.",
    problem_solved:
      "Most ideation tools ignore delivery constraints until too late in the product process.",
    interaction_model:
      "The user defines a brief plus constraints, then reviews concept directions shaped by tradeoffs.",
    key_features: [
      "constraint-aware generation",
      "tradeoff framing",
      "risk-forward concept summaries"
    ],
    visual_direction: "precise, pragmatic, analytical, workshop-like",
    differentiator:
      "It surfaces tradeoffs early rather than treating constraints as an afterthought.",
    main_risk: "Outputs may become too operational if the prompt overweights constraints.",
    assumptions: ["The team values feasibility alongside novelty."]
  },
  {
    title: "Momentum Board",
    summary:
      "A concept exploration surface built to help teams choose one direction and move into action quickly.",
    target_scenario:
      "A designer and PM need a shared artifact to align on the strongest direction during an early planning session.",
    problem_solved:
      "Great ideas stall when teams lack a crisp way to compare and commit.",
    interaction_model:
      "The user generates concepts, picks a direction, and expands it into a follow-on outline without leaving the flow.",
    key_features: [
      "selection-first workflow",
      "guided concept expansion",
      "open-question capture"
    ],
    visual_direction: "confident, modern, presentation-ready, high-clarity",
    differentiator:
      "It turns concept selection into a direct handoff toward product planning.",
    main_risk: "The expansion step may imply certainty before the concept is validated.",
    assumptions: ["The user wants the artifact to feed a planning or review conversation."]
  }
];

