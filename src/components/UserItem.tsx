// src/components/UserItem.tsx
import React from "react";
import { User } from "../types";

type Props = {
  user: User;
  onToggleFollow: (id: string) => void;
};

const UserItem: React.FC<Props> = ({ user, onToggleFollow }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p className="font-bold">@{user.username}</p>
        <p>{user.fullName}</p>
      </div>
      <button
        onClick={() => onToggleFollow(user.id)}
        className={`btn ${user.isFollowing ? "btn-error" : "btn-primary"} text-white`}
      >
        {user.isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserItem;
