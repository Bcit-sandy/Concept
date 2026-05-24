"use client";

import { useState } from "react";
import { BriefForm } from "@/components/brief-form";
import { ConceptDetail } from "@/components/concept-detail";
import { ConceptGrid } from "@/components/concept-grid";
import { ExpandedOutline } from "@/components/expanded-outline";
import styles from "./app-shell.module.css";

const initialBrief = {
  productBrief: "",
  targetUser: "",
  platform: "web",
  adjectives: [],
  constraints: ""
};

export function AppShell() {
  const [phase, setPhase] = useState("editingBrief");
  const [brief, setBrief] = useState(initialBrief);
  const [concepts, setConcepts] = useState([]);
  const [selectedConceptId, setSelectedConceptId] = useState(null);
  const [activeConcept, setActiveConcept] = useState(null);
  const [expandedConcept, setExpandedConcept] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const selectedConcept =
    activeConcept ?? concepts.find((concept) => concept.id === selectedConceptId) ?? null;

  async function handleGenerate(nextBrief) {
    setPhase("loadingConcepts");
    setErrorMessage(null);
    setBrief(nextBrief);

    try {
      const response = await fetch("/api/concepts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nextBrief)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to generate concepts.");
      }

      setConcepts(data.concepts);
      setSelectedConceptId(null);
      setActiveConcept(null);
      setExpandedConcept(null);
      setPhase("showingConcepts");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to generate concepts.");
      setPhase("error");
    }
  }

  async function handleVariation(variationPrompt) {
    if (!selectedConcept) {
      return;
    }

    setPhase("loadingVariation");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/concepts/variation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          concept: selectedConcept,
          variationPrompt
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to generate variation.");
      }

      setActiveConcept(data.concept);
      setExpandedConcept(null);
      setPhase("showingConceptDetail");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to generate variation.");
      setPhase("showingConceptDetail");
    }
  }

  async function handleExpand() {
    if (!selectedConcept) {
      return;
    }

    setPhase("loadingExpansion");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/concepts/expand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          concept: selectedConcept
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to expand concept.");
      }

      setExpandedConcept(data);
      setPhase("showingExpansion");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to expand concept.");
      setPhase("showingConceptDetail");
    }
  }

  function handleSelectConcept(conceptId) {
    setSelectedConceptId(conceptId);
    setActiveConcept(null);
    setExpandedConcept(null);
    setPhase("showingConceptDetail");
  }

  function handleReset() {
    setBrief(initialBrief);
    setConcepts([]);
    setSelectedConceptId(null);
    setActiveConcept(null);
    setExpandedConcept(null);
    setErrorMessage(null);
    setPhase("editingBrief");
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Concept Generator MVP</p>
        <h1>Turn vague product ideas into structured concept directions.</h1>
        <p className={styles.lead}>
          Start with a brief, compare three distinct concept directions, then vary and
          expand the strongest one without losing the core problem.
        </p>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Brief</h2>
            <p>Capture the product idea, audience, and design tone before generation.</p>
          </div>
          <button className={styles.ghostButton} onClick={handleReset} type="button">
            Start over
          </button>
        </div>

        <BriefForm
          initialValue={brief}
          isLoading={phase === "loadingConcepts"}
          onSubmit={handleGenerate}
        />

        {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
      </section>

      {concepts.length > 0 ? (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Concepts</h2>
              <p>Use comparison first. Each card sticks to the same structure.</p>
            </div>
          </div>
          <ConceptGrid concepts={concepts} onSelect={handleSelectConcept} />
        </section>
      ) : null}

      {selectedConcept ? (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Selected concept</h2>
              <p>Apply controlled changes or expand the current direction.</p>
            </div>
          </div>
          <ConceptDetail
            concept={selectedConcept}
            isLoadingVariation={phase === "loadingVariation"}
            isLoadingExpansion={phase === "loadingExpansion"}
            onExpand={handleExpand}
            onVariation={handleVariation}
          />
        </section>
      ) : null}

      {expandedConcept ? (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2>Expanded outline</h2>
              <p>Translate the chosen direction into something design work can pick up.</p>
            </div>
          </div>
          <ExpandedOutline expandedConcept={expandedConcept} />
        </section>
      ) : null}
    </main>
  );
}

