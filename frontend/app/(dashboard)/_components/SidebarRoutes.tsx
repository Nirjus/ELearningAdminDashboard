"use client";
import { BarChart, Compass, Layout, List, NotebookPen, Sliders, UserCog2 } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";

type Props = {};

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: UserCog2,
    label: "Manage user",
    href: "/manage-user",
  },
  {
    icon: NotebookPen,
    label: "Subscription",
    href:"/manage-plans"
  }
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: Sliders,
    label: "Categories",
    href: "/teacher/categories",
  },
];
const SidebarRoutes = (props: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className=" flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          icon={route.icon}
          href={route.href}
          label={route.label}
          key={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
