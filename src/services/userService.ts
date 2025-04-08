import { User, Post } from "../types";

let users: User[] = [
  { id: 1, username: "elonmusk", fullName: "Elon Musk", isFollowing: false, followers: [], following: [], likedPosts: [] },
  { id: 2, username: "jack", fullName: "Jack Dorsey", isFollowing: false, followers: [], following: [], likedPosts: [] },
  { id: 3, username: "sundarpichai", fullName: "Sundar Pichai", isFollowing: true, followers: [], following: [], likedPosts: [] },
];

let posts: Post[] = [];

export const getUsers = async (): Promise<User[]> => {
  return new Promise((res) => setTimeout(() => res(users), 300));
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  return users.find(user => user.id === id);
};

export const getFollowing = async (userId: number): Promise<User[]> => {
  const user = await getUserById(userId);
  if (!user?.following) return [];
  return users.filter(u => user.following?.includes(u.id));
};

export const toggleFollow = async (currentUserId: number, targetUserId: number): Promise<User[]> => {
  users = users.map((user) => {
    if (user.id === currentUserId) {
      const following = user.following || [];
      const isFollowing = following.includes(targetUserId);
      return {
        ...user,
        following: isFollowing
          ? following.filter(id => id !== targetUserId)
          : [...following, targetUserId]
      };
    }
    if (user.id === targetUserId) {
      const followers = user.followers || [];
      const isFollowed = followers.includes(currentUserId);
      return {
        ...user,
        followers: isFollowed
          ? followers.filter(id => id !== currentUserId)
          : [...followers, currentUserId]
      };
    }
    return user;
  });
  return users;
};

export const toggleLike = async (userId: number, postId: number): Promise<Post> => {
  const post = posts.find(p => p.id === postId);
  if (!post) throw new Error('Post not found');

  const isLiked = post.likedBy.includes(userId);
  if (isLiked) {
    post.likedBy = post.likedBy.filter(id => id !== userId);
    post.likes--;
  } else {
    post.likedBy.push(userId);
    post.likes++;
  }

  // Update user's liked posts
  users = users.map(user => {
    if (user.id === userId) {
      const likedPosts = user.likedPosts || [];
      return {
        ...user,
        likedPosts: isLiked
          ? likedPosts.filter(id => id !== postId)
          : [...likedPosts, postId]
      };
    }
    return user;
  });

  return post;
};
