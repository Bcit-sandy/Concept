"use client";

import { VariationControls } from "@/components/variation-controls";
import styles from "./concept-detail.module.css";

export function ConceptDetail({
  concept,
  isLoadingVariation,
  isLoadingExpansion,
  onVariation,
  onExpand
}) {
  return (
    <div className={styles.layout}>
      <article className={styles.detail}>
        <p className={styles.kicker}>Selected direction</p>
        <h3>{concept.title}</h3>
        <p className={styles.summary}>{concept.summary}</p>

        <div className={styles.section}>
          <h4>Target scenario</h4>
          <p>{concept.target_scenario}</p>
        </div>

        <div className={styles.section}>
          <h4>Problem solved</h4>
          <p>{concept.problem_solved}</p>
        </div>

        <div className={styles.section}>
          <h4>Interaction model</h4>
          <p>{concept.interaction_model}</p>
        </div>

        <div className={styles.section}>
          <h4>Key features</h4>
          <ul>
            {concept.key_features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Visual direction</h4>
          <p>{concept.visual_direction}</p>
        </div>

        <div className={styles.section}>
          <h4>Differentiator</h4>
          <p>{concept.differentiator}</p>
        </div>

        <div className={styles.section}>
          <h4>Main risk</h4>
          <p>{concept.main_risk}</p>
        </div>

        <div className={styles.section}>
          <h4>Assumptions</h4>
          <ul>
            {concept.assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </div>

        <button className={styles.expandButton} disabled={isLoadingExpansion} onClick={onExpand} type="button">
          {isLoadingExpansion ? "Expanding..." : "Expand concept"}
        </button>
      </article>

      <VariationControls isLoading={isLoadingVariation} onSubmit={onVariation} />
    </div>
  );
}

