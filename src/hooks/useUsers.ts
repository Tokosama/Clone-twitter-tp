import { useEffect, useState } from "react";
import { getUsers, toggleFollow } from "../services/userService";
import { User } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleToggleFollow = async (id: number) => {
    const updated = await toggleFollow(id);
    setUsers(updated);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return { users: filteredUsers, loading, handleToggleFollow, setSearch };
};
