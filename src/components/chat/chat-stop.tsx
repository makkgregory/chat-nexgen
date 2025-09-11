import { cn } from "@/lib/cn";
import { IconSquareFilled } from "@tabler/icons-react";
import type { ComponentProps, FC } from "react";
import { Button } from "../ui/button";

interface ChatStopProps extends ComponentProps<typeof Button> {}

export const ChatStop: FC<ChatStopProps> = ({ className, ...rest }) => {
  return null;

  return (
    <Button
      variant="secondary"
      className={cn("absolute right-2 bottom-2", className)}
      size="icon"
      {...rest}
    >
      <IconSquareFilled />
    </Button>
  );
};
