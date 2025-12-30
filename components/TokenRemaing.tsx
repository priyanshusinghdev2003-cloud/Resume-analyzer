"use client";

import { ArrowBigLeft, Coins } from "lucide-react";
import React, { useEffect, useState } from "react";
import styles from "./tokenRemaining.module.css";
import { usePathname, useRouter } from "next/navigation";

function TokenRemaining() {
  const [remaining, setRemaining] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const load = () => {
      const value = localStorage.getItem("remainingTokens");
      setRemaining(value ? Number(value) : 0);
    };

    load();
    window.addEventListener("tokens-updated", load);
    window.addEventListener("storage", load);

    return () => {
      window.removeEventListener("tokens-updated", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return (
    <div className={styles.navContainer}>
      {pathname !== "/" && (
        <ArrowBigLeft
          style={{
            cursor: "pointer",
            color: "#303132ff",
          }}
          onClick={() => router.back()}
        />
      )}
      <div className={styles.tokenBadge}>
        <Coins size={18} />
        <span className={styles.label}>Remaining</span>
        <span
          className={styles.count}
          style={{ color: remaining <= 1 ? "#ef4444" : "#22c55e" }}
        >
          {remaining}
        </span>
      </div>
    </div>
  );
}

export default TokenRemaining;
