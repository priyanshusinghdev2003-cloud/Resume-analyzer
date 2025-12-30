import FingerprintJS from "@fingerprintjs/fingerprintjs";

let cachedDeviceId: string | null = null;

export async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) return cachedDeviceId;

  const stored = localStorage.getItem("deviceId");
  if (stored) {
    cachedDeviceId = stored;
    return stored;
  }

  const fp = await FingerprintJS.load();
  const result = await fp.get();

  cachedDeviceId = result.visitorId;
  localStorage.setItem("deviceId", cachedDeviceId);

  return cachedDeviceId;
}
