export class DataSource {
  private id: NodeJS.Timer
  private isDestroied = false

  ondata: (value: number) => void
  oncomplete: () => void


  constructor() {
    let i = 0
    this.id = setInterval(() => {
      this.emit(i++)
    }, 200)
  }


  emit(n: number): void {
    const limit = 10
    if (this.ondata) {
      this.ondata(n)
    }
    if (n === limit) {
      if (this.oncomplete) {
        this.oncomplete()
      }
      this.destroy()
    }
  }


  destroy(): void {
    if (!this.isDestroied) {
      this.isDestroied = true
      console.log('destroy')
      clearInterval(this.id)
    }
  }

}
