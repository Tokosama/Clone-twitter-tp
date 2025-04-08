// src/components/UserItem.tsx
import React from "react";
import { User } from "../types";

type Props = {
  user: User;
  onToggleFollow: (id: string) => void;
};

const UserItem: React.FC<Props> = ({ user, onToggleFollow }) => {
  console.log(user);
  return (
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-4 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 rounded-md">
      {/* Infos utilisateur */}
      <div className="flex">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
          {user.username?.charAt(0).toUpperCase() || (
            <img
              className=" w-12 h-12  "
              src={"./icons/user.svg"}
              alt=""
            />
          )}
        </div>
        <div>
          <p className="font-semibold text-base text-gray-800 dark:text-white">
            @{user.username}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user.fullname}
          </p>
        </div>
      </div>

      {/* Bouton Follow/Unfollow */}
      <button
        onClick={() => onToggleFollow(user.id)}
        className={`btn btn-sm ${
          user.isFollowing ? "btn-error" : "btn-primary"
        } text-white capitalize`}
      >
        {user.isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserItem;
