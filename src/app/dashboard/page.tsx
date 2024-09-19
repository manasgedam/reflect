import { auth } from "@/auth"
import Dashboard from "@/app/_components/Dashboard"

export default async function page() {
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>
  return (
    <div>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <Dashboard />
    </div>
  )
}