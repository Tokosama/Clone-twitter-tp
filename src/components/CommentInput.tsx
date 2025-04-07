// src/components/CommentInput.tsx
import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

interface CommentInputProps {
  tweetId: string;
  onCommentAdded: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ tweetId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (auth.currentUser) {
      const { uid, displayName } = auth.currentUser;

      try {
        setIsSubmitting(true);
        const tweetRef = doc(db, 'tweets', tweetId);
        await updateDoc(tweetRef, {
          comments: arrayUnion({
            userId: uid,
            displayName: displayName,
            text: comment,
            createdAt: new Date(),
          }),
        });

        setComment('');
        setIsSubmitting(false);
        onCommentAdded();
      } catch (error) {
        console.error('Error adding comment:', error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-2">
      <input
        type="text"
        placeholder="Ajouter un commentaire..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
      />
      <button
        type="submit"
        disabled={isSubmitting || !comment.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={16} />
      </button>
    </form>
  );
};

export default CommentInput;
