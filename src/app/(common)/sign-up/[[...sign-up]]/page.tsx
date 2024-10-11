import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (<>
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:30px_30px]"></div>
    <div className='flex min-h-screen justify-center items-center'>
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 'bg-slate-600',
            formFieldLabel: "text-xl",
            formFieldInput: "text-xl",
            socialButtonsBlockButtonText: "text-lg",
            socialButtonsProviderIcon: "text-lg",
            footerActionText: "text-lg",
            footerActionLink: "text-lg",
            headerTitle: "text-lg",
            headerSubtitle: 'text-md'
          }
        }}
      />
    </div>
  </>)
}