"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Progress({ result }: { result: any }) {
  return (
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
  );
}

export default Progress;
