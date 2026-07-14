import { redirect } from "next/navigation";

export default function PurchasesRedirect() {
  redirect("/dashboard/purchases");
}
