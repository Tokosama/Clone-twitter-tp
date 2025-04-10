import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '../../types/User';
import ProfileHeader from './ProfileHeader';
import UserTweets from './UserTweets';

interface ProfilePageProps {
  currentUser: User | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  const { userId } = useParams<{ userId: string }>();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        if (userId) {
          const userDocRef = doc(firestore, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setProfileUser(userDocSnap.data() as User);
          } else {
            setError('Utilisateur non trouvé.');
          }
        }
      } catch (error: any) {
        setError('Erreur lors de la récupération du profil.');
        console.error('Erreur de récupération du profil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center align-middle items-center">
        <div className="w-fit">
          <span className="loading loading-ball loading-xl animate-spin"></span>
          Chargement du profil...
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileUser) {
    return <div>Profil introuvable.</div>;
  }

  return (
    <div>
      <ProfileHeader user={profileUser} currentUser={currentUser} />
      <h2>Tweets de {profileUser.displayName || profileUser.username || 'Utilisateur'}</h2>
      {userId && <UserTweets userId={userId} />}
    </div>
  );
};

export default ProfilePage;