class Paginator {
  #records;

  constructor(records) {
    this.#records = records;
  }

  paginate(page, limit) {
    const offset = (page - 1) * limit;

    return {
      data: this.#records.slice(offset, offset + limit),
      meta: {
        page,
        limit,
        pages: Math.ceil(this.#records.length / limit),
        records: this.#records.length,
      },
    };
  }
}

export default Paginator;
