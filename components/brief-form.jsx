"use client";

import { useEffect, useState } from "react";
import styles from "./brief-form.module.css";

const platformOptions = ["web", "mobile", "desktop", "unknown"];

export function BriefForm({ initialValue, isLoading, onSubmit }) {
  const [productBrief, setProductBrief] = useState(initialValue.productBrief);
  const [targetUser, setTargetUser] = useState(initialValue.targetUser);
  const [platform, setPlatform] = useState(initialValue.platform);
  const [adjectivesText, setAdjectivesText] = useState(initialValue.adjectives.join(", "));
  const [constraints, setConstraints] = useState(initialValue.constraints);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    setProductBrief(initialValue.productBrief);
    setTargetUser(initialValue.targetUser);
    setPlatform(initialValue.platform);
    setAdjectivesText(initialValue.adjectives.join(", "));
    setConstraints(initialValue.constraints);
  }, [initialValue]);

  async function handleSubmit(event) {
    event.preventDefault();
    const adjectives = adjectivesText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (productBrief.trim().length < 20) {
      setValidationError("The brief should have at least 20 characters of useful detail.");
      return;
    }

    if (adjectives.length > 3) {
      setValidationError("Use up to 3 adjectives so the model keeps a clear direction.");
      return;
    }

    setValidationError(null);
    await onSubmit({
      productBrief: productBrief.trim(),
      targetUser: targetUser.trim(),
      platform,
      adjectives,
      constraints: constraints.trim()
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>Product brief</span>
        <textarea
          name="productBrief"
          onChange={(event) => setProductBrief(event.target.value)}
          placeholder="Design a tool that helps product teams compare several viable feature directions before building."
          rows={6}
          value={productBrief}
        />
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Target user</span>
          <input
            name="targetUser"
            onChange={(event) => setTargetUser(event.target.value)}
            placeholder="Solo product designer at an early-stage startup"
            value={targetUser}
          />
        </label>

        <label className={styles.field}>
          <span>Platform</span>
          <select onChange={(event) => setPlatform(event.target.value)} value={platform}>
            {platformOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.field}>
        <span>Adjectives</span>
        <input
          name="adjectives"
          onChange={(event) => setAdjectivesText(event.target.value)}
          placeholder="minimal, practical, collaborative"
          value={adjectivesText}
        />
        <small>Comma-separated, up to three.</small>
      </label>

      <label className={styles.field}>
        <span>Constraints</span>
        <textarea
          name="constraints"
          onChange={(event) => setConstraints(event.target.value)}
          placeholder="Must keep engineering lift low and work for B2B teams."
          rows={4}
          value={constraints}
        />
      </label>

      {validationError ? <p className={styles.error}>{validationError}</p> : null}

      <button className={styles.submit} disabled={isLoading} type="submit">
        {isLoading ? "Generating..." : "Generate concepts"}
      </button>
    </form>
  );
}

