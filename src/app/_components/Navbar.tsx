import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  auth,
  signIn,
  signOut  } from "@/auth"
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
    AvatarImage } from "@/components/ui/avatar"
import { Settings, CreditCard, LogOut } from 'lucide-react'

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
            draggable={false}
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

        <div className="space-x-2 md:flex">
          {user ? (
           <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="ghost" className="relative h-8 w-8 rounded-full">
               <Avatar className="h-8 w-8">
                 <AvatarImage src={user.image || "/placeholder.svg?height=32&width=32"} alt={user.name || "User"} />
                 <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
               </Avatar>
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="w-56" align="end" forceMount>
             <div className="flex items-center justify-start gap-2 p-2">
               <div className="flex flex-col space-y-1 leading-none">
                 {user.name && <p className="font-medium">{user.name}</p>}
                 {user.email && (
                   <p className="w-[200px] truncate text-sm text-muted-foreground">
                     {user.email}
                   </p>
                 )}
               </div>
             </div>
             <DropdownMenuSeparator />
             <DropdownMenuItem>
               <Settings className="mr-2 h-4 w-4" />
               <span><Button variant="ghost">Settings</Button></span>
             </DropdownMenuItem>
             <DropdownMenuItem>
               <CreditCard className="mr-2 h-4 w-4" />
               <span><Button variant="ghost">Plan</Button></span>
             </DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem>
               <LogOut className="mr-2 h-4 w-4" />
               <SignOutButton />
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
          ) : (
            <SignInButton />
          )}
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
        <Button>Sign Up</Button>
      </div>
    </form>
  )
}

function SignOutButton() {
  return (
    <form action={async () => {
      "use server"
      await signOut()
    }}>
      <div className="space-x-2 md:flex">
        <span><Button variant="ghost">Sign Out</Button></span>
      </div>
    </form>
  )
}