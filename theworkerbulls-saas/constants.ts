import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
  Globe,
  FileText,
  FileSpreadsheet,
  Mic,
  Bot,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
  {
    label: "Chat with Pdf",
    icon: FileText,
    color: "text-purple-700",
    bgColor: "bg-purple-700/10",
    href: "/pdf",
  },
  {
    label: "Chat with Csv",
    icon: FileSpreadsheet,
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
    href: "/csv",
  },
  {
    label: "Chat with web",
    icon: Globe,
    color: "text-yellow-700",
    bgColor: "bg-yellow-700/10",
    href: "/web",
  },
  {
    label: "Standard Operating Procedure",
    icon: Bot,
    color: "text-cyan-700",
    bgColor: "bg-cyan-700/10",
    href: "/sop",
  },
];
