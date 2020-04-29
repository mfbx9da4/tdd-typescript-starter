import { LRUCache as LRUCacheV1 } from '../../src/lru-cache/LRUCacheV1'
import { LRUCache as LRUCacheV2 } from '../../src/lru-cache/LRUCacheV2'

// https://leetcode.com/problems/lru-cache/
// LRUCache cache = new LRUCache( 2 /* capacity */ );
// cache.put(1, 1); cache[1] = 1
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4

const versions: Record<string, any> = {
  LRUCacheV1,
  LRUCacheV2,
}

for (const name in versions) {
  const LRUCache = versions[name]
  describe(`LRUCache::${name}`, () => {
    it("doesn't crash when constructing", () => {
      new LRUCache(2)
    })

    it('should set the cache and retrieve a value', () => {
      const cache = new LRUCache(1)
      cache.put(2, 2)
      expect(cache.get(2)).toEqual(2)
    })

    it('should evict old keys', () => {
      const cache = new LRUCache(1)
      cache.put(2, 2)
      expect(cache.get(2)).toEqual(2)
      cache.put(3, 3)
      expect(cache.get(2)).toEqual(-1)
      expect(cache.get(3)).toEqual(3)
    })

    it('should evict old keys but not duplicates', () => {
      const cache = new LRUCache(2)
      cache.put(2, 2)
      cache.put(3, 3)
      cache.put(2, 4)
      cache.put(4, 4)
      expect(cache.get(3)).toEqual(-1)
      expect(cache.get(4)).toEqual(4)
      expect(cache.get(2)).toEqual(4)
    })

    it('should bump up keys when we use them', () => {
      const cache = new LRUCache(2)
      cache.put(2, 2)
      cache.put(3, 3)
      expect(cache.get(2)).toEqual(2)
      cache.put(4, 4)
      expect(cache.get(3)).toEqual(-1)
      expect(cache.get(4)).toEqual(4)
      expect(cache.get(4)).toEqual(4)
    })

    it('should handle duplicates', () => {
      const cache = new LRUCache(2)
      expect(cache.get(2)).toEqual(-1)
      cache.put(2, 6)
      cache.put(2, 5)
      expect(cache.get(1)).toEqual(-1)
      cache.put(1, 5)
      cache.put(1, 2)
      expect(cache.get(1)).toEqual(2)
      expect(cache.get(2)).toEqual(5)
    })
  })
}
