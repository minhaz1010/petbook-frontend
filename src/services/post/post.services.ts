/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axiosInstance from "@/config/axiosInstance";
import { IErrorResponse, IPost, ISuccessfulResponse } from "@/types"
// NOTE: createPost services
export  const createPost = async (postData:any)=>{
  try {
    const response = await axiosInstance.post<ISuccessfulResponse<IPost>>("/posts/create-post",postData);
    if(response.data.success){
      return response.data.data
    }
    else {
      console.log('error creating post',response.data.message);
      return null
    }
  } catch (error:any) {
  
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error creating post:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
  
}

// NOTE: fetch all posts services
interface PostsData {
  result: IPost[]
  totalPosts: number
}

const POSTS_PER_PAGE = 2;

export const fetchAllPosts = async ({ pageParam = 1, category }: { pageParam?: number; category?: string }): Promise<ISuccessfulResponse<PostsData>> => {
  const { data } = await axiosInstance.get<ISuccessfulResponse<PostsData>>('/posts', {
    params: {
      page: pageParam,
      limit: POSTS_PER_PAGE,
      category: category || undefined
    },
  });
  return data;
};

// NOTE: Like a post

export const likeAPost = async(postId:string)=>{
  try {
    const response = await axiosInstance.patch<ISuccessfulResponse<IPost>>(
      `/posts/likes/${postId}`);
      if(response.data.success){
        return response.data.data
      }else {
        console.error("Failed to like a post:", response.data.message);
      return null; 
      }
  } catch (error:any) {
     if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error creating post:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
  
}

// NOTE: dislike a post
export const dislikeAPost = async(postId:string)=>{
  try {
    const response = await axiosInstance.patch<ISuccessfulResponse<IPost>>(
      `/posts/dislikes/${postId}`);
      if(response.data.success){
        return response.data.data
      }else {
        console.error("Failed to dislike a post:", response.data.message);
      return null; 
      }
  } catch (error:any) {
     if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error creating post:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
  
}


export const getSinglePost = async (postId:string)=>{
  try{
   const response = await axiosInstance.get<ISuccessfulResponse<IPost>>(
      `/posts/${postId}`);

    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to create post:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error creating post:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}
export const editASinglePost = async (payload:any)=>{
  try{
    const {postId,...body} = payload;
   const response = await axiosInstance.patch<ISuccessfulResponse<IPost>>(
      `/posts/${postId}`,body);
    
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to edit post:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error editing post:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}
export const deleteASinglePost = async (postId:string)=>{
  try{
   const response = await axiosInstance.delete<ISuccessfulResponse<IPost>>(
      `/posts/${postId}`);
    
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to delete post:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error deleting post:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}


