import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Avatar,
  AvatarFallback,
  AvatarImage 
} from "@/components/ui/avatar"
import { Settings, CreditCard, LogOut } from 'lucide-react'
import {auth} from "@/auth"
import { handleSignOut } from "@/app/actions/authAction"
export default async function Navbar() {
  
  const session = await auth()

  return (
    <nav className="border-b flex justify-center sm:py-0 px-2">
      <div className="container flex items-center justify-between py-1">
        <Link href="/">
            <img src="/images/logo.png" alt="logo" className="h-16 w-16" />
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

        <div className="space-x-2 md:flex items-center">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/images/avatar.png" alt="User avatar" />
                  <AvatarFallback>
                    <Image
                      src={session?.user?.image || "/images/avatar.png"}
                      width={60}
                      height={60}
                      alt="User avatar"
                      draggable={false}
                    />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Plan</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4"/>
                    <form action={handleSignOut} className="w-full"><Button variant='ghost' className="flex w-full items-center text-sm"><span>Sign out</span></Button></form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin"><Button >Sign in</Button></Link>
          )}
        </div>
      </div>
    </nav>
  )
}