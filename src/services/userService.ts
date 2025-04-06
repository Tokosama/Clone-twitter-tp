import { User } from "../types";

let users: User[] = [
  { id: 1, username: "elonmusk", fullName: "Elon Musk", isFollowing: false },
  { id: 2, username: "jack", fullName: "Jack Dorsey", isFollowing: false },
  { id: 3, username: "sundarpichai", fullName: "Sundar Pichai", isFollowing: true },
];

export const getUsers = async (): Promise<User[]> => {
  return new Promise((res) => setTimeout(() => res(users), 300));
};

export const toggleFollow = async (id: number): Promise<User[]> => {
  users = users.map((user) =>
    user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
  );
  return users;
};
