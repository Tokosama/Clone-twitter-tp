import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Tweet from './Tweet';
import { ITweet } from '../types';

const NewsFeed: React.FC = () => {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
      const tweetsData: ITweet[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<ITweet, 'id'>)
      }));
      setTweets(tweetsData);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default NewsFeed;