export interface User {
    uid: string;
    displayName: string | null;
    username?: string;
    photoURL: string | null;
    following?: string[]; // Tableau des UIDs des utilisateurs que cet utilisateur suit
    followers?: string[]; // Tableau des UIDs des utilisateurs qui suivent cet utilisateur
    // Ajoutez ici d'autres propriétés de votre utilisateur, par exemple :
    // bio?: string;
    // location?: string;
    // website?: string;
    // createdAt?: number;
  }