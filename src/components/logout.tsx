import { signOut } from "next-auth/react";

export default function Logout() {
  return <button onClick={() => signOut()} className="bg-red-500 text-white p-2 mt-4 rounded">Logout</button>;
}