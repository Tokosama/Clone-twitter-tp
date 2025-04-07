import React, { useState, useEffect } from 'react';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { ITweet } from '../types';
import { MessageSquare, Repeat, Share, Heart, HeartOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface IComment {
  id: string;
  text: string;
  displayName: string;
  createdAt: any;
}

interface TweetProps {
  tweet: ITweet;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted || false);
  const [likesCount, setLikesCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount || 0);
  const [timeAgo, setTimeAgo] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const commentsQuery = query(
      collection(db, 'tweets', tweet.id, 'comments'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const commentsData: IComment[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IComment[];
      setComments(commentsData);
    });
    return () => unsubscribe();
  }, [tweet.id]);

  const handleLike = async () => {
    if (!auth.currentUser) return;
    try {
      const { uid } = auth.currentUser;
      const tweetRef = doc(db, 'tweets', tweet.id);
      if (isLiked) {
        await updateDoc(tweetRef, {
          likes: arrayRemove(uid)
        });
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      } else {
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

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth.currentUser || !commentText.trim()) return;
    try {
      await addDoc(collection(db, 'tweets', tweet.id, 'comments'), {
        text: commentText,
        displayName: auth.currentUser.displayName,
        createdAt: serverTimestamp(),
      });
      setCommentText('');
      setIsCommenting(false);
      setShowComments(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4 max-w-xl mx-auto">
      <div className="flex items-start mb-3">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
          {tweet.displayName?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h4 className="font-bold text-lg text-gray-900">{tweet.displayName}</h4>
            <span className="text-base text-gray-900">@{tweet.username}</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">{timeAgo}</span>
          </div>
        </div>
      </div>

      {tweet.text && <p className="text-gray-700 text-lg mt-2">{tweet.text}</p>}

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
          <button
            onClick={() => setIsCommenting(!isCommenting)}
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            <MessageSquare size={18} />
            {comments.length > 0 && <span className="ml-1">{comments.length}</span>}
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

      {isCommenting && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            rows={2}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Envoyer
            </button>
          </div>
        </form>
      )}

      <div className="mt-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-500 hover:underline"
        >
          {showComments ? "Masquer les commentaires" : "Afficher les commentaires"}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 ml-8 border-l-2 border-gray-200 pl-4 space-y-2 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-2 rounded-md">
              <div className="font-semibold">{comment.displayName}</div>
              <div className="text-gray-900 text-sm mt-1">{comment.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;