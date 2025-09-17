# Extension-Based Platform Architecture

This document outlines the comprehensive extension-based platform architecture for building modular applications with multiple entry points for client components, pages, and server code.

## 🏗️ Architecture Overview

The extension system provides a complete framework for building modular, extensible applications with the following key features:

- **🔌 Plugin Architecture**: Hot-swappable extensions with dynamic loading
- **⚡ Multiple Entry Points**: Client components, pages, server routes, and services
- **🔒 Type Safety**: Full TypeScript support with schema validation
- **🎛️ Lifecycle Management**: Extension activation, deactivation, and dependency management
- **🌐 Universal**: Works across client-side React and server-side Node.js
- **📦 Modular**: Clean separation of concerns with well-defined interfaces

## 📁 Project Structure

```
packages/
├── extension-system/          # Core extension system
│   ├── src/
│   │   ├── core/             # Registry, types, validation
│   │   ├── client/           # React integration
│   │   └── server/           # Server-side integration
│   └── dist/                 # Built package
│
extensions/                   # Extension implementations
├── artifacts/               # Existing artifacts extension
├── collections/             # Existing collections extension
└── example-dashboard/       # Example extension (NEW)
    ├── extension.json       # Extension manifest
    ├── src/
    │   ├── client.tsx       # Client-side code
    │   ├── server.ts        # Server-side code
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   └── routes/          # Route definitions
    └── dist/               # Built extension
```

## 🎯 Extension System Components

### 1. Core Extension Registry (`@chat-ai/extension-system`)

The heart of the system that manages extension lifecycle:

```typescript
import { ExtensionRegistry } from '@chat-ai/extension-system';

const registry = new ExtensionRegistry({
  devMode: true,
  hotReload: true,
  extensionPaths: ['./extensions/*/extension.json']
});

// Register and load extensions
await registry.registerExtension(manifest, loader);
```

### 2. Extension Manifest Schema

Each extension declares its capabilities via `extension.json`:

```json
{
  "id": "dashboard-example",
  "name": "Dashboard Example Extension",
  "version": "1.0.0",
  "capabilities": {
    "client": {
      "components": ["dashboard-widget", "stats-card"],
      "pages": ["dashboard-page"],
      "routes": ["dashboard-routes"]
    },
    "server": {
      "routes": ["dashboard-api"],
      "middleware": ["analytics-middleware"],
      "services": ["analytics-service"]
    }
  },
  "extensionPoints": [...],
  "permissions": ["read:analytics"]
}
```

### 3. Client-Side Extension Points

React integration for UI extensions:

```typescript
import { 
  ClientExtensionProvider, 
  ExtensionSlot, 
  useClientExtensions 
} from '@chat-ai/extension-system/client';

// Provider setup
<ClientExtensionProvider extensions={manifests}>
  <App />
</ClientExtensionProvider>

// Render extension components
<ExtensionSlot id="dashboard-widget" />

// Use extension hooks
const { getComponents, getRoutes } = useClientExtensions();
```

### 4. Server-Side Extension Points

Server integration for API and services:

```typescript
import { ServerExtensionRegistry } from '@chat-ai/extension-system/server';

const serverRegistry = new ServerExtensionRegistry();
await serverRegistry.initialize();

// Get extension routes
const routes = serverRegistry.getRoutes();
const middleware = serverRegistry.getMiddleware();
```

## 🔧 Extension Development

### Creating a New Extension

1. **Create Extension Directory**:
   ```bash
   mkdir extensions/my-extension
   cd extensions/my-extension
   ```

2. **Create Extension Manifest** (`extension.json`):
   ```json
   {
     "id": "my-extension",
     "name": "My Extension",
     "version": "1.0.0",
     "capabilities": {
       "client": {
         "components": ["my-component"]
       }
     }
   }
   ```

3. **Implement Client Code** (`src/client.tsx`):
   ```typescript
   import { ExtensionContext } from '@chat-ai/extension-system';
   
   export default {
     components: {
       'my-component': () => <div>Hello from extension!</div>
     },
     
     async activate(context: ExtensionContext) {
       console.log('Extension activated!');
     }
   };
   ```

4. **Build and Register**:
   ```typescript
   // In your main app
   import manifest from './extensions/my-extension/extension.json';
   
   await registry.registerExtension(manifest, () => 
     import('./extensions/my-extension/dist/client')
   );
   ```

### Extension Types

#### 🎨 Component Extensions
Provide reusable React components:
```typescript
components: {
  'header-widget': HeaderWidget,
  'sidebar-panel': SidebarPanel
}
```

#### 📄 Page Extensions
Define complete pages with routing:
```typescript
pages: {
  'settings-page': {
    path: '/settings',
    component: SettingsPage,
    meta: { title: 'Settings' }
  }
}
```

