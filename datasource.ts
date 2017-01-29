export class DataSource {
  id: NodeJS.Timer
  onnext: (value: number) => void
  oncomplete: () => void


  constructor() {
    let i = 0
    this.id = setInterval(() => {
      if (this.onnext) {
        this.onnext(i++)
      }
    }, 100)
  }


  destroy(): void {
    console.log('destroy is called.')
    clearInterval(this.id)
    this.oncomplete()
  }

}
