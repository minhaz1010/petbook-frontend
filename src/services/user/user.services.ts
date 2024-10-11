"use server"

import axiosInstance from "@/config/axiosInstance";

export const detailsOfAUser = async () =>{
  const response  = await axiosInstance.get("/users/me");
  return response.data;
}

export const postOfAUserByUserName = async (userName:string) =>{
  const response = await axiosInstance.get(`/users/details/${userName}`);
  // console.log(response.data.data.posts,'response from user services')
  return response.data.data.posts;
}