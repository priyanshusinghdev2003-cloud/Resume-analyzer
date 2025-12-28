"use client";
import { ArrowRightIcon, FileBox, SearchCheck, TrendingUp } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./footer.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerData = [
  {
    title: "Instant Match Score",
    description:
      "See How well your resume matches the job description with a clear, easy-to-understand match score.",
    icon: <TrendingUp color="#24c421" />,
  },
  {
    title: "ATS Optimization Tips",
    description:
      "Get personalized recommendations to improve your resume's ATS compatibility and increase your chances of landing an interview.",
    icon: <SearchCheck color="#3cfbf8" />,
  },
  {
    title: "Keyword Analysis",
    description:
      "Identify the keywords that are most important for the job you're applying for and make sure your resume includes them.",
    icon: <FileBox color="#3cfbf8" />,
  },
];

function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.footerContent}`, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(`.${styles.footerCards} > div`, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
        },
      });

      gsap.from(`.${styles.footerLowerCard}`, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 65%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);
  return (
    <section className={styles.footer} ref={footerRef}>
      <div className={styles.footerImg} />
      <div className={styles.shading} />
      <div className={styles.footerCurve}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,0 C240,100 480,120 720,90 960,60 1200,20 1440,40 L1440,0 L0,0 Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
      <div className={styles.footerContent}>
        <h1>Powerful Features to Boost Your Job Search</h1>
        <Link href="/analyze">
          <button className={styles.primaryBtn}>
            Anaylze Resume <ArrowRightIcon />
          </button>
        </Link>
      </div>
      <div className={styles.footerCards}>
        {footerData.map((item, index) => (
          <div key={index}>
            <h2>
              {item.icon}
              {item.title}
            </h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div className={styles.footerLowerCard}>
        <h2>Ready to Land Your Dream Job?</h2>
        <p>Upload your resume now and boost your chances of getting hired.</p>
        <Link
          href="/analyze"
          className={styles.primaryBtn}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          Analyze Resume <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}

export default Footer;
