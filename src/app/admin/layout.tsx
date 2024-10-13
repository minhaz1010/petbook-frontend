import AdminNavbar from "@/components/Navbar/AdminNavbar"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
const layout = ({ children }: Props) => {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  )
}

export default layout