import Image from "next/image";
import {UserService} from "@/backend/services/UserService";



async function getUser() {

    const userService = new UserService();
    return await userService.getUserByEmail("user1@gmail.com");
}
export default async function Home() {
    const user = await getUser();
    console.log(user)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1>Hello</h1>
          <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </div>
  );
}
