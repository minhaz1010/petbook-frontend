/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FC, useState, useCallback, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsDown, ThumbsUp, Trash, Edit, ExternalLink } from "lucide-react";
import Image from 'rc-image';
import 'rc-image/assets/index.css';
import { IPost } from "@/types";
import { useLikeAPost } from "@/hooks/post/useLikeAPost.hook";
import { useDislikeAPost } from "@/hooks/post/useDislikeAPost.hook";
import { useAuth } from "@clerk/nextjs";
import { nunito } from "@/config/font";
import Link from "next/link";
import { useCreateAComment } from "@/hooks/comment/useCreateAComment.hook";
import { useGetAllCommentsOfASinglePost } from "@/hooks/comment/useGetAllComment.hook";
import { useDeleteAComment } from "@/hooks/comment/useDeleteAComment.hook";
import { useLikeAComment } from "@/hooks/comment/useLikeAComment.hook";
import { useDislikeAComment } from "@/hooks/comment/useDislikeAComment.hook";
import { useEditAComment } from "@/hooks/comment/useEditAComment.hook";
import { detailsOfAUser } from "@/services/user/user.services";
import { PostBadge } from "../Home/PostBadge";
import { EditButton } from "../Home/EditButton";
import { FollowButton } from "../Home/FollowButton";
import { PostContent } from "../Home/PostContent";
import { Comments } from "../Home/Comments";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuillEditor from "@/components/Shared/QuillEditor";
import { useEditAPost } from "@/hooks/post/useEditAPost.hook";
import Loading from "./Loading";
import { useDeleteAPost } from "@/hooks/post/useDeleteAPost.hook";
import { useUserFollower } from "@/hooks/user/useUserFollower.hook";
import { UnfollowButton } from "../Home/UnfollowButton";
import { useUserUnfollow } from "@/hooks/user/useUserUnfollower.hook";
interface PostCardProps {
  post: IPost;
  idOfIndividualUser?: string;
  followersId?: any[];
}

