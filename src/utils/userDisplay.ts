import type { Timestamp } from 'firebase/firestore';

type UserLike = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export function buildFullName(firstName: string, lastName: string): string {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
}

export function resolveUserDisplayName(user: UserLike | null | undefined): string {
  if (!user) return 'Unknown';

  const fromParts = buildFullName(user.firstName ?? '', user.lastName ?? '');
  if (fromParts) return fromParts;

  const name = user.name?.trim();
  if (name) return name;

  const email = user.email?.trim();
  if (email) return email.split('@')[0];

  return 'Unknown';
}

export function parseFirestoreDate(
  value: Timestamp | string | { toDate?: () => Date } | undefined,
): Date {
  if (!value) return new Date(0);
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate();
  }
  return new Date(value as string);
}
