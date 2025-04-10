import React from 'react';
import { Tweet } from '../types/Tweet';
//import './TweetItem.css';

interface TweetItemProps {
  tweet: Tweet;
}

const TweetItem: React.FC<TweetItemProps> = ({ tweet }) => {
  const formattedTimestamp = new Date(tweet.timestamp).toLocaleString();

  return (
    <div className="tweet-item">
      <p className="tweet-content">{tweet.content}</p>
      <span className="tweet-timestamp">{formattedTimestamp}</span>
      <p className="tweet-author-uid">Auteur UID: {tweet.uid}</p>
      {/* Les fonctionnalités liées à l'utilisateur connecté seront gérées ailleurs si nécessaire */}
    </div>
  );
};

export default TweetItem;