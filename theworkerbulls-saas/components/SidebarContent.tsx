import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
  useColorMode,
  Link,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import { FiHome } from "react-icons/fi";
import { FaPaperPlane, FaDolly, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/router";
import { ReactText } from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Wallet,
  Music,
  Settings,
  VideoIcon,
  Globe,
  FileText,
  FileSpreadsheet,
  Mic,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
interface LinkItemProps {
  name: string;
  path: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome },
  { name: "Chat", path: "/conversation", icon: MessageSquare },
  { name: "Subscriptions", path: "/profile", icon: Wallet },

];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
    className={'space-y-4  py-4  h-full bg-[#111827] text-white'}
      transition="3s ease"
      bg={'#111827'}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      // overflow={{ base: "scroll", md: "auto" }}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        // mx="10"
        mb={10}
        justifyContent="space-between"
      >
         <div className="relative h-16 w-80 mr-4">
            <Image fill alt="Logo" src="/logo4.png" />
          </div>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} path={link.path} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}

      {/* <Filters />
      <AddItemModal /> */}
    </Box>
  );
};

const NavItem = ({ icon, children, path }: NavItemProps) => {
  const { colorMode } = useColorMode();
  const hoverColor = { light: "gray.900", dark: "whiteAlpha.900" };
  const activeColor = { light: "teal.800", dark: "teal.200" };
  const activeBg = { light: "teal.500", dark: "gray.700" };
  const pathname = usePathname();
//   const router = useRouter();
  const style = {
    marginRight: 10,
    bg: activeBg[colorMode],
    rounded: "sm",
    borderRadius: 4,
    // color: router.asPath === path ? activeColor[colorMode] : "gray",
    textDecoration: "none",
  };
//   const handleClick = (e:any) => {
//     e.preventDefault();
//     router.push(path);
//   };

  return (
    <Link href={path} 
    // onClick={handleClick} 
    className={cn(
      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
      pathname === path
        ? "text-white bg-white/10"
        : "text-zinc-400"
    )}
    style={style}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: hoverColor[colorMode],
          transform: "translateX(2px)",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: hoverColor[colorMode],
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
export default SidebarContent;