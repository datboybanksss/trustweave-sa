export type UserType = 'individual' | 'partner' | 'lawyer' | 'fiduciary';
export type UserData = { fullName: string; email?: string; firmName?: string };

export function setUserSession(userType: UserType, userData: UserData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userType', userType);
  localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserType(): UserType | null {
  if (typeof window === 'undefined') return null;
  const t = localStorage.getItem('userType');
  return (t as UserType) || null;
}

export function getUserData(): UserData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('userData');
    return raw ? (JSON.parse(raw) as UserData) : null;
  } catch {
    return null;
  }
}

export function getGreetingName(defaultName = 'User') {
  const u = getUserData();
  if (!u?.fullName) return defaultName;
  const first = u.fullName.trim().split(/\s+/)[0];
  return first || u.fullName || defaultName;
}

export function clearUserSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('userType');
  localStorage.removeItem('userData');
}