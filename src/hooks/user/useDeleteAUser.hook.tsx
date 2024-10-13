import { deleteAUser } from "@/services/user/user.services"
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteAUser = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ['DELETE_A_USER'],
    mutationFn: async (id: string) => await deleteAUser(id),
    onSuccess: () => {
      toast.success("Successfully deleted the user");
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_USERS'] })
    }
  })
}