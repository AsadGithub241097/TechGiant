/**
 * Admin identification for client-side UI gating only.
 * Authoritative access control must use Firestore security rules and/or Auth custom claims.
 */

function parseAdminEmailsFromEnv(): string[] {
  const raw = import.meta.env.VITE_ADMIN_EMAILS?.trim();
  if (!raw) {
    if (import.meta.env.DEV) {
      console.warn(
        "VITE_ADMIN_EMAILS is unset — no client-side admin emails. Set it in .env.local.",
      );
    }
    return [];
  }
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const ADMIN_EMAILS: readonly string[] = parseAdminEmailsFromEnv();

export function isAdmin(email: string): boolean {
  const lower = email.toLowerCase();
  return ADMIN_EMAILS.includes(lower);
}

export function getAdminBadge(): string {
  return "Admin";
}

/** Primary inbox for admin notification copy (falls back to first admin email). */
export function getAdminNotificationEmail(): string {
  const single = import.meta.env.VITE_ADMIN_NOTIFICATION_EMAIL?.trim();
  if (single) return single;
  if (ADMIN_EMAILS.length > 0) return ADMIN_EMAILS[0];
  return "";
}
