/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axiosInstance from "@/config/axiosInstance";
import { IErrorResponse, ISuccessfulResponse, IUSer } from "@/types";
import { auth } from "@clerk/nextjs/server";

export const detailsOfAUser = async () =>{
  try {
    const response  = await axiosInstance.get<ISuccessfulResponse<IUSer>>("/users/me");
    return response.data;
  } 
   catch (error) {
    console.log(error,'error ') 
  }  
}

export const postOfAUserByUserName = async (userName:string) =>{
  try {
    const response = await axiosInstance.get<ISuccessfulResponse<IUSer>>(`/users/details/${userName}`);
    return response.data.data;
  } catch (error) {
    console.log(error)
  }
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
   const response = await axiosInstance.post<ISuccessfulResponse<IUSer[]>>(
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



export const getAllUsers = async ()=>{
  try{
   const response = await axiosInstance.get(
      `/users/get-all-users`);
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to get all  users:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error getting all users:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}
export const changeRole = async (payload:any)=>{
  try{
    const {id,role} = payload;
    const body ={
      role:role
    }
   const response = await axiosInstance.patch(
      `/users/update-role/${id}`,body);
      // console.log(response,'response from change role')
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to update user role:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error getting update users:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}
export const deleteAUser = async (id:string)=>{
  try{
   const response = await axiosInstance.delete(
      `/users/delete/${id}`);
    if (response.data.success) {
      return response.data.data; 
    } else {
      console.error("Failed to update user role:", response.data.message);
      return null; 
    }
  } catch (error: any) {
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error getting update users:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
}



export const getSessionMetadata = async()=>{
   const {sessionClaims} = auth();
     if(!sessionClaims){
      throw new Error("No active session found")
     }
     const role = sessionClaims.metadata.role;
     return role
}


