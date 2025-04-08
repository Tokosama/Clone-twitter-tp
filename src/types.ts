// src/types.ts
export interface User {
  id: string;           // ID du document Firestore, toujours une chaîne
  username: string;
  fullName: string;
  isFollowing: boolean;
}
