import { useState, useEffect } from 'react';
import type { Comment } from '@type/comments';
import CommentsList from '@components/CommentsList/CommentsList';
import AddComment from '@components/AddComment/AddComment';
import './Comments.css';
import { useMovies } from '@contexts/movies/context';

interface CommentsProps {
  movieId: string | undefined;
}

const Comments = ({ movieId }: CommentsProps) => {
  const { loading, error } = useMovies();
  const [comments, setComments] = useState<Comment[]>([]);

  const defaultComments: Comment[] = [
    {
      id: '1',
      movieId: movieId ?? '',
      rating: 4,
      // eslint-disable-next-line quotes
      comment: `Having read the book a hundred years ago, it took some time to begin to understand what was going on. If there is a criticism that many share, it is the pacing of the first part of the film. It needed something to set the scene for us, to show us who the strong and the weak were. I'm not much for narration (show me, don't tell me), but it may not have been a bad idea. The scenes are magnificent with special effects off the chart. Many desert travel scenes are quite endless. How do you spruce up a desert. I thought the sand worms were a little one dimensional. I know there is another film down the road.`,
      CreatedBy: 'Alex',
      CreatedOn: new Date('2025-05-13')
    },
    {
      id: '2',
      movieId: movieId ?? '',
      rating: 5,
      comment: `I've never read Frank Herbert's novel or seen any other adaptation of "Dune", so I have to take Denis Villeneuve's adaptation as the guide. It's an impressive movie. Not just the visuals, but in the story's complexity. Timothée Chalamet continues to reaffirm himself as one of the greatest actors of his generation.
      
      I'm eager to see part 2, as well as David Lynch's adaptation.`,
      CreatedBy: 'Natalia',
      CreatedOn: new Date('2025-05-12')
    }
  ];

  const getStoredComments = (movieId: string): Comment[] | null => {
    // TODO: Reemplazar la implementación de localStorage con un servicio
    // que obtenga los comentarios de una DB (hacer el backend primero).
    // También mover al backend el "omdb-service".
    const storedComments = localStorage.getItem(`comments-${movieId}`);

    return storedComments ? JSON.parse(storedComments) : null;
  };

  const handleAddComment = (newComment: Comment) => {
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments-${movieId}`, JSON.stringify(updatedComments));
  };

  useEffect(() => {
    if (!movieId) return;
    const storedComments = getStoredComments(movieId);
    setComments(storedComments ?? defaultComments);
  }, [movieId]);

  if (loading || error) return null;
  else
    return (
      <section className="comments-container">
        <h2>Commentary</h2>
        <AddComment movieId={movieId} onAddComment={handleAddComment} />
        <CommentsList comments={comments} />
      </section>
    );
};

export default Comments;
