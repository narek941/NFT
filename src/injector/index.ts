class _Injector {
  private data: Map<string, any>;
  constructor() {
    this.data = new Map();
  }

  public get(key: string) {
    return this.data.get(key);
  }

  public set(key: string, value: any) {
    this.data.set(key, value);
  }
}

const Injector = new _Injector();

export default Injector;
