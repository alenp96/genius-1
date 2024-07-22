
import { currentUser } from '@clerk/nextjs/server';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = async () => {
  // const user = await currentUser();

  return (
    <Avatar className="h-8 w-8">
      {/* <AvatarImage src={
        //@ts-ignore
        user?.profileImageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback> */}
    </Avatar>
  );
};
