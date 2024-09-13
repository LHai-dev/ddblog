// Use 'use client' to specify that this component will run in the client
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreateMediumStylePost from "@/components/CreateMediumStylePost";

export default async function CreateMediumStylePostPage() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return <CreateMediumStylePost session={session} />;
}
