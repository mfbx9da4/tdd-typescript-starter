type Item = { value: number; count: number }

export class LRUCache {
  private dict: Map<number, Item>
  private queue: Array<number>
  private capacity: number
  constructor(capacity: number) {
    this.dict = new Map<number, Item>()
    this.capacity = capacity
    this.queue = []
  }

  removeOldest() {
    while (this.queue.length) {
      const oldest = this.queue.shift() as number
      const item = this.dict.get(oldest)
      if (item) {
        if (item.count === 1) {
          this.dict.delete(oldest)
          return
        }
        this.dict.set(oldest, { ...item, count: item.count - 1 })
      }
    }
  }

  get(key: number): number {
    const item = this.dict.get(key)
    if (item) {
      this.queue.push(key)
      this.dict.set(key, { ...item, count: item.count + 1 })
      return item.value
    }
    return -1
  }

  put(key: number, value: number): void {
    const prev = this.dict.get(key)
    const item = { value, count: 1 }
    if (prev) {
      item.count += prev.count
    } else if (this.dict.size === this.capacity) {
      this.removeOldest()
    }
    this.queue.push(key)
    this.dict.set(key, item)
  }
}
