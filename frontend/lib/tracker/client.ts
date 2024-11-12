import { track } from "@vercel/analytics/react";

export function trackClientEvent(eventName: string, data: Record<string, any>) {
  return track(eventName, data);
}
