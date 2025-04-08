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
  