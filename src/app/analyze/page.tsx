import Image from "next/image";
import styles from "./analyze.module.css";
import FileInput from "../../../components/FileInput";

function Page() {
  return (
    <div className={styles.homeSection}>
  
      <div className={styles.Shading} />

    
      <Image
        src="/bg.png"
        alt="AI resume analyzer illustration"
        width={520}
        height={520}
        priority
        className={styles.bgImage}
      />

   
      <div className={styles.homeContent}>
        <h1>Get Your Resume</h1>
        <h2>Job Ready in Seconds.</h2>
        <p>
          Upload your resume and job description to see your match score,
          strengths, areas for improvement, and personalized recommendations.
        </p>

        <FileInput />
        
      </div>
    </div>
  );
}

export default Page;
