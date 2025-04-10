// components/Profile/UserTweets.tsx
import React, { useState, useEffect } from 'react';
import { firestore } from '../../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Tweet } from '../../types/Tweet';
import TweetItem from '../TweetItem';
//import { auth } from '../../lib/firebase'; // Importez auth pour récupérer l'utilisateur connecté

interface UserTweetsProps {
  userId: string;
}

const UserTweets: React.FC<UserTweetsProps> = ({ userId }) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const currentUser = auth.currentUser; // Récupérez l'utilisateur connecté

  useEffect(() => {
    setLoading(true);
    setError(null);

    const tweetsRef = collection(firestore, 'tweets');
    const q = query(tweetsRef, where('uid', '==', userId), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userTweets: Tweet[] = [];
        snapshot.forEach((doc) => {
          userTweets.push({ id: doc.id, ...doc.data() } as Tweet);
        });
        setTweets(userTweets);
        setLoading(false);
      },
      (error) => {
        setError('Erreur lors de la récupération des tweets.');
        console.error('Erreur de récupération des tweets:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center align-middle items-center">
        <div className="w-fit">
          <span className="loading loading-ball loading-xl animate-spin"></span>
          Chargement des tweets...
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (tweets.length === 0) {
    return <div>Cet utilisateur n'a pas encore publié de tweets.</div>;
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default UserTweets;