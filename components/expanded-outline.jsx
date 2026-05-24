import styles from "./expanded-outline.module.css";

export function ExpandedOutline({ expandedConcept }) {
  return (
    <div className={styles.layout}>
      <article className={styles.card}>
        <p className={styles.kicker}>Refined summary</p>
        <p>{expandedConcept.refined_summary}</p>
      </article>

      <article className={styles.card}>
        <p className={styles.kicker}>Feature outline</p>
        <ul>
          {expandedConcept.feature_outline.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </article>

      <article className={styles.card}>
        <p className={styles.kicker}>Primary user flow</p>
        <ol>
          {expandedConcept.primary_user_flow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      <article className={styles.card}>
        <p className={styles.kicker}>Open questions</p>
        <ul>
          {expandedConcept.open_questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

