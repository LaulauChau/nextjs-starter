import { type ClassValue, clsx } from "clsx";
import { createSafeActionClient } from "next-safe-action";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const action = createSafeActionClient();
