// src/components/TweetInput.tsx
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../lib/firebase';

const TweetInput: React.FC = () => {
  const [tweet, setTweet] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tweet.trim() && !imageFile) return;

    if (auth.currentUser) {
      const { uid, displayName } = auth.currentUser;
      let imageUrl: string | null = null;
      
      try {
        setIsUploading(true);
        
        if (imageFile) {
          const imageRef = ref(storage, `tweets/${uid}/${Date.now()}_${imageFile.name}`);
          const snapshot = await uploadBytes(imageRef, imageFile);
          imageUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(collection(db, 'tweets'), {
          text: tweet,
          createdAt: serverTimestamp(),
          userId: uid,
          displayName: displayName,
          retweetCount: 0,
          imageUrl: imageUrl,
        });

        setTweet('');
        setImageFile(null);
        setIsUploading(false);
      } catch (error) {
        console.error("Error posting tweet:", error);
        setIsUploading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mb-4 max-w-xl mx-auto">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="Quoi de neuf ?"
        className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
        rows={3}
      />
      
      <div className="mt-2 space-y-3">
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer text-blue-500 hover:text-blue-600">
            <ImageIcon size={20} />
            <span className="text-sm">Ajouter une image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Image preview"
              className="rounded-lg max-h-60 w-full object-cover"
            />
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={isUploading || (!tweet.trim() && !imageFile)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
          {isUploading ? "Publication..." : "Tweeter"}
        </button>
      </div>
    </form>
  );
};

export default TweetInput;
