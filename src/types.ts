// src/types.ts

// src/types.ts
export interface ITweet {
  id: string;
  uid: string;
  text: string;
  displayName?: string;
  username: string;
  likes: number;
  createdAt: Date;
  imageUrl?: string | null;
  userId: string;
  retweetCount: number;
  isRetweeted?: boolean;
}

export interface IComment {
  id: string;
  text: string;

  displayName: string;
  username: string; 
 
  createdAt: Date;

}

export interface IUser {
  email: string;
  fullname: string;
  username: string;
}

// src/types.ts
export interface User {
  id: string; // ID du document Firestore, toujours une chaîne
  username: string;
  fullname: string;
  isFollowing: boolean;
}
