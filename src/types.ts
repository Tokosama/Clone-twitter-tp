import firebase from 'firebase/app';

export interface User {
  id: number;
  username: string;
  fullName: string;
  isFollowing: boolean;
  followers?: number[];
  following?: number[];
  likedPosts?: number[];
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  likes: number;
  likedBy: number[];
  timestamp: Date;
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
