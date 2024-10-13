import { initialPayment, IPayload } from "@/services/payment/payment.services"
import { useMutation } from "@tanstack/react-query"


export const usePayment = () => {
  return useMutation({
    mutationKey: ["INITIAL_PAYMENT"],
    mutationFn: async (payload: IPayload) => await initialPayment(payload)
  })
}