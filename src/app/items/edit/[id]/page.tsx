import { redirect } from "next/navigation";

export default async function ItemsEditRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/dashboard/items/edit/${id}`);
}
