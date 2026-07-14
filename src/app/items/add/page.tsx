import { redirect } from "next/navigation"

export default function AddItemRedirect() {
  redirect("/dashboard/items/add")
}
