// components/Profile/ProfileHeader.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { firestore } from '../../lib/firebase';
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

interface ProfileHeaderProps {
  user: User;
  currentUser: User | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [unfollowing, setUnfollowing] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (currentUser && user.followers) {
      setIsFollowing(user.followers.includes(currentUser.uid));
    } else {
      setIsFollowing(false);
    }
  }, [currentUser, user.followers]);

  const handleUnfollow = async () => {
    if (!currentUser || unfollowing) return;

    setUnfollowing(true);
    try {
      const profileUserRef = doc(firestore, 'users', user.uid);
      const currentUserRef = doc(firestore, 'users', currentUser.uid);

      await updateDoc(profileUserRef, {
        followers: arrayRemove(currentUser.uid),
      });
      await updateDoc(currentUserRef, {
        following: arrayRemove(user.uid),
      });

      setIsFollowing(false);
    } catch (error: any) {
      console.error('Erreur lors du désabonnement:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur)
    } finally {
      setUnfollowing(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUser || following) return;

    setFollowing(true);
    try {
      const profileUserRef = doc(firestore, 'users', user.uid);
      const currentUserRef = doc(firestore, 'users', currentUser.uid);

      await updateDoc(profileUserRef, {
        followers: arrayUnion(currentUser.uid),
      });
      await updateDoc(currentUserRef, {
        following: arrayUnion(user.uid),
      });

      setIsFollowing(true);
    } catch (error: any) {
      console.error('Erreur lors de l\'abonnement:', error);
      // Gérer l'erreur
    } finally {
      setFollowing(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <img src={user.photoURL || '/default-avatar.png'} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <h1>{user.displayName || user.username || 'Utilisateur'}</h1>
      {currentUser && currentUser.uid !== user.uid && isFollowing && (
        <button onClick={handleUnfollow} disabled={unfollowing}>
          {unfollowing ? 'Désabonnement...' : 'Ne plus suivre'}
        </button>
      )}
      {currentUser && currentUser.uid !== user.uid && !isFollowing && (
        <button onClick={handleFollow} disabled={following}>
          {following ? 'Abonnement...' : 'Suivre'}
        </button>
      )}
      {/* Autres informations du profil */}
    </div>
  );
};

export default ProfileHeader;