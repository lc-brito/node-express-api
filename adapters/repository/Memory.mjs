class Memory {
  #data;

  static DELAY = 10;

  constructor() {
    this.#data = {};
  }

  createCollection(collectionName) {
    this.#data[collectionName] = {};
  }

  #collectionsExists(collection) {
    return Object.keys(this.#data).includes(collection);
  }

  #collectionExistsOrFail(collectionName) {
    if (!this.#collectionsExists(collectionName)) {
      throw new Error(`Collection "${collectionName}" doesn't exists.`);
    }
  }

  save(collection, data) {
    this.#data[collection] = this.#data[collection] || {};
    this.#data[collection][data.id] = data;

    return new Promise((resolve) => {
      setTimeout(resolve, Memory.DELAY);
    });
  }

  remove(collection, id) {
    this.#collectionExistsOrFail(collection);

    const dataExists = Object.keys(this.#data[collection]).includes(id);

    let affectedRows = 0;
    if (dataExists) {
      affectedRows = 1;
      delete this.#data[collection][id];
    }

    return new Promise((resolve) => {
      setTimeout(
        resolve({ affected_rows: affectedRows }),
        Memory.DELAY,
      );
    });
  }

  get(collection, id) {
    this.#collectionExistsOrFail(collection);

    const dataExists = Object.keys(this.#data[collection]).includes(id);

    let result = null;
    if (dataExists) {
      result = this.#data[collection][id];
    }

    return new Promise((resolve) => {
      setTimeout(resolve(result), Memory.DELAY);
    });
  }

  getAll(collection) {
    this.#collectionExistsOrFail(collection);

    return new Promise((resolve) => {
      const response = () => Object.values(
        this.#data[collection],
      );
      setTimeout(() => resolve(response()), Memory.DELAY);
    });
  }
}

export default new Memory();
