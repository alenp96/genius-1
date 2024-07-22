
import { useSearchParams } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server';



export default  function Page() {
  const searchParams = useSearchParams()
  
 
  const session_id = searchParams.get('session_id')
  const fetchData = async () => {
 
    return  await currentUser();

  };
const user = fetchData()

  return (
    <div>Hello {
      //@ts-ignore
      user?.firstName
      }</div>
  );
}



