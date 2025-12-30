import React from "react";
import styles from "./home.module.css";
import HowWorks from "../../components/HowWorks";
import Footer from "../../components/Footer";
import Link from "next/link";

async function Page() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.shading} />
        <div className={styles.heroContent}>
          <h1>
            Get Your Resume <span>Job-Ready</span>
          </h1>

          <p>
            Upload your resume and job description to instantly get your ATS
            match score, missing skills, and personalized improvements.
          </p>

          <div className={styles.heroActions}>
            <Link href="/analyze">
              <button className={styles.primaryBtn}>Analyze Resume</button>
            </Link>
            <span className={styles.subText}>Free • No signup required</span>
          </div>
        </div>

        <div className={styles.curve}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,0 C240,100 480,120 720,90 960,60 1200,20 1440,40 L1440,0 L0,0 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      <HowWorks />
      <Footer />
    </div>
  );
}

export default Page;
