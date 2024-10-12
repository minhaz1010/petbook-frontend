/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axiosInstance from "@/config/axiosInstance";
import { IErrorResponse, ISuccessfulResponse, IUSer } from "@/types";

export const detailsOfAUser = async () =>{
  const response  = await axiosInstance.get<ISuccessfulResponse<IUSer>>("/users/me");
  return response.data;
}

export const postOfAUserByUserName = async (userName:string) =>{
  const response = await axiosInstance.get(`/users/details/${userName}`);
  // console.log(response.data.data.posts,'response from user services')
  return response.data.data.posts;
}

export const followAUser  = async (followerId:string)=>{
  try{
   const response = await axiosInstance.post(
      `/users/follow/${followerId}`)
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

export const unfollowAUser  = async (followerId:string)=>{
  try{
   const response = await axiosInstance.post(
      `/users/unfollow/${followerId}`)
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to unfollow an user:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error :", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}