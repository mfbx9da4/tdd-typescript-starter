export class LRUCache {
  private dict: Record<number, number>
  private queue: Array<number>
  private capacity: number
  constructor(capacity: number) {
    this.dict = {}
    this.capacity = capacity
    this.queue = []
  }

  get(key: number): number {
    if (key in this.dict) {
      for (let i = 0; i < this.queue.length; i++) {
        if (this.queue[i] === key) this.queue.splice(i, 1)
      }
      this.queue.push(key)
      return this.dict[key]
    }
    return -1
  }

  put(key: number, value: number): void {
    if (key in this.dict) {
      for (let i = 0; i < this.queue.length; i++) {
        const val = this.queue[i]
        if (val === key) {
          this.queue.splice(i, 1)
          break
        }
      }
    }
    this.queue.push(key)
    this.dict[key] = value
    if (this.queue.length > this.capacity) {
      const oldest = this.queue.shift() as number
      delete this.dict[oldest]
    }
  }
}
