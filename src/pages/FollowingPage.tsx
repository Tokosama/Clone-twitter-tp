import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { getFollowing, toggleFollow } from '../services/userService';
import UserItem from '../components/UserItem';

const FollowingPage: React.FC = () => {
  const [following, setFollowing] = useState<User[]>([]);
  const currentUserId = 1; // TODO: Get from auth context

  useEffect(() => {
    loadFollowing();
  }, []);

  const loadFollowing = async () => {
    const followingUsers = await getFollowing(currentUserId);
    setFollowing(followingUsers);
  };

  const handleToggleFollow = async (targetUserId: number) => {
    await toggleFollow(currentUserId, targetUserId);
    await loadFollowing();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">People You Follow</h1>
      <div className="space-y-4">
        {following.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onToggleFollow={() => handleToggleFollow(user.id)}
          />
        ))}
        {following.length === 0 && (
          <p className="text-gray-500">You are not following anyone yet.</p>
        )}
      </div>
    </div>
  );
};

export default FollowingPage;
