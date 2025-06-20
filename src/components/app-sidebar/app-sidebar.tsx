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
import { NotificationBadge } from "../notification-badge";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation("route");
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
        title: t("jobs"),
        url: "/jobs",
        icon: FileSliders,
        disabled: false,
        items: [
          {
            title: "Single Process",
            url: "/jobs",
          },
          {
            title: "All Jobs",
            url: "#",
          },
          {
            title: "All Processes",
            url: "#",
          },
        ],
      },
      {
        title: t("monitoring"),
        url: "#",
        icon: Monitor,
        disabled: true,
      },
      {
        title: t("result"),
        url: "#",
        icon: TableProperties,
        disabled: true,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        disabled: true,
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
      {
        name: "Data Table",
        url: "/flows",
        icon: FlaskConical,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NotificationBadge label="" variant="destructive">
          <NavHeader teams={data.teams} />
        </NotificationBadge>
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
