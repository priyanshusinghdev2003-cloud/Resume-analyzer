"use client";
import { ArrowRight, File as FileIcon } from "lucide-react";
import React from "react";
import styles from "../src/app/analyze/analyze.module.css";
import { getDeviceId } from "../lib/deviceIdGenerator";
import { useResultStore } from "../store/Result.store";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loading";

function FileInput() {
  const [file, setFile] = React.useState<File | null>(null);
  const [jobDescription, setJobDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { setResult } = useResultStore();
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      const deviceId = await getDeviceId();
      formData.append("deviceId", deviceId);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setResult(data?.analysis);
        localStorage.setItem("remainingTokens", String(data.token));
 window.dispatchEvent(new Event("tokens-updated"));

        router.push("/result");
      }
 
    } catch (error) {
      console.error("Resume analysis failed:", error);
    } finally {
      setLoading(false);
      setFile(null);
      setJobDescription("");
    }
  };
  console.log(file)
  return (
    <>
      <div className={styles.homeInputContainer}>
        <div className={styles.homeInputPdf}>
         {file ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}>
            <span>{file.name?.length > 40 ? file.name.split(".")[0].replaceAll(" ","").slice(0,30)+(".pdf") : file.name}</span>
            <span style={{
              color: "gray",
              cursor: "pointer",
              padding: "0 6px",
              fontWeight: "bold",

            }}
            onClick={()=> setFile(null)}
            >x</span>
          </div>
         ) : (
          <>
           <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button>
            <FileIcon />
            Upload Resume (PDF)
          </button>
          </>
         )}
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
      <button
        className={styles.AnalyzeButton}
        onClick={handleAnalyze}
        disabled={loading}
      >
        Analyze My Resume
        <ArrowRight />
      </button>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default FileInput;
