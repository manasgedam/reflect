import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { auth, signIn } from "@/auth"

export default async function Navbar() {

  const session = await auth()
  const user = session?.user

  return (
    <nav className="border-b flex justify-center sm:py-0 px-2">
      <div className="container flex items-center justify-between py-1">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={60}
            height={60}
            alt="logo"
          />
        </Link>
        <div className="hidden space-x-6 md:flex">
          <Link href="/about" className="text-md font-semibold transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/features" className="text-md font-semibold transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="/contact" className="text-md font-semibold transition-colors hover:text-primary">
            Contact
          </Link>
          <Link href="/docs" className="text-md font-semibold transition-colors hover:text-primary">
            Docs
          </Link>
        </div>

        <div className=" space-x-2 md:flex">
          {user ? <Button>Get Started</Button> : <SignInButton />}
        </div>

      </div>
    </nav>
  )
}

function SignInButton() {
  return (
    <form action={async () => {
      "use server"
      await signIn()
    }}>
      <div className="space-x-2 md:flex">
        <Button variant="outline" className="hidden lg:block">Sign In</Button>
        <Button >Sign Up</Button>
      </div>
    </form>
  )
}