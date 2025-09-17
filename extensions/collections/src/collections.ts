/**
 * Collections utility functions and data structures
 */

/**
 * A simple collection item interface
 */
export interface CollectionItem {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Base collection interface
 */
export interface Collection<T = CollectionItem> {
  id: string;
  name: string;
  description?: string;
  items: T[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Collection manager class for handling collection operations
 */
export class CollectionManager<T extends CollectionItem = CollectionItem> {
  private collections: Map<string, Collection<T>> = new Map();

  /**
   * Create a new collection
   */
  createCollection(name: string, description?: string): Collection<T> {
    const id = crypto.randomUUID();
    const now = new Date();

    const collection: Collection<T> = {
      id,
      name,
      description,
      items: [],
      createdAt: now,
      updatedAt: now,
    };

    this.collections.set(id, collection);
    return collection;
  }

  /**
   * Get a collection by ID
   */
  getCollection(id: string): Collection<T> | undefined {
    return this.collections.get(id);
  }

  /**
   * Get all collections
   */
  getAllCollections(): Collection<T>[] {
    return Array.from(this.collections.values());
  }

  /**
   * Add an item to a collection
   */
  addItem(
    collectionId: string,
    item: Omit<T, "id" | "createdAt" | "updatedAt">
  ): T | null {
    const collection = this.collections.get(collectionId);
    if (!collection) return null;

    const now = new Date();
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    } as T;

    collection.items.push(newItem);
    collection.updatedAt = now;

    return newItem;
  }

  /**
   * Remove an item from a collection
   */
  removeItem(collectionId: string, itemId: string): boolean {
    const collection = this.collections.get(collectionId);
    if (!collection) return false;

    const initialLength = collection.items.length;
    collection.items = collection.items.filter((item) => item.id !== itemId);

    if (collection.items.length < initialLength) {
      collection.updatedAt = new Date();
      return true;
    }

    return false;
  }

  /**
   * Delete a collection
   */
  deleteCollection(id: string): boolean {
    return this.collections.delete(id);
  }
}

/**
 * Default collection manager instance
 */
export const defaultCollectionManager = new CollectionManager();
