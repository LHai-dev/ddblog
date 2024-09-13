import { auth } from "@/lib/auth"; // Your server-side auth function
import NavbarClient from "./NavbarClient"; // Client component

export default async function Navbar() {
  const session = await auth(); // Fetch session on the server-side

  return <NavbarClient session={session} />;
}
