/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axiosInstance from "@/config/axiosInstance";
import { IErrorResponse } from "@/types";


export const createComment = async (payload:any)=>{
  try{
    const body = {
      content:payload.content
    }
   const response = await axiosInstance.post(
      `/posts/comments/${payload.postId}`,body);

    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to create comment:", response.data.message);
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

export const getCommentsOfAPost = async (postId:string)=>{
   try{
   const response = await axiosInstance.get(
      `/posts/comments/${postId}`);

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

export const deleteCommentsOfAPost = async (postId:string)=>{
   try{
   const response = await axiosInstance.delete(
      `/posts/comments/${postId}`);

    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to delete comments:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error deleting comments:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}

export const editAComment = async (payload:any) =>{
  try{
    const {commentId,...body} = payload;
   const response = await axiosInstance.patch(
      `/posts/comments/${commentId}`,body);
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to like this comment:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error liking this comment:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}

export const likeAComment = async (commentId:string) =>{
  try{
   const response = await axiosInstance.patch(
      `/posts/comments/like/${commentId}`);
   console.log(response,'response of a likeAComment');   
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to like this comment:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error liking this comment:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}

export const dislikeAComment = async (commentId:string) =>{
  try{
   const response = await axiosInstance.patch(
      `/posts/comments/dislike/${commentId}`);
   console.log(response,'response of a likeAComment');   
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to dislike this comment:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error disliking this comment:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}
