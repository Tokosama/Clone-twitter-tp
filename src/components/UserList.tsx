// src/components/UserList.tsx
import React from "react";
import UserItem from "./UserItem";
import { User } from "../types";

type Props = {
  users: User[];
  onToggleFollow: (id: string) => void;
};

const UserList: React.FC<Props> = ({ users, onToggleFollow }) => {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} onToggleFollow={onToggleFollow} />
      ))}
    </div>
  );
};

export default UserList;
