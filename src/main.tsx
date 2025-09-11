import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router";
import "./index.css";
import * as plugins from "./plugins";

const router = createBrowserRouter(
  Object.values(plugins).flatMap<RouteObject>((plugin) => plugin.routes ?? [])
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
