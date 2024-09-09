import { SignUp } from "@clerk/nextjs"

export default function Page()  {
    return (
        <div className="min-h-screen grid grid-cols-1">
            <SignUp path="/sign-up"/>
        </div>
    )
}
 