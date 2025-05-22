import * as React from "react";
import {
  AudioWaveform,
  TableProperties,
  Monitor,
  ArrowRightLeft,
  GalleryVerticalEnd,
  FlaskConical,
  Settings2,
  FileSliders,
} from "lucide-react";

import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavProjects } from "@/components/app-sidebar/nav-projects";
import { NavUser } from "@/components/app-sidebar/nav-user";
import { NavHeader } from "@/components/app-sidebar/nav-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "laios",
    email: "laios@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Cafe Life Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Jobs",
      url: "/jobs",
      icon: FileSliders,
      isActive: false,
    },
    {
      title: "Monitoring",
      url: "#",
      icon: Monitor,
    },
    {
      title: "Results",
      url: "#",
      icon: TableProperties,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Request Usage",
      url: "/request-usage",
      icon: ArrowRightLeft,
    },
    {
      name: "Virtual Data Table",
      url: "/virtual-table",
      icon: FlaskConical,
    },
    {
      name: "Modified Virtual Table",
      url: "/modified-virtual-table",
      icon: FlaskConical,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
