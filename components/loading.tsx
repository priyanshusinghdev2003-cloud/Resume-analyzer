"use client";

import styles from "./loadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
      <p className={styles.text}>Analyzing your resume…</p>
    </div>
  );
}
