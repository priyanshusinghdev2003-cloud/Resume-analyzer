"use client";

import React, { useEffect, useRef } from "react";
import styles from "./works.module.css";
import gsap from "gsap";
import Image from "next/image";

const worksData = [
  {
    title: "Upload Your Resume",
    description:
      "Upload your resume in PDF format to get it analyzed by our AI.",
    icon: <Image src="/works1.png" alt="step1" width={400} height={200} />,
    number: 1,
  },
  {
    title: "Get Your Match Score",
    description:
      "Receive an instant match score showing how well your resume matches the job description.",
    icon: <Image src="/works2.png" alt="step2" width={400} height={200} />,
    number: 2,
  },
  {
    title: "Improve Your Resume",
    description:
      "Get personalized tips and recommendations to enhance in your resume esstertially",
    icon: <Image src="/works3.png" alt="step3" width={400} height={200} />,
    number: 3,
  },
];

function HowWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.workCard}`, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} className={styles.works}>
      <div className={styles.worksHeading}>
        <h1>How It Works</h1>
        <p>Get started in three simple steps</p>
      </div>

      <div className={styles.worksFlow}>
        {worksData.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              position: "relative",
            }}
          >
            <div className={styles.workCard}>
              <div className={styles.icon}>{item.icon}</div>

              <div className={styles.cardHeader}>
                <span className={styles.step}>{item.number}</span>
                <h3>{item.title}</h3>
              </div>

              <p>{item.description}</p>
            </div>

            {index < worksData.length - 1 && (
              <div className={styles.arrowWrapper}>
                <span className={styles.arrowLine} />
                <span className={styles.arrowHead} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowWorks;
