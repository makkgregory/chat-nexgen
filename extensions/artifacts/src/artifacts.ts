/**
 * Artifacts management utilities and data structures
 */

/**
 * Supported artifact types
 */
export enum ArtifactType {
  TEXT = "text",
  CODE = "code",
  IMAGE = "image",
  DOCUMENT = "document",
  DATA = "data",
  PRESENTATION = "presentation",
  SPREADSHEET = "spreadsheet",
}

/**
 * Artifact metadata and content structure
 */
export interface Artifact {
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

/**
 * Artifact version history
 */
export interface ArtifactVersion {
  id: string;
  artifactId: string;
  version: number;
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  changes?: string;
}

/**
 * Artifact search and filter options
 */
export interface ArtifactSearchOptions {
  type?: ArtifactType;
  tags?: string[];
  name?: string;
  content?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

/**
 * Artifact manager class for handling artifact operations
 */
export class ArtifactManager {
  private artifacts: Map<string, Artifact> = new Map();
  private versions: Map<string, ArtifactVersion[]> = new Map();

  /**
   * Create a new artifact
   */
  createArtifact(
    name: string,
    type: ArtifactType,
    content: string,
    options?: {
      description?: string;
      metadata?: Record<string, any>;
      tags?: string[];
    }
  ): Artifact {
    const id = crypto.randomUUID();
    const now = new Date();

    const artifact: Artifact = {
      id,
      name,
      description: options?.description,
      type,
      content,
      metadata: options?.metadata,
      tags: options?.tags || [],
      createdAt: now,
      updatedAt: now,
      version: 1,
    };

    this.artifacts.set(id, artifact);

    // Create initial version
    this.createVersion(artifact, "Initial version");

    return artifact;
  }

  /**
   * Get an artifact by ID
   */
  getArtifact(id: string): Artifact | undefined {
    return this.artifacts.get(id);
  }

  /**
   * Get all artifacts
   */
  getAllArtifacts(): Artifact[] {
    return Array.from(this.artifacts.values());
  }

  /**
   * Update an artifact
   */
  updateArtifact(
    id: string,
    updates: Partial<Omit<Artifact, "id" | "createdAt" | "version">>,
    changes?: string
  ): Artifact | null {
    const artifact = this.artifacts.get(id);
    if (!artifact) return null;

    const now = new Date();
    const updatedArtifact: Artifact = {
      ...artifact,
      ...updates,
      updatedAt: now,
      version: artifact.version + 1,
    };

    this.artifacts.set(id, updatedArtifact);

    // Create version history if content changed
    if (updates.content && updates.content !== artifact.content) {
      this.createVersion(updatedArtifact, changes);
    }

    return updatedArtifact;
  }

  /**
   * Delete an artifact
   */
  deleteArtifact(id: string): boolean {
    const deleted = this.artifacts.delete(id);
    if (deleted) {
      this.versions.delete(id);
    }
    return deleted;
  }

  /**
   * Search artifacts
   */
  searchArtifacts(options: ArtifactSearchOptions): Artifact[] {
    let results = this.getAllArtifacts();

    if (options.type) {
      results = results.filter((artifact) => artifact.type === options.type);
    }

    if (options.tags && options.tags.length > 0) {
      results = results.filter((artifact) =>
        options.tags!.some((tag) => artifact.tags?.includes(tag))
      );
    }

    if (options.name) {
      const nameQuery = options.name.toLowerCase();
      results = results.filter((artifact) =>
        artifact.name.toLowerCase().includes(nameQuery)
      );
    }

    if (options.content) {
      const contentQuery = options.content.toLowerCase();
      results = results.filter((artifact) =>
        artifact.content.toLowerCase().includes(contentQuery)
      );
    }

    if (options.dateRange) {
      results = results.filter(
        (artifact) =>
          artifact.createdAt >= options.dateRange!.from &&
          artifact.createdAt <= options.dateRange!.to
      );
    }

    return results;
  }

  /**
   * Get artifact versions
   */
  getArtifactVersions(artifactId: string): ArtifactVersion[] {
    return this.versions.get(artifactId) || [];
  }

  /**
   * Get artifacts by type
   */
  getArtifactsByType(type: ArtifactType): Artifact[] {
    return this.getAllArtifacts().filter((artifact) => artifact.type === type);
  }

  /**
   * Get artifacts by tag
   */
  getArtifactsByTag(tag: string): Artifact[] {
    return this.getAllArtifacts().filter((artifact) =>
      artifact.tags?.includes(tag)
    );
  }

  /**
   * Create a version history entry
   */
  private createVersion(artifact: Artifact, changes?: string): void {
    const version: ArtifactVersion = {
      id: crypto.randomUUID(),
      artifactId: artifact.id,
      version: artifact.version,
      content: artifact.content,
      metadata: artifact.metadata,
      createdAt: new Date(),
      changes,
    };

    const versions = this.versions.get(artifact.id) || [];
    versions.push(version);
    this.versions.set(artifact.id, versions);
  }
}

/**
 * Default artifact manager instance
 */
export const defaultArtifactManager = new ArtifactManager();
