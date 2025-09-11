import { Button } from "@/components/ui/button";
import type { FC } from "react";

interface CitationProps {
  index: number;
}

export const Citation: FC<CitationProps> = ({ index }) => {
  return (
    <Button className="p-0 ml-0.5" variant="link">
      [{index + 1}]
    </Button>
  );
};
