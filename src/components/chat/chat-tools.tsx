import { cn } from "@/lib/cn";
import plugins from "@/plugins";
import { IconPlus, IconUpload } from "@tabler/icons-react";
import type { FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChatComposerSecondaryItem } from "./chat-composer";

interface ChatToolsProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatTools: FC<ChatToolsProps> = ({ className, ...rest }) => {
  return (
    <ChatComposerSecondaryItem className={cn("", className)} {...rest}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <IconPlus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-48">
          <DropdownMenuItem>
            <IconUpload />
            <span>Upload file</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {plugins.tools.map((Comp, index) => (
            <DropdownMenuItem key={index} asChild>
              <Comp />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ChatComposerSecondaryItem>
  );
};
