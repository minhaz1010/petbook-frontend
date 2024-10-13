"use server"

import axiosInstance from "@/config/axiosInstance";
import { IPayment, ISuccessfulResponse } from "@/types";
export interface  IPayload {
      address:string,
      phone:string,
      month: string,
      totalPrice: number
}

export const initialPayment = async (payload:IPayload) =>{
  const response  = await axiosInstance.post("/payment/",payload);
  return response.data;
}

export const getAllPayment  = async () =>{
  const response = await axiosInstance.get<ISuccessfulResponse<IPayment[]>>("/payment/all-payment");
  return response.data
}