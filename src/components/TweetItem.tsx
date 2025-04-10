import React from 'react';
import { Tweet } from '../types/Tweet';
//import './TweetItem.css';
import { Link } from 'react-router-dom'

interface TweetItemProps {
  tweet: Tweet;
}

const TweetItem: React.FC<TweetItemProps> = ({ tweet }) => {

  return (
    <div className="tweet-item">
      <Link to={`/profile/${tweet.uid}`}>
        {/*<p className="tweet-author-uid">Voir le profil de l'utilisateur (UID: {tweet.uid})</p>*/}
        <p className="tweet-author-username">{tweet.username}</p>
      </Link>
      {/* Les fonctionnalités liées à l'utilisateur connecté seront gérées ailleurs si nécessaire */}
    </div>
  );
};

export default TweetItem;