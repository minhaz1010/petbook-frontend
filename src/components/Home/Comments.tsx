import { FC, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, Edit2, Trash2 } from "lucide-react";
import { IComment } from "@/types";
import { detailsOfAUser } from '@/services/user/user.services';
import { useAuth } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentsProps {
  postId: string;
  comments: IComment[];
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
  onDislikeComment: (commentId: string) => void;
  onEditComment: (commentId: string, newContent: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export const Comments: FC<CommentsProps> = ({
  comments,
  onAddComment,
  onLikeComment,
  onDislikeComment,
  onEditComment,
  onDeleteComment
}) => {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [userIdOfCurrentUser, setUserIdOfCurrentUser] = useState("");
  const { userId } = useAuth();

  useEffect(() => {
    const userDetails = async () => {
      try {
        const data = await detailsOfAUser();
        if (data) {
          setUserIdOfCurrentUser(data?.data._id);
        }
      } catch (error) {
        console.error(error)
      }
    }
    userDetails();
  }, [])

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleEditComment = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleSaveEdit = (commentId: string) => {
    onEditComment(commentId, editContent);
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDeleteComment(commentId);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow text-white"
        />
        <Button onClick={handleSubmitComment}>Post</Button>
      </div>

      {comments && comments.map((comment) => (
        <div key={comment._id} className="flex items-start space-x-2 p-2  bg-gray-800 rounded-lg">
          <Avatar className="w-8 h-8 mr-3">
            <AvatarImage src={comment.author.imageURL} alt={comment.author.userName} />
            <AvatarFallback>{comment.author.userName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-semibold text-gray-200">{comment.author.userName}</p>
            {editingCommentId === comment._id ? (
              <div className="mt-1 flex items-center space-x-2">
                <Input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-grow text-white"
                />
                <Button size="sm" onClick={() => handleSaveEdit(comment._id)}>Save</Button>
              </div>
            ) : (
              <p className="text-sm text-gray-300">{comment.content}</p>
            )}
            <div className="mt-2 -ml-2 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLikeComment(comment._id)}
                className={`text-teal-500 hover:bg-teal-800 ${!userId && 'cursor-not-allowed'}`}
                title={`${!userId && 'please login'}`}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                {comment.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDislikeComment(comment._id)}
                className="text-teal-500 hover:text-teal-400 hover:bg-teal-500/20"
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                {comment.dislikes}
              </Button>
              {comment.author._id === userIdOfCurrentUser && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditComment(comment._id, comment.content)}
                    className="text-teal-500 hover:text-teal-400 hover:bg-teal-500/20"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};