import type { FC } from "react";
import { type RouteObject } from "react-router";

export interface Plugin {
  routes?: RouteObject[];
  composer?: FC[];
}