#### 🛣️ Route Extensions
Add custom routes to the application:
```typescript
routes: [
  {
    path: '/api/my-extension/*',
    element: <MyExtensionRoutes />
  }
]
```

#### 🔧 Service Extensions
Provide backend services and APIs:
```typescript
services: {
  'data-service': {
    service: new DataService(),
    lifecycle: {
      start: () => console.log('Service started'),
      stop: () => console.log('Service stopped')
    }
  }
}
```

#### ⚙️ Middleware Extensions
Add request/response processing:
```typescript
middleware: {
  'auth-middleware': {
    handler: (req, res, next) => {
      // Authentication logic
      next();
    },
    priority: 10
  }
}
```

## 🔌 Extension Points

Extensions can both provide and consume extension points:

### Providing Extension Points
```typescript
extensionPoints: [
  {
    "id": "toolbar-button",
    "name": "Toolbar Button",
    "type": "component",
    "schema": { /* JSON Schema */ }
  }
]
```

### Consuming Extension Points
```typescript
consumes: ["sidebar-navigation", "theme-provider"]
```

## 🚀 Usage Examples

### 1. Dashboard Extension

The included example shows a complete dashboard extension with:
- **Widgets**: Reusable dashboard components
- **Pages**: Full dashboard and analytics pages
- **API**: Server endpoints for data
- **Middleware**: Analytics tracking
- **Services**: Data processing services

### 2. Using Extensions in Your App

#### Client-Side Setup
```typescript
// main.tsx
import { ClientExtensionProvider } from '@chat-ai/extension-system/client';
import dashboardManifest from './extensions/dashboard/extension.json';

const extensions = [dashboardManifest];

function App() {
  return (
    <ClientExtensionProvider extensions={extensions}>
      <Router>
        <Routes>
          {/* Extension routes are automatically added */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ClientExtensionProvider>
  );
}
```

#### Using Extension Components
```typescript
import { ExtensionSlot } from '@chat-ai/extension-system/client';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render all dashboard widgets */}
      <ExtensionSlot id="dashboard-widget" />
    </div>
  );
}
```

#### Server-Side Setup
```typescript
// server.ts
import { ServerExtensionRegistry } from '@chat-ai/extension-system/server';

const serverRegistry = new ServerExtensionRegistry();

// Register extensions
await serverRegistry.registerExtension(dashboardManifest, () =>
  import('./extensions/dashboard/dist/server')
);

// Apply middleware
const middleware = serverRegistry.getMiddleware();
middleware.forEach(mw => app.use(mw.handler));

// Register routes
const routes = serverRegistry.getRoutes();
routes.forEach(([path, handlers]) => {
  handlers.forEach(route => {
    app[route.method.toLowerCase()](path, route.handler);
  });
});
```

## 🔧 Advanced Features

### Extension Communication
Extensions can communicate through:
- **Events**: Pub/sub messaging
- **Services**: Shared service dependencies
- **Context**: Shared state management

### Hot Reloading (Development)
```typescript
const registry = new ExtensionRegistry({
  devMode: true,
  hotReload: true
});

// Extensions reload automatically when files change
```

### Permission System
```typescript
// Extension declares permissions
"permissions": ["read:users", "write:dashboard"]

// Runtime permission checking
if (context.hasPermission('read:users')) {
  // Access user data
}
```

### Dependency Management
```typescript
// Extension dependencies
"dependencies": {
  "@my-org/shared-utils": "^1.0.0"
},
"consumes": ["auth-service", "theme-provider"]
```

## 🛠️ Development Workflow

1. **Create Extension**: Use the extension template
2. **Develop**: Build components, pages, and services
3. **Test**: Use the development server with hot reload
4. **Build**: Compile TypeScript to JavaScript
5. **Deploy**: Register with the main application

## 🎯 Benefits

- **🔄 Modularity**: Clean separation of features
- **⚡ Performance**: Lazy loading and code splitting
- **🧪 Testability**: Isolated, testable components
- **🚀 Scalability**: Add features without core changes
- **👥 Team Collaboration**: Independent development
- **🔧 Flexibility**: Swap implementations easily

## 📚 API Reference

### Core Classes
- `ExtensionRegistry`: Main registry for extension management
- `ServerExtensionRegistry`: Server-specific extension handling

### Client Components
- `ClientExtensionProvider`: React provider for extensions
- `ExtensionSlot`: Renders extension components
- `ExtensionLayout`: Layout wrapper with zones

### Hooks
- `useClientExtensions()`: Access extension registry
- `useExtensionComponent()`: Get specific extension component
- `useExtensionAvailable()`: Check extension availability

### Types
- `ExtensionManifest`: Extension configuration schema
- `ExtensionContext`: Runtime context for extensions
- `ExtensionPoint`: Extension point definition

This architecture provides a solid foundation for building extensible, modular applications that can grow and adapt over time while maintaining clean separation of concerns and type safety.