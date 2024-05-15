import { Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import  VoiceButton from "@/components/Voice/Button";
import { usePathname } from "next/navigation";
import {
  Grid,

  Flex,

} from "@chakra-ui/react";

interface HeadingProps {
  title: string;
  description: string;
  icon: Icon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
    const pathname = usePathname();
    console.log('pathname',pathname)
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>

        <div>
          <div className="flex items-center gap-x-30">
            <h2 className="text-3xl font-bold">{title}</h2> {pathname=='/sop'?  <VoiceButton />:null}
          
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};
