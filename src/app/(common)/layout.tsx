import Navbar from "@/components/Navbar/Navbar"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
const CommonLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default CommonLayout