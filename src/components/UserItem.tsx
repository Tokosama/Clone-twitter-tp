import { User } from "../types";

type Props = {
  user: User;
  onToggleFollow: (id: number) => void;
  currentUserId?: number;
};

const UserItem = ({ user, onToggleFollow, currentUserId }: Props) => {
  const isFollowing = currentUserId ? user.followers?.includes(currentUserId) : user.isFollowing;

  return (
    <div className="flex justify-between items-center border-b p-4 hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span className="text-xl">{user.username[0].toUpperCase()}</span>
            </div>
          </div>
          <div>
            <p className="font-bold text-lg">@{user.username}</p>
            <p className="text-gray-600">{user.fullName}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>{user.followers?.length || 0} followers</span>
              <span>{user.following?.length || 0} following</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => onToggleFollow(user.id)}
        className={`btn ${isFollowing ? "btn-error" : "btn-primary"} text-white min-w-[100px]`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserItem;
