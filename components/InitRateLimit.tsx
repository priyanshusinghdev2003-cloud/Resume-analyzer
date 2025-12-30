"use client";

import { useEffect } from "react";
import { getDeviceId } from "../lib/deviceIdGenerator";

export default function InitRateLimit() {
  useEffect(() => {
    const init = async () => {
      const deviceId = await getDeviceId();
      if (!deviceId) return;

      const res = await fetch("/api/rate-limit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: `${deviceId}`,
        }),
      });

      const data = await res.json();
      console.log(data);

      localStorage.setItem("remainingTokens", String(data.limit));

      window.dispatchEvent(new Event("tokens-updated"));
    };

    init();
  }, []);

  return null; // no UI
}
