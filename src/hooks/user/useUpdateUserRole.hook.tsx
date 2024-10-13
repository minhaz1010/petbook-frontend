/* eslint-disable @typescript-eslint/no-explicit-any */
import { changeRole } from "@/services/user/user.services"
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";


export const useUpdateUserRole = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_USER_ROLE"],
    mutationFn: async (payload: any) => await changeRole(payload),
    onSuccess: () => {
      toast.success("Change role successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_USERS"] })
    }
  })
}