import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { ITweet } from "../types";
import { MessageSquare, Repeat, Share, Heart, HeartOff } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface IComment {
  id: string;
  text: string;
  displayName: string;
  createdAt: any;
}

interface IUser {
  ID: string;
  email: string | null;
  fullname: string;
  username: string;
  avatarUrl?: string;
}

interface TweetProps {
  tweet: ITweet;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted || false);
  const [likesCount, setLikesCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount || 0);
  const [timeAgo, setTimeAgo] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (tweet.userId) {
        try {
          const userDocRef = doc(db, "users", tweet.userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserInfo(userDoc.data() as IUser);
          } else if (auth.currentUser?.uid === tweet.userId) {
            setUserInfo({
              ID: auth.currentUser.uid,
              fullname: auth.currentUser.displayName || "Utilisateur",
              username: auth.currentUser.email?.split("@")[0] || "utilisateur",
              email: auth.currentUser.email || null,
            });
          } else {
            setUserInfo({
              ID: tweet.userId,
              fullname: tweet.displayName || "Utilisateur",
              username: tweet.username || "utilisateur",
              email: null,
            });
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [tweet.userId, tweet.displayName, tweet.username]);

  useEffect(() => {
    const updateTime = () => {
      if (tweet.createdAt?.toDate) {
        setTimeAgo(
          formatDistanceToNow(tweet.createdAt.toDate(), {
            addSuffix: true,
            locale: fr,
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
        const tweetRef = doc(db, "tweets", tweet.id);
        const tweetDoc = await getDoc(tweetRef);

        if (tweetDoc.exists()) {
          const tweetData = tweetDoc.data();
          setIsLiked(tweetData?.likes?.includes(auth.currentUser.uid) || false);
          setLikesCount(tweetData?.likes?.length || 0);
        }
      }
    };
    fetchLikes();
  }, [tweet.id]);

  useEffect(() => {
    const commentsQuery = query(
      collection(db, "tweets", tweet.id, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IComment[];
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [tweet.id]);

  const handleLike = async () => {
    if (!auth.currentUser) return;

    try {
      const tweetRef = doc(db, "tweets", tweet.id);
      if (isLiked) {
        await updateDoc(tweetRef, { likes: arrayRemove(auth.currentUser.uid) });
        setLikesCount((prev) => prev - 1);
      } else {
        await updateDoc(tweetRef, {
          likes: arrayUnion(auth.currentUser.uid),
        });
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleRetweet = async () => {
    if (!auth.currentUser) return;

    try {
      const tweetRef = doc(db, "tweets", tweet.id);
      await updateDoc(tweetRef, {
        retweetCount: isRetweeted ? retweetCount - 1 : retweetCount + 1,
        isRetweeted: !isRetweeted,
      });
      setRetweetCount(isRetweeted ? retweetCount - 1 : retweetCount + 1);
      setIsRetweeted(!isRetweeted);
    } catch (error) {
      console.error("Error updating retweet:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !commentText.trim()) return;

    try {
      await addDoc(collection(db, "tweets", tweet.id, "comments"), {
        text: commentText,
        displayName: auth.currentUser.displayName || "Anonyme",
        createdAt: serverTimestamp(),
      });
      setCommentText("");
      setIsCommenting(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="border-y border-[#2f3336]  p-8 shadow-md rounded-lg   mx-auto">
      <div className="flex items-start mb-3">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
          {tweet.username?.charAt(0).toUpperCase() || (
            <img
              className=" w-12 h-12  "
              src={"./icons/user.svg"}
              alt=""
            />
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm text-gray-500">
              @{userInfo?.username || tweet.username || "utilisateur"}
            </span>
            <span className="text-sm text-gray-500">· {timeAgo}</span>
          </div>
        </div>
      </div>

      {tweet.text && (
        <p className="text-gray-400 text-lg mt-2 break-words">{tweet.text}</p>
      )}

      {tweet.imageUrl && (
        <div className="mt-3">
          <img
            src={tweet.imageUrl}
            alt="Tweet content"
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
            {comments.length > 0 && (
              <span className="ml-1">{comments.length}</span>
            )}
          </button>

          <button
            onClick={handleRetweet}
            className={`flex items-center space-x-1 ${
              isRetweeted ? "text-green-500" : "hover:text-green-500"
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
          className={`flex items-center space-x-1 text-gray-500 ${
            isLiked ? "text-red-500" : "hover:text-red-500"
          }`}
        >
          {isLiked ? (
            <Heart
              size={18}
              fill="currentColor"
            />
          ) : (
            <HeartOff size={18} />
          )}
          {likesCount > 0 ? <span>{likesCount}</span> : <span>0</span>}
        </button>
      </div>

      {isCommenting && (
        <form
          onSubmit={handleCommentSubmit}
          className="mt-4"
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button
              type="button"
              onClick={() => setIsCommenting(false)}
              className="px-4 py-2 rounded-full border border-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
            >
              Commenter
            </button>
          </div>
        </form>
      )}

      {comments.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-blue-500 hover:underline text-sm"
          >
            {showComments
              ? "Masquer les commentaires"
              : `Afficher les commentaires (${comments.length})`}
          </button>

          {showComments && (
            <div className="mt-2 space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-start"
                >
                  <div className="border border-[#2f3336] p-3 rounded-lg flex-1">
                    <div className="font-semibold">{comment.displayName}</div>
                    <div className="text-gray-700 mt-1">{comment.text}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tweet;
