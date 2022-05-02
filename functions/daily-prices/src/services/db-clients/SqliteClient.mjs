import SQLite from "better-sqlite3";

export class SQLiteClient {
  #tableName = "";
  /**
   * @type {import("better-sqlite3").Database}
   */
  #db;

  /**
   * @param {string} dbFileName
   * @param {import('better-sqlite3').Options} dbOptions
   * @param {import("better-sqlite3").Database} db
   */
  constructor(
    dbFileName,
    dbOptions = {},
    db = new SQLite(dbFileName, Object.assign({ readonly: true }, dbOptions))
  ) {
    this.#db = db;
  }

  /**
   * @param {string} tableName
   */
  setTargetTable(tableName) {
    this.#tableName = tableName;
    return this;
  }

  /**
   * @param {string=} id
   * @returns
   */
  read(id = "") {
    if (!this.#tableName) throw new Error(`[SQLite] Target Table MUST BE SET`);
    return id ? this.#readById(id) : this.#readAll();
  }

  /**
   * @param {string} id
   * @param {string=} idColumnName
   */
  #readById(id, idColumnName = "key") {
    try {
      return this.#db
        .prepare(`SELECT * FROM ${this.#tableName} WHERE ${idColumnName}=?`)
        .get(id);
    } catch (error) {
      console.error(`[SQLite/${this.#readById.name}]`, error);
      return false;
    }
  }

  #readAll() {
    try {
      return this.#db.prepare(`SELECT * FROM ${this.#tableName}`).all();
    } catch (error) {
      console.error(`[SQLite/${this.#readAll.name}]`, error);
      return false;
    }
  }
}
