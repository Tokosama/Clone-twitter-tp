// src/types/index.ts
export interface User {
  id: string;          // ID du document Firestore
  username: string;
  fullName: string;
  isFollowing: boolean;
}

export interface ITweet {
  id: string;
  text: string;
  displayName: string;
  createdAt: unknown; // ou Timestamp si tu préfères importer Timestamp depuis 'firebase/firestore'
  likes: number;
  imageUrl?: string | null;
  userId: string;
  retweetCount: number;
  isLiked?: boolean;
  isRetweeted?: boolean;
  comments?: IComment[];
}

export interface IComment {
  userId: string;
  displayName: string;
  text: string;
  createdAt: unknown;
}
