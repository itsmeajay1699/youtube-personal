import Image from "next/image";
import { prisma } from "../../lib/prisma";
export default async function Home() {
  const user = await prisma.user.findMany();
  return (
    <>
      <h2 className="text-center">
        Hello world,
        {user.map((user) => {
          return (
            <div key={user.id}>
              <h1>{user.username}</h1>
              <p>{user.email}</p>
            </div>
          );
        })}
      </h2>
    </>
  );
}
