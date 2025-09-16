# Chat AI - Turborepo Monorepo

This project has been migrated to a Turborepo monorepo structure.

## Project Structure

```text
chat-ai/
├── apps/
│   └── web/                    # React application (formerly the root project)
├── packages/                   # Shared packages (empty for now)
├── turbo.json                  # Turborepo configuration
├── package.json                # Root package.json with workspaces
└── README.md
```

## Scripts

From the root directory, you can run:

- `npm run dev` - Start development server for all apps
- `npm run build` - Build all apps and packages
- `npm run lint` - Lint all apps and packages
- `npm run test` - Run tests for all apps and packages
- `npm run clean` - Clean build artifacts

## Development

The main React application is now located in `apps/web/`. All the original source code, configurations, and dependencies have been moved there.

To add new packages or apps:

1. Add them to the appropriate `apps/` or `packages/` directory
2. Make sure they have a `package.json` with a unique name
3. Update scripts in the root `package.json` if needed

## Migration Notes

- All application code moved from root to `apps/web/`
- Root `package.json` now manages workspaces
- Turborepo handles task execution across the monorepo
- TypeScript configuration updated for project references

## Issues

**Node.js Version**: This project requires Node.js 20.19+ or 22.12+ due to Vite dependencies. If you're using an older version, please upgrade Node.js to run the development server.

**Build Errors**: There are some TypeScript errors that need to be resolved:

- Import type issues in some UI components
- React Markdown type compatibility issues

These can be fixed by updating import statements and TypeScript configurations.
