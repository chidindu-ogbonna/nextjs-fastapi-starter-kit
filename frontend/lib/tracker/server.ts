import { track } from "@vercel/analytics/server";

export function trackServerEvent(eventName: string, data: Record<string, any>) {
  return track(eventName, data);
}
