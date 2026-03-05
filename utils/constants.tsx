import { Icons } from "@/components/icons";
import { SideNavbar } from "./types";

const prefix: string = "/components";

export const ComponentsNavbar: SideNavbar[] = [
  {
    title: "Home",
    items: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <Icons.home className="w-5 h-5" />,
      },
      {
        title: "Admins",
        path: "/admin/admins",
        icon: <Icons.shieldUser className="w-5 h-5" />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <Icons.users className="w-5 h-5" />,
      },
      {
        title: "CMS Pages",
        path: "/admin/cms-pages",
        icon: <Icons.syringe className="w-5 h-5" />,
      },
      {
        title: "FAQs",
        path: "/admin/faqs",
        icon: <Icons.pill className="w-5 h-5" />,
      },
      {
        title: "Inquiries",
        path: "/admin/inquiries",
        icon: <Icons.calender className="w-5 h-5" />,
      },
      {
        title: "Settings",
        path: "/admin/settings",
        icon: <Icons.user className="w-5 h-5" />,
      },
    ],
  },
];
