import { Suspense, type ComponentType, type ReactNode } from "react";
import { useClientExtensions } from "./provider";

/**
 * Props for extension slot components
 */
interface ExtensionSlotProps {
  id: string;
  fallback?: ReactNode;
  loading?: ReactNode;
  props?: Record<string, any>;
  filter?: (component: any) => boolean;
  limit?: number;
}

/**
 * Component slot that renders all components registered for a specific extension point
 */
export function ExtensionSlot({
  id,
  fallback,
  loading = <div>Loading extensions...</div>,
  props = {},
  filter,
  limit,
}: ExtensionSlotProps) {
  const { getComponents, isLoading } = useClientExtensions();

  if (isLoading) {
    return <>{loading}</>;
  }

  let components = getComponents(id);

  if (filter) {
    components = components.filter(filter);
  }

  if (limit) {
    components = components.slice(0, limit);
  }

  if (components.length === 0) {
    return <>{fallback}</>;
  }

  return (
    <>
      {components.map(({ id: componentId, component: Component }) => (
        <Suspense key={componentId} fallback={loading}>
          <Component {...props} />
        </Suspense>
      ))}
    </>
  );
}

/**
 * Single extension component renderer
 */
interface ExtensionComponentProps {
  extensionId: string;
  componentId: string;
  fallback?: ReactNode;
  loading?: ReactNode;
  props?: Record<string, any>;
}

export function ExtensionComponent({
  extensionId,
  componentId,
  fallback,
  loading = <div>Loading...</div>,
  props = {},
}: ExtensionComponentProps) {
  const { extensions } = useClientExtensions();

  const extension = extensions.find((ext) => ext.manifest.id === extensionId);
  if (!extension || !extension.instance) {
    return <>{fallback}</>;
  }

  const Component = extension.instance.components?.[componentId];
  if (!Component) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={loading}>
      <Component {...props} />
    </Suspense>
  );
}

/**
 * Layout component that can host multiple extension zones
 */
interface ExtensionLayoutProps {
  layoutId?: string;
  children: ReactNode;
  zones?: Record<string, ReactNode>;
}

export function ExtensionLayout({
  layoutId,
  children,
  zones = {},
}: ExtensionLayoutProps) {
  const { getLayouts } = useClientExtensions();

  if (!layoutId) {
    return <>{children}</>;
  }

  const layouts = getLayouts();
  const layout = layouts.find((l) => l.id === layoutId);

  if (!layout) {
    return <>{children}</>;
  }

  const LayoutComponent = layout.component as any;

  // Pass zones as props to the layout component
  return <LayoutComponent zones={zones}>{children}</LayoutComponent>;
}

/**
 * Provider wrapper that applies all extension providers
 */
interface ExtensionProvidersProps {
  children: ReactNode;
}

export function ExtensionProviders({ children }: ExtensionProvidersProps) {
  const { getProviders } = useClientExtensions();
  const providers = getProviders();

  return providers.reduce(
    (wrappedChildren, { component: Provider }) => (
      <Provider>{wrappedChildren}</Provider>
    ),
    children
  );
}

/**
 * Conditional renderer based on extension availability
 */
interface ExtensionConditionalProps {
  extensionId: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function ExtensionConditional({
  extensionId,
  children,
  fallback,
}: ExtensionConditionalProps) {
  const { extensions } = useClientExtensions();

  const extension = extensions.find((ext) => ext.manifest.id === extensionId);
  const isAvailable = extension && extension.instance;

  return <>{isAvailable ? children : fallback}</>;
}

/**
 * Hook to check if an extension is available
 */
export function useExtensionAvailable(extensionId: string): boolean {
  const { extensions } = useClientExtensions();
  const extension = extensions.find((ext) => ext.manifest.id === extensionId);
  return Boolean(extension && extension.instance);
}

/**
 * Hook to get a specific extension component
 */
export function useExtensionComponent(
  extensionId: string,
  componentId: string
): ComponentType<any> | null {
  const { extensions } = useClientExtensions();

  const extension = extensions.find((ext) => ext.manifest.id === extensionId);
  if (!extension || !extension.instance) {
    return null;
  }

  return extension.instance.components?.[componentId] || null;
}

/**
 * Hook to get all components for an extension point
 */
export function useExtensionComponents(pointId: string) {
  const { getComponents } = useClientExtensions();
  return getComponents(pointId);
}

/**
 * Hook to dynamically load an extension
 */
export function useExtensionLoader() {
  const { loadExtension, unloadExtension } = useClientExtensions();

  return {
    loadExtension,
    unloadExtension,
  };
}
