"use client";

import styles from "./result.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useResultStore } from "../../../store/Result.store";
import { CheckCircle, XCircle, Lightbulb, Tag } from "lucide-react";

function Page() {
  const { result } = useResultStore();

  if (!result) return null;

  return (
    <div className={styles.resultContainer}>
      <div className={styles.Shading} />

      <h1 className={styles.resultHeader}>Resume Analysis Result</h1>

      <div className={styles.resultBody}>
        <div className={styles.resultCard}>
          <h2>Match Score</h2>
          <div className={styles.strokeLine} />

          <div className={styles.scoreWrapper}>
            <CircularProgressbar
              value={result.matchScore}
              maxValue={100}
              text={`${result.matchScore}`}
              styles={{
                path: {
                  stroke: result.matchScore >= 60 ? "#22c55e" : "#f97316",
                },
              }}
            />
          </div>
        </div>

        <div className={styles.resultCard}>
          <h2>Key Strengths</h2>
          <div className={styles.strokeLine} />

          <ul className={styles.list}>
            {result.strengths.map((item, i) => (
              <li key={i}>
                <CheckCircle color="#22c55e" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.resultCard}>
          <h2>Missing Skills</h2>
          <div className={styles.strokeLine} />

          <ul className={styles.list}>
            {result.missingSkills.map((item, i) => (
              <li key={i}>
                <XCircle color="#ef4444" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.resultCard}>
          <h2>Improvement Suggestions</h2>
          <div className={styles.strokeLine} />

          <ul className={styles.list}>
            {result.improvementSuggestions.map((item, i) => (
              <li key={i}>
                <Lightbulb color="#eab308" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.resultCardFull}>
          <h2>Keyword Matches</h2>
          <div className={styles.strokeLine} />

          <div className={styles.keywordGrid}>
            {result.keywordMatch.map((key, i) => (
              <span key={i} className={styles.keyword}>
                <Tag size={14} />
                {key}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.resultCardFull}>
          <h2>Summary</h2>
          <div className={styles.strokeLine} />
          <p className={styles.summaryText}>
            Your resume matches <b>{result.matchScore}%</b> of the job
            requirements. Strengthen missing skills and apply the suggestions
            above to improve ATS compatibility.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
