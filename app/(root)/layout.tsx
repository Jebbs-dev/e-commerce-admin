import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({children}: {children: React.ReactNode}) {
  const { userId } = auth();

  if(!userId){
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  })

  if(store){
    redirect(`/${store.id}`)
  }

  return(
    <>
    {children}
    </>
  )
}

// if the user is not logged in, they are redirected to the sign in page
// if the currently logged in user has a store created, they can proceed to the store, but if the store doesnt exist, they have to create one here
