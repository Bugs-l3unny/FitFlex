"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 30_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, TICK_MS);
  return () => clearInterval(id);
}

// Stable within a tick so React does not re-render needlessly.
function getSnapshot() {
  return Math.floor(Date.now() / TICK_MS) * TICK_MS;
}

/** Current time, refreshed every 30 s. Returns null on the server and during hydration. */
export function useNow(): Date | null {
  const timestamp = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return timestamp === null ? null : new Date(timestamp);
}
