"use client";

import { useSession } from "next-auth/react";
import Logout from "@/components/logout";
import Login from "@/components/login";

import GetData from "@/components/getData";

import PostData from "@/components/postData";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome {session ? session.user?.name : "Guest"}</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <GetData />
      <PostData />

      {session ? <Logout /> : <Login />}
      
      <a href="/restricted" className="pt-4 underline">Restricted page</a>
    </div>
  );
}