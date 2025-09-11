/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import type { PluggableList } from "react-markdown/lib/react-markdown";
import { type RouteObject } from "react-router";

export interface Plugin {
  routes?: RouteObject[];
  composer?: FC[];
  tools?: FC[];
  content?: Record<string, FC<any>>;
  rehypePlugins?: PluggableList;
  remarkPlugins?: PluggableList;
}
