// src/types.ts
import firebase from 'firebase/app';



// src/types.ts
export interface ITweet {
  id: string;
  text: string;
  displayName: string;
  username: string;
  likes: number;
  createdAt: any;
  imageUrl?: string | null;
  userId: string;
  retweetCount: number;
  isRetweeted?: boolean;
}

export interface IComment {
  userId: string;
  displayName: string;
  text: string;
  createdAt: any;
}

