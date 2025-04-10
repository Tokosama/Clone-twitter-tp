export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  username?: string;
  photoURL: string | null;
  fullName?: string; // Ajoutez fullName ici
  followers?: string[];
  following?: string[];
  isFollowing?: boolean;
  id?: number;
  // ... autres propriétés
}