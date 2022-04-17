class Job {
  #name;

  #executionTime;

  constructor(name, executionTime) {
    this.#name = name;
    this.#executionTime = executionTime;
  }

  get name() {
    return this.#name;
  }

  get executionTime() {
    return this.#executionTime;
  }

  onStartCallback() {
    const now = new Date();
    return () => console.info(`Job "${this.#name}" started at ${now.toISOString()}`);
  }

  onCompleteCallback() {
    const now = new Date();
    return () => console.info(`Job "${this.#name}" finished at ${now.toISOString()}`);
  }

  handle() {
    throw new Error(`The method handle() must be implemented for "${this.#name}".`);
  }
}

export default Job;
