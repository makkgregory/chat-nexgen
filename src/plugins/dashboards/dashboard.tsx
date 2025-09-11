import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/cn";
import type { ComponentProps, FC, HTMLAttributes } from "react";
import { DashboardChat } from "./dashboard-chat";
import { DashboardPreview } from "./dashboard-preview";

interface DashboardProps extends HTMLAttributes<HTMLDivElement> {}

export const Dashboard: FC<DashboardProps> = ({ className, ...rest }) => {
  return (
    <ResizablePanelGroup
      className={cn("h-full", className)}
      {...(rest as ComponentProps<typeof ResizablePanelGroup>)}
      direction="horizontal"
    >
      <ResizablePanel minSize={20} maxSize={50} className="p-4">
        <DashboardChat />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <DashboardPreview />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
