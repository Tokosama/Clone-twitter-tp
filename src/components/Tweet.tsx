// src/components/Tweet.tsx
import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { ITweet } from '../types';
import { MessageSquare, Repeat, Share, Heart, HeartOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getDoc } from 'firebase/firestore';


interface TweetProps {
  tweet: ITweet;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted || false);
  const [likesCount, setLikesCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount || 0);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    // Update time every minute
    const updateTime = () => {
      if (tweet.createdAt?.toDate) {
        setTimeAgo(
          formatDistanceToNow(tweet.createdAt.toDate(), {
            addSuffix: true,
            locale: fr
          })
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [tweet.createdAt]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (auth.currentUser) {
        const { uid } = auth.currentUser;
        const tweetRef = doc(db, 'tweets', tweet.id);
        // Check if the current user has liked the tweet
        const tweetDoc = await getDoc(tweetRef);
        if (tweetDoc.exists()) {
          const tweetData = tweetDoc.data();
          if (tweetData && tweetData.likes && tweetData.likes.includes(uid)) {
            setIsLiked(true);
          }
          setLikesCount(tweetData.likes ? tweetData.likes.length : 0);
        }
      }
    };

    fetchLikes();
  }, [tweet.id]);

  const handleLike = async () => {
    if (!auth.currentUser) return;

    try {
      const { uid } = auth.currentUser;
      const tweetRef = doc(db, 'tweets', tweet.id);

      if (isLiked) {
        // Unlike the tweet
        await updateDoc(tweetRef, {
          likes: arrayRemove(uid)
        });
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        // Like the tweet
        await updateDoc(tweetRef, {
          likes: arrayUnion(uid)
        });
        setIsLiked(true);
        setLikesCount(likesCount + 1);
      }
    } catch (error) {
      console.error("Erreur lors du like/unlike :", error);
    }
  };

  const handleRetweet = async () => {
    if (!auth.currentUser) return;

    try {
      const tweetRef = doc(db, 'tweets', tweet.id);
      const newRetweetCount = isRetweeted ? retweetCount - 1 : retweetCount + 1;
      
      await updateDoc(tweetRef, {
        retweetCount: newRetweetCount,
        isRetweeted: !isRetweeted
      });

      setIsRetweeted(!isRetweeted);
      setRetweetCount(newRetweetCount);
    } catch (error) {
      console.error("Erreur lors du retweet :", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4 max-w-xl mx-auto">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-bold text-lg text-gray-900">{tweet.displayName}</h4>
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>
      </div>
      
      {tweet.text && <p className="text-gray-700 mt-2">{tweet.text}</p>}
      
      {tweet.imageUrl && (
        <div className="mt-3">
          <img
            src={tweet.imageUrl}
            alt="Illustration du tweet"
            className="rounded-lg max-h-80 w-full object-cover"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-6 text-gray-500">
          <button className="flex items-center hover:text-blue-500 transition-colors">
            <MessageSquare size={18} />
          </button>
          
          <button 
            onClick={handleRetweet}
            className={`flex items-center space-x-1 transition-colors ${
              isRetweeted ? 'text-green-500' : 'hover:text-green-500'
            }`}
          >
            <Repeat size={18} />
            {retweetCount > 0 && <span>{retweetCount}</span>}
          </button>
          
          <button className="flex items-center hover:text-blue-600 transition-colors">
            <Share size={18} />
          </button>
        </div>
        
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 transition-colors ${
            isLiked ? 'text-red-500' : 'hover:text-red-500'
          }`}
        >
          {isLiked ? <Heart size={18} fill="currentColor" /> : <HeartOff size={18} />}
          <span className="ml-1">{likesCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Tweet;
