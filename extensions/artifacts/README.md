# @chat-ai/extension-artifacts

A TypeScript package for managing artifacts and their versions in the chat-ai workspace. Artifacts can be any type of content such as text, code, images, documents, or data that needs to be stored, versioned, and searched.

## Features

- **ArtifactManager**: A class for managing artifacts with full CRUD operations
- **Artifact Types**: Support for multiple artifact types (text, code, image, document, etc.)
- **Version History**: Automatic versioning and history tracking for artifacts
- **Search & Filter**: Advanced search capabilities with multiple filter options
- **Metadata Support**: Flexible metadata and tagging system
- **Type Safety**: Full TypeScript support with comprehensive interfaces

## Installation

This package is part of the chat-ai monorepo workspace. It's automatically installed when you run:

```bash
npm install
```

## Usage

```typescript
import { 
  ArtifactManager, 
  ArtifactType, 
  Artifact,
  ArtifactSearchOptions 
} from '@chat-ai/extension-artifacts';

// Create a new artifact manager
const manager = new ArtifactManager();

// Create a new code artifact
const codeArtifact = manager.createArtifact(
  'My Component',
  ArtifactType.CODE,
  'const Component = () => <div>Hello</div>;',
  {
    description: 'A simple React component',
    metadata: { language: 'typescript', framework: 'react' },
    tags: ['react', 'component', 'ui']
  }
);

// Update the artifact
manager.updateArtifact(codeArtifact.id, {
  content: 'const Component = () => <div>Hello World!</div>;',
  description: 'Updated React component'
}, 'Added world to greeting');

// Search for artifacts
const searchResults = manager.searchArtifacts({
  type: ArtifactType.CODE,
  tags: ['react'],
  name: 'component'
});

// Get artifact versions
const versions = manager.getArtifactVersions(codeArtifact.id);
```

## API Reference

### ArtifactType

```typescript
enum ArtifactType {
  TEXT = 'text',
  CODE = 'code',
  IMAGE = 'image',
  DOCUMENT = 'document',
  DATA = 'data',
  PRESENTATION = 'presentation',
  SPREADSHEET = 'spreadsheet'
}
```

### Artifact

```typescript
interface Artifact {
  id: string;
  name: string;
  description?: string;
  type: ArtifactType;
  content: string;
  metadata?: Record<string, any>;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
```

### ArtifactVersion

```typescript
interface ArtifactVersion {
  id: string;
  artifactId: string;
  version: number;
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  changes?: string;
}
```

### ArtifactSearchOptions

```typescript
interface ArtifactSearchOptions {
  type?: ArtifactType;
  tags?: string[];
  name?: string;
  content?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}
```

### ArtifactManager Methods

- `createArtifact(name, type, content, options?)` - Create a new artifact
- `getArtifact(id)` - Get an artifact by ID
- `getAllArtifacts()` - Get all artifacts
- `updateArtifact(id, updates, changes?)` - Update an artifact
- `deleteArtifact(id)` - Delete an artifact
- `searchArtifacts(options)` - Search artifacts with filters
- `getArtifactVersions(artifactId)` - Get version history
- `getArtifactsByType(type)` - Get artifacts by type
- `getArtifactsByTag(tag)` - Get artifacts by tag

## Examples

### Creating Different Artifact Types

```typescript
// Text artifact
const textArtifact = manager.createArtifact(
  'Meeting Notes',
  ArtifactType.TEXT,
  'Meeting notes from project kickoff...',
  { tags: ['meeting', 'notes'] }
);

// Image artifact (base64 or URL)
const imageArtifact = manager.createArtifact(
  'Design Mockup',
  ArtifactType.IMAGE,
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  { 
    description: 'Homepage design mockup',
    metadata: { width: 1920, height: 1080, format: 'png' },
    tags: ['design', 'mockup', 'homepage']
  }
);

// Document artifact
const docArtifact = manager.createArtifact(
  'API Documentation',
  ArtifactType.DOCUMENT,
  '# API Documentation\n\n## Overview\n...',
  { 
    metadata: { format: 'markdown' },
    tags: ['docs', 'api']
  }
);
```

### Advanced Search

```typescript
// Search by multiple criteria
const results = manager.searchArtifacts({
  type: ArtifactType.CODE,
  tags: ['react', 'component'],
  content: 'useState',
  dateRange: {
    from: new Date('2024-01-01'),
    to: new Date('2024-12-31')
  }
});
```

## Scripts

- `npm run build` - Build the package
- `npm run dev` - Build in watch mode
- `npm run lint` - Run linting
- `npm run clean` - Clean build output
