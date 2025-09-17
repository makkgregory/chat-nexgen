import { api } from "@chat-ai/trpc";

/**
 * Example component demonstrating tRPC usage
 */
export function TRPCExample() {
  // Query health status
  const { data: health, isLoading: healthLoading } =
    api.health.check.useQuery();

  // Query all users
  const { data: users, isLoading: usersLoading } = api.user.getAll.useQuery();

  // Create user mutation
  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      // Invalidate users query to refetch data
      api.useUtils().user.getAll.invalidate();
    },
  });

  const handleCreateUser = () => {
    createUser.mutate({
      name: "New User",
      email: `user${Date.now()}@example.com`,
    });
  };

  if (healthLoading || usersLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">tRPC Integration Example</h1>

      {/* Health Status */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">API Health</h2>
        <p>
          Status: <span className="font-mono">{health?.status}</span>
        </p>
        <p>
          Uptime:{" "}
          <span className="font-mono">{health?.uptime?.toFixed(2)}s</span>
        </p>
        <p>
          Timestamp:{" "}
          <span className="font-mono text-sm">{health?.timestamp}</span>
        </p>
      </div>

      {/* Users List */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <div className="space-y-2 mb-4">
          {users?.map((user) => (
            <div key={user.id} className="p-2 bg-white border rounded">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleCreateUser}
          disabled={createUser.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {createUser.isPending ? "Creating..." : "Create Random User"}
        </button>

        {createUser.error && (
          <p className="mt-2 text-red-600">Error: {createUser.error.message}</p>
        )}
      </div>
    </div>
  );
}
