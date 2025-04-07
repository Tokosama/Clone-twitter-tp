// src/types.ts
import firebase from 'firebase/app';



// src/types.ts
export interface User {
  id: number;           // ou string, selon ta logique
  username: string;
  fullName: string;
  isFollowing: boolean;
}

export interface ITweet {
  id: string;
  text: string;
  displayName: string;
  createdAt: any;
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
  createdAt: any;
}