export const PostCard: FC<PostCardProps> = ({ post, idOfIndividualUser, followersId }) => {

  const { mutate: handleLikeAPost, isPending: isLiking } = useLikeAPost();
  const { mutate: handleDislikeAPost, isPending: isDisliking } = useDislikeAPost();
  const { mutate: handleComment, isPending: createCommentPending } = useCreateAComment();
  const { data: comments, isLoading: loadingComments } = useGetAllCommentsOfASinglePost(post._id);
  const { mutate: deleteComment } = useDeleteAComment()
  const { mutate: handleLikeAComment } = useLikeAComment();
  const { mutate: handleDislikeAComment } = useDislikeAComment();
  const { mutate: handleEditAComment } = useEditAComment();
  const { mutate: handleEditAPost, isPending: editPending } = useEditAPost();
  const { mutate: handleDeleteAPost, isPending: deletePending } = useDeleteAPost();
  const { mutate: handleFollowAUser } = useUserFollower();
  const { mutate: handleUnfollowAUser } = useUserUnfollow();

  const [showComments, setShowComments] = useState<boolean>(false);
  const [userMembership, setUserMembership] = useState<string>('REGULAR');
  const { userId } = useAuth();
  const checkCurrentUserIsFollowerOrNot = followersId?.includes(userId);
  const pathName = usePathname()
  const isProfileRoute = pathName === '/profile';
  const isAdminRoute = pathName.includes("/admin");


  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState(post.content);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editStoryType, setEditStoryType] = useState<"TIP" | "STORY">(post.postType);
  const [editIsPremium, setEditIsPremium] = useState(post.isPremium);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userMongodbId, setUserMongodbId] = useState("");
  const [likeCount, setLikeCount] = useState(post.likes);
  const [dislikeCount, setDislikeCount] = useState(post.dislikes);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateDislike, setAnimateDislike] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await detailsOfAUser();
        if (data) {
          setUserMembership(data?.data.membership);
          setIsFollowing(post.author.followers.includes(data.data._id));
          setUserMongodbId(data.data._id)

        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserDetails();
  }, [userId, post.author.followers]);



  const handleAnimatedLike = () => {
    // if (!userId) return;
    setAnimateLike(true);
    handleLike();
    setTimeout(() => setAnimateLike(false), 300);
  };

  const handleAnimatedDislike = () => {
    // if (!userId) return;
    setAnimateDislike(true);
    handleDislike();
    setTimeout(() => setAnimateDislike(false), 300);
  };

  const toggleComments = () => {
    if (userId) {
      setShowComments(!showComments);
    }
  };

  useEffect(() => {
    if (post.likedBy.includes(userMongodbId)) {
      setUserAction('like');
    } else if (post.dislikedBy.includes(userMongodbId)) {
      setUserAction('dislike');
    } else {
      setUserAction(null);
    }
    setLikeCount(post.likes);
    setDislikeCount(post.dislikes);
  }, [post.likedBy, post.dislikedBy, userMongodbId, post.likes, post.dislikes]);

  const handleLike = useCallback(() => {
    if (!userId) return;
    let count = 0;
    setLikeCount((prevLikes) => {
      let newLikes = prevLikes;
      if (userAction === 'like') {
        // User is unliking
        newLikes = Math.max(0, prevLikes - 1);
        setUserAction(null);
      } else {

        // User is liking
        newLikes = Math.max(0, prevLikes + 1);
        if (userAction === 'dislike' && count === 0) {
          // If previously disliked, remove the dislike
          setDislikeCount((prevDislikes) => {
            if (count === 0) {
              count++;
              return prevDislikes - 1;
            }
            return prevDislikes
          });
        }
        setUserAction('like');
      }
      return newLikes;
    });

    if (!isLiking) {
      handleLikeAPost(post._id);
    }
  }, [userId, userAction, isLiking, handleLikeAPost, post._id]);

  const handleDislike = useCallback(() => {
    if (!userId) return;
    let count = 0;
    setDislikeCount((prevDislikes) => {
      let newDislikes = prevDislikes;
      if (userAction === 'dislike') {

        // User is un-disliking
        newDislikes = Math.max(0, prevDislikes - 1);
        setUserAction(null);
      } else {
        // User is disliking
        newDislikes = Math.max(0, prevDislikes + 1);
        if (userAction === 'like' && count === 0) {
          // If previously liked, remove the like
          setLikeCount((prevLikes) => {
            if (count === 0) {
              count++;
              return prevLikes - 1
            }
            return prevLikes
          });
        }
        setUserAction('dislike');
      }
      return newDislikes;
    });

    if (!isDisliking) {
      handleDislikeAPost(post._id);
    }
  }, [userId, userAction, isDisliking, handleDislikeAPost, post._id]);






  // const handleLike = useCallback(() => {
  //   if (post.likedBy.includes(userMongodbId)) {
  //     setLikedByStatus(false);
  //     setTotalLikes(post.likes - 1)
  //   } else {
  //     console.log('like chilo naa aage theke')
  //     setDislikedByStatus(false)
  //     setLikedByStatus(true)
  //     setTotalLikes(post.likes + 1)
  //   }
  //   if (!isLiking && userId) {
  //     handleLikeAPost(post._id);
  //   }
  // }, [handleLikeAPost, post._id, isLiking, userId, userMongodbId, post.likedBy, post.likes]);

  // const handleDislike = useCallback(() => {
  //   if (post.dislikedBy.includes(userMongodbId)) {
  //     console.log('dislike chilo aage theke')
  //     setDislikedByStatus(false);
  //     setTotalDislikes(post.dislikes - 1)
  //   } else {
  //     console.log('dislike chilo naa aage theke')
  //     setLikedByStatus(false)
  //     setDislikedByStatus(true)
  //     setTotalDislikes(post.dislikes + 1)
  //   }
  //   if (!isDisliking && userId) {
  //     handleDislikeAPost(post._id);
  //   }
  // }, [handleDislikeAPost, post._id, isDisliking, userId, post.dislikedBy, post.dislikes, userMongodbId]);

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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditTitle(post.title);
    setEditorContent(post.content);
    setEditStoryType(post.postType);
    setEditIsPremium(post.isPremium);
  };

  const handleSaveEdit = () => {
    const payload = {
      postId: post._id,
      title: editTitle,
      content: editorContent,
      postType: editStoryType,
      isPremium: editIsPremium,
    };
    handleEditAPost(payload)
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(post.title);
    setEditorContent(post.content);
    setEditStoryType(post.postType);
    setEditIsPremium(post.isPremium);
  };

  const handleDeletePost = () => {
    if (confirm("Are you sure you want to delete this Post?")) {
      handleDeleteAPost(post._id)
    }
  };

  const handleFollow = () => {
    handleFollowAUser(post.author._id);
    setIsFollowing(true);
  };

  const handleUnfollow = () => {
    handleUnfollowAUser(post.author._id)

    setIsFollowing(false);
  }



  return (
    <>
      {(deletePending || editPending) && <Loading />}
      <Card className={`mb-4 relative border-0 bg-gradient-to-b from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-black/20 ${nunito.className}`}>
        {
          !isProfileRoute
          && !isAdminRoute &&
          <div className="absolute top-2 right-2 z-10">
            <PostBadge isPremium={post.isPremium} />
          </div>
        }
        {
          (isProfileRoute || isAdminRoute) ? (
            <div className="absolute top-2 rounded-lg bg-white right-14 z-10">
              <EditButton onEdit={handleEditClick} onDelete={handleDeletePost} />
            </div>
          ) : (
            <div className="absolute top-14 right-2 z-10" >

              {
                userId && (userId !== post.author.userId) && (userId !== idOfIndividualUser) && (
                  (isFollowing || checkCurrentUserIsFollowerOrNot)
                    ? <UnfollowButton onUnfollow={handleUnfollow} />
                    : < FollowButton onFollow={handleFollow} />

                )
              }
            </div>
          )
        }

        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 border-b border-gray-700/50 p-3 sm:p-4">
          {
            !isProfileRoute &&
            <Link
              href={`/user/${post.author.userName}`}
              className="group relative inline-block"
            >
              <Avatar className="border-2 w-12 h-12 sm:w-14 sm:h-14 border-teal-500 transition-all duration-300 ease-in-out group-hover:border-teal-600 group-hover:shadow-lg group-hover:scale-105">
                <AvatarImage src={post.author.imageURL} alt={post.author.userName} />
                <AvatarFallback className="bg-teal-500 text-white">
                  {post.author.userName[0]}
                </AvatarFallback>
              </Avatar>
              <ExternalLink className="absolute bottom-0 right-0 w-4 h-4 text-teal-500 bg-white rounded-full p-0.5 shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
              <span className="sr-only">View {post.author.userName} profile</span>
              <div className="absolute inset-0 border-2 border-teal-500 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
            </Link>
          }
          <div>
            {!isProfileRoute &&
              <Link href={`/user/${post.author.userName}`} className="font-semibold text-gray-100 text-base sm:text-lg">
                {post.author.userName}

              </Link>
            }
            <div className="flex items-center space-x-2 text-sm sm:text-base">
              <span className="text-teal-500">{post.petType}</span>
              <span className="text-teal-500">{post.postType}</span>
            </div>
          </div>
          {isProfileRoute && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto hidden">
                  {/* <MoreVertical className="h-4 w-4 bg-white" /> */}
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditClick}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeletePost}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>

        <CardContent className="text-gray-200 p-3 sm:p-4">
          {isEditing ? (
            <div className="mb-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="mb-2 bg-gray-700 text-white"
                placeholder="Edit title"
              />
              <div className="flex items-center space-x-4 mt-2">
                <Select value={editStoryType} onValueChange={(value) => setEditStoryType(value as "TIP" | "STORY")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select story type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STORY">Story</SelectItem>
                    <SelectItem value="TIP">Tip</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id="premium-mode"
                    checked={editIsPremium}
                    onChange={(e) => setEditIsPremium(e.target.checked)}
                    className="form-checkbox h-5 w-5 hover:cursor-pointer text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                  />
                  <Label htmlFor="premium-mode" className="hover:cursor-pointer">Premium Content</Label>
                </div>
              </div>
              <div className="h-[400px] my-3 rounded-xl ">
                <QuillEditor
                  content={editorContent}
                  onChange={setEditorContent}
                />
              </div>
              <div className="flex justify-end mt-10 space-x-2">
                <Button onClick={handleSaveEdit} className="bg-teal-500 hover:bg-teal-600">Save</Button>
                <Button onClick={handleCancelEdit} variant="destructive">Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <h4 className="font-bold mb-2 text-white text-lg sm:text-xl">{post.title}</h4>
              <div className="mb-4">
                <PostContent
                  content={post.content}
                  isPremium={post.isPremium}
                  userMembership={userMembership}
                  userId={userId as string}
                />
              </div>
            </>
          )}
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
              onClick={handleAnimatedLike}
              disabled={isLiking || isDisliking}
              className={`text-teal-500 hover:bg-teal-800 transition-all duration-300 ease-in-out
            ${userAction === 'like' ? 'bg-blue-800' : ''}
            ${!userId && 'cursor-not-allowed'}
            ${animateLike ? 'scale-150' : 'scale-100'}
          `}
              title={!userId ? 'Please login' : ''}
            >
              <ThumbsUp className={`h-4 w-4 mr-1 transition-transform duration-300 ${animateLike ? 'scale-150' : 'scale-100'}`} />
              {likeCount}
            </Button>
            <Button
              variant="ghost"
              onClick={handleAnimatedDislike}
              disabled={isLiking || isDisliking}
              className={`text-teal-500 hover:bg-teal-800 transition-all duration-300 ease-in-out
            ${userAction === 'dislike' ? 'bg-red-800' : ''}
            ${!userId && 'cursor-not-allowed'}
            ${animateDislike ? 'scale-150' : 'scale-100'}
          `}
              title={!userId ? 'Please login' : ''}
            >
              <ThumbsDown className={`h-4 w-4 mr-1 transition-transform duration-300 ${animateDislike ? 'scale-150' : 'scale-100'}`} />
              {dislikeCount}
            </Button>
            <Button
              variant="ghost"
              onClick={toggleComments}
              className={`text-teal-500 hover:bg-teal-800 ${!userId && 'cursor-not-allowed'}`}
              title={`${!userId ? 'Please login' : ''}`}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {comments?.length || 0}
            </Button>
          </div>
        </CardFooter>
        {/* <CardFooter className="flex flex-wrap justify-between border-t border-gray-700/50 p-2 sm:p-3">
          <div className="flex space-x-2 mb-2 sm:mb-0">

            <Button
              variant="ghost"
              onClick={handleLike}
              disabled={isLiking || isDisliking}
              className={`text-teal-500 hover:bg-teal-800 ${userAction === 'like' ? 'bg-blue-800' : ''
                } ${!userId && 'cursor-not-allowed'}`}
              title={!userId ? 'Please login' : ''}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {likeCount}
            </Button>
            <Button
              variant="ghost"
              onClick={handleDislike}
              disabled={isLiking || isDisliking}
              className={`text-teal-500 hover:bg-teal-800 ${userAction === 'dislike' ? 'bg-red-800' : ''
                } ${!userId && 'cursor-not-allowed'}`}
              title={!userId ? 'Please login' : ''}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {dislikeCount}
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
        </CardFooter> */}

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
                  createCommentPending={createCommentPending}
                  onLikeComment={handleLikeComment}
                  onDislikeComment={handleDislikeComment}
                  onEditComment={handleEditComment}
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          )
        }
      </Card>
    </>
  );
};
