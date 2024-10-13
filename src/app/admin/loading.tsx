import Loading from "@/components/Shared/Loading"

const loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50">
      <Loading />
    </div>
  )
}

export default loading