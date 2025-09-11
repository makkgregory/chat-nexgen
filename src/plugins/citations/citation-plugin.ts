import type { Root } from "hast";
import { visit } from "unist-util-visit";

export const citationPlugin = () => {
  return (root: Root) => {
    let count = 0;

    visit(root, "text", (node, index, parent) => {
      if (!node.value) {
        return;
      }
      parent?.children.splice((index ?? 0) + 1, 0, {
        type: "element",
        tagName: "Citation",
        properties: { index: count++ },
        children: [],
      });
      return (index ?? 0) + 2;
    });
  };
};
