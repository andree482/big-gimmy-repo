// Simple TTL cache with basic eviction
type CacheEntry<T> = { value: T; expiresAt: number };

class TTLCache {
  private store = new Map<string, CacheEntry<any>>();
  private maxSize: number;

  constructor(maxSize = 200) {
    this.maxSize = maxSize;
  }

  get<T = any>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value as T;
  }

  set<T = any>(key: string, value: T, ttlMs: number): void {
    // Evict oldest when exceeding max size
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      if (firstKey) this.store.delete(firstKey);
    }
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  async wrap<T = any>(key: string, fetcher: () => Promise<T>, ttlMs: number): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== undefined) return cached;
    const fresh = await fetcher();
    this.set<T>(key, fresh, ttlMs);
    return fresh;
  }
}

export const cache = new TTLCache(300);