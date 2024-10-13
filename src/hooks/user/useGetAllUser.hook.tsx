import { getAllUsers } from "@/services/user/user.services"
import { useQuery } from "@tanstack/react-query"


export const useGetAllUser = () => {
  return useQuery({
    queryKey: ['GET_ALL_USERS'],
    queryFn: async () => await getAllUsers()
  })
}