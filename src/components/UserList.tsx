// src/components/UserList.tsx
import UserItem from "./UserItem"; 
import { User } from "../types";

type Props = {
  users: User[];
  onToggleFollow: (id: string) => void;
};

const UserList = ({ users, onToggleFollow }: Props) => {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} onToggleFollow={onToggleFollow} />
      ))}
    </div>
  );
};

export default UserList;
