import type { Comment } from '@type/comments';
import './CommentsList.style.css';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(date).toLocaleDateString('en-GB', options).replace(',', '');
  };

  return (
    <div className="comments-list-container">
      {comments.length === 0 && <p>No comments yet. Be the first!</p>}
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-meta">
            <span className="comment-name">{comment.CreatedBy}</span> -{' '}
            <span className="comment-date">{getFormattedDate(comment.CreatedOn)}</span> -{' '}
            <span className="comment-rating">{comment.rating}/5</span>
          </div>
          <p className="comment-content">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
