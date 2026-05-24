import { ConceptCard } from "@/components/concept-card";
import styles from "./concept-grid.module.css";

export function ConceptGrid({ concepts, onSelect }) {
  return (
    <div className={styles.grid}>
      {concepts.map((concept) => (
        <ConceptCard concept={concept} key={concept.id} onSelect={onSelect} />
      ))}
    </div>
  );
}

