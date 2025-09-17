# @chat-ai/extension-collections

A TypeScript package for managing collections and collection items in the chat-ai workspace.

## Features

- **CollectionManager**: A class for managing multiple collections
- **Collection Interface**: Type-safe collection definitions
- **CollectionItem Interface**: Standard item structure for collections
- **CRUD Operations**: Create, read, update, and delete collections and items

## Installation

This package is part of the chat-ai monorepo workspace. It's automatically installed when you run:

```bash
npm install
```

## Usage

```typescript
import { CollectionManager, Collection, CollectionItem } from '@chat-ai/extension-collections';

// Create a new collection manager
const manager = new CollectionManager();

// Create a new collection
const myCollection = manager.createCollection('My Collection', 'A sample collection');

// Add an item to the collection
const newItem = manager.addItem(myCollection.id, {
  name: 'Sample Item',
  description: 'This is a sample item'
});

// Get all collections
const allCollections = manager.getAllCollections();

// Get a specific collection
const collection = manager.getCollection(myCollection.id);
```

## API Reference

### CollectionItem

```typescript
interface CollectionItem {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Collection

```typescript
interface Collection<T = CollectionItem> {
  id: string;
  name: string;
  description?: string;
  items: T[];
  createdAt: Date;
  updatedAt: Date;
}
```

### CollectionManager

- `createCollection(name: string, description?: string): Collection<T>`
- `getCollection(id: string): Collection<T> | undefined`
- `getAllCollections(): Collection<T>[]`
- `addItem(collectionId: string, item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T | null`
- `removeItem(collectionId: string, itemId: string): boolean`
- `deleteCollection(id: string): boolean`

## Scripts

- `npm run build` - Build the package
- `npm run dev` - Build in watch mode
- `npm run lint` - Run linting
- `npm run clean` - Clean build output
