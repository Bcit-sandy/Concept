import styles from "./concept-card.module.css";

export function ConceptCard({ concept, onSelect }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <p className={styles.kicker}>Concept</p>
        <h3>{concept.title}</h3>
      </div>

      <p className={styles.summary}>{concept.summary}</p>

      <dl className={styles.meta}>
        <div>
          <dt>Target scenario</dt>
          <dd>{concept.target_scenario}</dd>
        </div>
        <div>
          <dt>Problem solved</dt>
          <dd>{concept.problem_solved}</dd>
        </div>
        <div>
          <dt>Interaction model</dt>
          <dd>{concept.interaction_model}</dd>
        </div>
        <div>
          <dt>Visual direction</dt>
          <dd>{concept.visual_direction}</dd>
        </div>
      </dl>

      <ul className={styles.features}>
        {concept.key_features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <button className={styles.button} onClick={() => onSelect(concept.id)} type="button">
        Select concept
      </button>
    </article>
  );
}

