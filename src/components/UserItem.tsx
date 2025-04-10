import { User } from "../types/User";

type Props = {
  user: User;
  onToggleFollow: (id: number) => void;
};

const UserItem = ({ user, onToggleFollow }: Props) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p className="font-bold">@{user.username}</p>
        <p>{user.fullName}</p>
      </div>
      <button
        onClick={() => onToggleFollow(user.id!)}
        className={`btn ${user.isFollowing ? "btn-error" : "btn-primary"} text-white`}
      >
        {user.isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserItem;
