// src/components/Comment.tsx
import React from 'react';
import { IComment } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CommentProps {
  comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const timeAgo = formatDistanceToNow(comment.createdAt.toDate(), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <div className="bg-gray-50 p-2 rounded-lg mt-1">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-bold text-sm text-gray-900">{comment.displayName}</h4>
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
    </div>
  );
};

export default Comment;
