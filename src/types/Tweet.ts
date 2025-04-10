export interface Tweet {
    id: string;
    username: string;
    uid: string;
    content: string;
    timestamp: number;
    likes?: string[]; // Tableau des UIDs des utilisateurs qui ont aimé le tweet
    // imageUrl?: string;
    // retweetCount?: number;
    // commentCount?: number;
  }