import { auth } from "@/auth"
import EditForm from "@/app/_components/EditForm"

export default async function page() {
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>
  return (
    <div>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <EditForm />
    </div>
  )
}