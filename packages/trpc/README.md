# @chat-ai/trpc

A tRPC client package with TanStack React Query integration for the chat-ai monorepo.

## Installation

This package is part of the chat-ai monorepo and should be installed as a dependency:

```json
{
  "dependencies": {
    "@chat-ai/trpc": "file:../../packages/trpc"
  }
}
```

## Usage

### Basic Setup

Wrap your app with the `TRPCProvider`:

```tsx
import { TRPCProvider } from '@chat-ai/trpc';

function App() {
  return (
    <TRPCProvider config={{ url: 'http://localhost:3001/trpc' }}>
      <MyApp />
    </TRPCProvider>
  );
}
```

### Using tRPC Hooks

```tsx
import { api } from '@chat-ai/trpc';

function UserComponent() {
  // Query all users
  const { data: users, isLoading } = api.user.getAll.useQuery();
  
  // Query a specific user
  const { data: user } = api.user.getById.useQuery({ id: '1' });
  
  // Create a user mutation
  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch users
      utils.user.getAll.invalidate();
    }
  });
  
  // Get utils for invalidation
  const utils = api.useUtils();
  
  const handleCreateUser = () => {
    createUser.mutate({
      name: 'John Doe',
      email: 'john@example.com'
    });
  };
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Users</h1>
      {users?.map(user => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
      <button onClick={handleCreateUser}>
        Create User
      </button>
    </div>
  );
}
```

### Health Check

```tsx
import { api } from '@chat-ai/trpc';

function HealthCheck() {
  const { data: health } = api.health.check.useQuery();
  
  return (
    <div>
      Status: {health?.status}
      Uptime: {health?.uptime}s
    </div>
  );
}
```

### Configuration

You can customize the tRPC client configuration:

```tsx
import { TRPCProvider, createQueryClient } from '@chat-ai/trpc';

const customQueryClient = createQueryClient();

function App() {
  return (
    <TRPCProvider 
      config={{ 
        url: process.env.REACT_APP_API_URL || 'http://localhost:3001/trpc',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }}
      queryClient={customQueryClient}
    >
      <MyApp />
    </TRPCProvider>
  );
}
```

## API Reference

### Available Routers

- `api.health.*` - Health check endpoints
- `api.user.*` - User management endpoints

### Available Hooks

- `useTRPCUtils()` - Get tRPC utilities for invalidation
- `useInvalidateAll()` - Invalidate all queries
- `useInvalidateRouter()` - Invalidate specific router queries

## Development

```bash
# Build the package
npm run build

# Watch for changes
npm run dev

# Run tests
npm test
```