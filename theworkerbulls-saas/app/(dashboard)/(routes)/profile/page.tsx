import { currentUser } from '@clerk/nextjs/server';
import Profile from '@/components/Profile';

export default async function Page() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  return <Profile user={user}/>;
}
