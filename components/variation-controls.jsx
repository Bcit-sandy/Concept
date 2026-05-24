"use client";

import { useState } from "react";
import styles from "./variation-controls.module.css";

const presets = [
  "Make it more consumer",
  "Make it more premium",
  "Make it simpler",
  "Make it more collaborative",
  "Make it more mobile-first"
];

export function VariationControls({ isLoading, onSubmit }) {
  const [customPrompt, setCustomPrompt] = useState("");

  return (
    <aside className={styles.panel}>
      <div>
        <p className={styles.kicker}>Variation controls</p>
        <h3>Change tone without changing the core problem.</h3>
      </div>

      <div className={styles.presets}>
        {presets.map((preset) => (
          <button
            className={styles.preset}
            disabled={isLoading}
            key={preset}
            onClick={() => void onSubmit(preset)}
            type="button"
          >
            {preset}
          </button>
        ))}
      </div>

      <label className={styles.field}>
        <span>Custom variation</span>
        <textarea
          onChange={(event) => setCustomPrompt(event.target.value)}
          placeholder="Make it more suitable for compliance-heavy B2B teams."
          rows={4}
          value={customPrompt}
        />
      </label>

      <button
        className={styles.submit}
        disabled={isLoading || customPrompt.trim().length === 0}
        onClick={() => void onSubmit(customPrompt.trim())}
        type="button"
      >
        {isLoading ? "Generating..." : "Generate variation"}
      </button>
    </aside>
  );
}

