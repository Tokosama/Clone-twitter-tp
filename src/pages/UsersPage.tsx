// src/pages/UsersPage.tsx
import React from "react";
import UserList from "../components/UserList";
import { useUsers } from "../hooks/useUsers";

const UsersPage: React.FC = () => {
  const { users, loading, handleToggleFollow, setSearch } = useUsers();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <input 
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users"
        className="border p-2 w-full mb-4"
      />
      <UserList users={users} onToggleFollow={handleToggleFollow} />
    </div>
  );
};

export default UsersPage;
