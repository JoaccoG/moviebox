import { useState, useEffect } from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import type { Comment } from '@type/comments';
import './AddComment.style.css';

interface AddCommentProps {
  movieId: string | undefined;
  onAddComment: (comment: Comment) => void;
}

const AddComment = ({ movieId, onAddComment }: AddCommentProps) => {
  const [userName, setUserName] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRatingClick = (index: number) => {
    setRating(index + 1);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (inputText.length > 500) {
      setError('Your comment exceeds the 500-character limit.');

      return;
    }

    setError(null);
    setComment(inputText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Select a rating between 1 and 5.');

      return;
    }

    if (!userName.trim()) {
      setError('Enter your name to submit a comment.');

      return;
    }

    if (!comment.trim()) {
      setError('The comment cannot be empty.');

      return;
    }

    const newComment: Comment = {
      id: crypto.randomUUID(),
      movieId: movieId ?? '',
      rating,
      comment,
      CreatedBy: userName,
      CreatedOn: new Date()
    };

    onAddComment(newComment);
    setUserName('');
    setComment('');
    setRating(0);
  };

  useEffect(() => {
    setError(null);
  }, [rating, userName, comment]);

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <div className="rating-container">
        <span className="rating-label">Rate:</span>
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => (
            <button
              key={index + 1}
              type="button"
              className="star"
              onClick={() => handleRatingClick(index)}
              aria-label={`Rate ${index + 1} star${index + 1 > 1 ? 's' : ''}`}
              data-testid={`star-${index + 1}`}>
              {index < rating ? <IoIosStar className="filled-star" /> : <IoIosStarOutline className="empty-star" />}
            </button>
          ))}
        </div>
      </div>

      <div className="name-input-container">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your name"
          className="name-input w-full outline-none"
        />
      </div>

      <div className="comment-input-container">
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => handleCommentChange(e)}
          placeholder="Add your comments here"
          className="comment-input w-full outline-none"
        />
      </div>

      <div className="flex items-center justify-end mt-4 submit-container">
        {error && <p className="error-message text-red-500 text-sm">{error}</p>}
        <button type="submit" onClick={() => setError(null)} className="submit-button">
          Post
        </button>
      </div>
    </form>
  );
};

export default AddComment;
