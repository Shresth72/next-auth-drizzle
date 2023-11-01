import Image from "next/image";
import { AuthAlert } from "@/components/client/AuthAlert";
import { getAuthSession } from "@/lib/auth";
import SignIn from "@/components/client/SignIn";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/client/UserButton";

export default async function Home() {
  const session = await getAuthSession();

  const image = session?.user?.image as string;

  return (
    <>
      <p className=" text-3xl">Hello</p>
      {session ? <UserButton image={image} /> : <AuthAlert session={session} />}
      
    </>
  );
}
