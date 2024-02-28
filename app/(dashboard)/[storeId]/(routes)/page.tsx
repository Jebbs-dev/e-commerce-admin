import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
  params: { storeId: string}
}

const DashboardPage: React.FC<DashboardPageProps> = async ({params}) => {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })


  return (
    <div>
      <p>This is a Dashboard!</p>
      <p>Active store: {store?.name} </p>

    </div>
    
  )
}

export default DashboardPage