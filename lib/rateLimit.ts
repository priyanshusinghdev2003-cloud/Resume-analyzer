import { redis } from "./redis";

const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 60 * 60 * 24;

export async function checkLimit(key: string) {
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  return {
    allowed: count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - count),
  };
}

export const fetchLimit = async (key: string) => {
  const count = await redis.get(key);
  return count;
};
