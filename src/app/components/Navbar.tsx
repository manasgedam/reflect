import Link from "next/link"
import Image from "next/image"
import {Button} from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="border-b flex justify-center py-[0.5] px-2">
      <div className="container flex items-center justify-between py-1">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={70}
            height={70}
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
          <Button variant="outline" className="hidden lg:block">Sign In</Button>
          <Button >Sign Up</Button>
        </div>

      </div>
    </nav>
  )
}