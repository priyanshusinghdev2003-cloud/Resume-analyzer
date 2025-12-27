"use client";
import { File } from "lucide-react";
import React from "react";
import styles from "../src/app/home.module.css";

interface file {
  lastModified?: number;
  lastModifiedDate?: Date;
  name?: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
}

function FileInput() {
  const [file, setFile] = React.useState<file | null>(null);
  const [jobDescription, setJobDescription] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  return (
    <div className={styles.homeInputContainer}>
      <div className={styles.homeInputPdf}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button>
          <File />
          Upload Resume (PDF)
        </button>
      </div>
      <input
        type="text"
        name="jobDescription"
        id="jobDescription"
        placeholder="Paste your job description here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
    </div>
  );
}

export default FileInput;
