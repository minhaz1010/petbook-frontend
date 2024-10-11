import { FC, useState, useCallback, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from 'rc-image';
import 'rc-image/assets/index.css';
import { IPost } from "@/types";
import { useLikeAPost } from "@/hooks/post/useLikeAPost.hook";
import { useDislikeAPost } from "@/hooks/post/useDislikeAPost.hook";
import { useAuth } from "@clerk/nextjs";
import { jetbrains } from "@/config/font";
import Link from "next/link";
import { useCreateAComment } from "@/hooks/comment/useCreateAComment.hook";
import { useGetAllCommentsOfASinglePost } from "@/hooks/comment/useGetAllComment.hook";
import { useDeleteAComment } from "@/hooks/comment/useDeleteAComment.hook";
import { useLikeAComment } from "@/hooks/comment/useLikeAComment.hook";
import { useDislikeAComment } from "@/hooks/comment/useDislikeAComment.hook";
import { useEditAComment } from "@/hooks/comment/useEditAComment.hook";
import { detailsOfAUser } from "@/services/user/user.services";
import { PostBadge } from "./PostBadge";
import { EditButton } from "./EditButton";
import { FollowButton } from "./FollowButton";
import { PostContent } from "./PostContent";
import { Comments } from "./Comments";

export const PostCard: FC<{ post: IPost }> = ({ post }) => {
  const { mutate: handleLikeAPost } = useLikeAPost();
  const { mutate: handleDislikeAPost } = useDislikeAPost();
  const { mutate: handleComment } = useCreateAComment();
  const { data: comments, isLoading: loadingComments } = useGetAllCommentsOfASinglePost(post._id);
  const { mutate: deleteComment } = useDeleteAComment()
  const { mutate: handleLikeAComment } = useLikeAComment();
  const { mutate: handleDislikeAComment } = useDislikeAComment();
  const { mutate: handleEditAComment } = useEditAComment();
  const [showComments, setShowComments] = useState<boolean>(false);
  const [userMembership, setUserMembership] = useState<string>('REGULAR');
  const { userId } = useAuth();
  const pathName = usePathname()
  const isProfileRoute = pathName === '/profile';

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await detailsOfAUser();
        setUserMembership(data.data.membership);
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserDetails();

  }, [userId]);

  const toggleComments = () => {
    if (userId) {
      setShowComments(!showComments);
    }
  };

  const handleLike = useCallback(() => {
    handleLikeAPost(post._id);
  }, [handleLikeAPost, post._id]);

  const handleDislike = useCallback(() => {
    handleDislikeAPost(post._id);
  }, [handleDislikeAPost, post._id]);

  const handleAddComment = useCallback((content: string) => {
    const payload = {
      postId: post._id,
      content: content
    };
    handleComment(payload);
  }, [handleComment, post._id]);

  const handleLikeComment = (commentId: string) => {
    handleLikeAComment(commentId);
  };

  const handleDislikeComment = (commentId: string) => {
    handleDislikeAComment(commentId)
  };

  const handleEditComment = (commentId: string, newContent: string) => {
    const payload = {
      commentId: commentId,
      content: newContent
    }
    handleEditAComment(payload)
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  }

  const handleEditPost = () => {
    // Implement edit post logic
    console.log('Edit post:', post._id);
  };

  const handleDeletePost = () => {
    // Implement delete post logic
    console.log('Delete post:', post._id);
  };

  const handleFollow = () => {
    // Implement follow logic
    console.log('Follow user: id ', post.author._id);
  };

  return (
    <Card className={`mb-4 relative border-0 bg-gradient-to-b from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-black/20 ${jetbrains.className}`}>
      {
        !isProfileRoute &&
        <div className="absolute top-2 right-2 z-10">
          <PostBadge isPremium={post.isPremium} />
        </div>
      }
      {
        isProfileRoute ? (
          <div className="absolute top-2 bg-white right-14 z-10">
            <EditButton onEdit={handleEditPost} onDelete={handleDeletePost} />
          </div>
        ) : (

          <div className="absolute top-14 right-2 z-10">
            {
              userId && (userId !== post.author.userId) && (
                < FollowButton onFollow={handleFollow} />)
            }
            {/* {
              userId && user_id && userId !== user_id && (<FollowButton onFollow={handleFollow} />)
            } */}
          </div>

        )
      }

      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 border-b border-gray-700/50 p-3 sm:p-4">
        {
          !isProfileRoute &&
          <Avatar className="border-2 w-12 h-12 sm:w-14 sm:h-14 border-teal-500">
            <Link href={`/user/${post.author.userName}`}>
              <AvatarImage src={post?.author?.imageURL} alt={post?.author?.userName} />
            </Link>
            <AvatarFallback className="bg-teal-500 text-white">{post?.author.userName[0]}</AvatarFallback>
          </Avatar>
        }
        <div>
          <Link href={`/user/${post.author.userName}`} className="font-semibold text-gray-100 text-base sm:text-lg">{post.author.userName}</Link>
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <span className="text-teal-500">{post.petType}</span>
            <span className="text-teal-500">{post.postType}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-gray-200 p-3 sm:p-4">
        <h4 className="font-bold mb-2 text-white text-lg sm:text-xl">{post.title}</h4>
        <div className="mb-4">
          <PostContent
            content={post.content}
            isPremium={post.isPremium}
            userMembership={userMembership}
            userId={userId as string}
          />
        </div>
        {post.image.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {post.image.map((img, index) => (
              <div key={img.public_id} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={img.secure_url}
                  alt={`Post image ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  preview={{
                    mask: (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white backdrop-blur-sm">
                        <span className="bg-teal-500/80 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-base font-medium">
                          Click to view
                        </span>
                      </div>
                    ),
                    toolbarRender: () => null,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap justify-between border-t border-gray-700/50 p-2 sm:p-3">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <Button
            variant="ghost"
            onClick={handleLike}
            className={`text-teal-500 hover:bg-teal-800 ${!userId && 'cursor-not-allowed'}`}
            title={`${!userId && 'please login'}`}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {post.likes}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDislike}
            className={`text-teal-500 hover:bg-teal-800 ${!userId && 'cursor-not-allowed'}`}
            title={`${!userId && 'please login'}`}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            {post.dislikes}
          </Button>
          <Button
            variant="ghost"
            onClick={toggleComments}
            className={`text-teal-500 hover:bg-teal-800 ${!userId && 'cursor-not-allowed'}`}
            title={`${!userId && 'please login'}`}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            {comments?.length || 0}
          </Button>
        </div>

        <Button
          variant="ghost"
          className="text-teal-500 hover:bg-teal-800"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>

      {
        showComments && (
          <div className="px-3 sm:px-4 py-2 sm:py-3">
            {loadingComments ? (
              <p className="text-red-400">Loading comments...</p>
            ) : (
              <Comments
                postId={post._id}
                comments={comments || []}
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
                onDislikeComment={handleDislikeComment}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}
              />
            )}
          </div>
        )
      }
    </Card >
  );
};