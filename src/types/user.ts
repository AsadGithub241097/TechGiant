/**
 * Shared user shapes for legacy localStorage flows and email helpers.
 * Firebase profiles use `AppUser` in `FirebaseAuthContext`.
 */
export interface LegacyUser {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  status: "pending" | "approved" | "denied";
  createdAt: string;
  approvedAt?: string;
  loginMethod: "manual" | "email" | "google" | "facebook";
}

/** @deprecated Prefer `LegacyUser` — alias kept for gradual migration */
export type User = LegacyUser;
