import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { IDevice } from 'types/Device';

class SqliteHandler {
  private db: sqlite3.Database;

  constructor(dbFilePath: string) {
    // check sqlite file
    const dir = path.dirname(dbFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // connection to db
    this.db = new sqlite3.Database(dbFilePath);
  }

  public createTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS devices (
        controller_id varchar(20) PRIMARY KEY,
        name varchar(20),
        status varchar(20),
        tester varchar(20),
        capacity varchar(20),
        fw_version varchar(20),
        fw_minor varchar(20),
        feature varchar(20),
      )
    `;

    return new Promise((resolve, reject) => {
      this.db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public InsertDevice(d: IDevice): Promise<void> {
    const sql = `
      INSERT INTO devices (controller_id, name, status, tester, capacity, fw_version, fw_minor, feature)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      this.db.run(
        sql,
        [
          d.controllerID,
          d.name,
          d.status,
          d.tester,
          d.capacity,
          d.fwVersion,
          d.fwMinor,
          d.feature,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public GetAll(): Promise<IDevice[]> {
    const sql = `SELECT * FROM devices`;

    return new Promise((resolve, reject) => {
      this.db.get(sql, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as IDevice[]);
        }
      });
    });
  }

  public UpdateDevice(d: IDevice): Promise<void> {
    const sql = `
      UPDATE devices SET name = ?, status = ?, tester = ?, capacity = ?, fw_version = ?, fw_minor = ?, feature = ?
      WHERE controller_id = ?
    `;

    return new Promise((resolve, reject) => {
      this.db.run(
        sql,
        [
          d.name,
          d.status,
          d.tester,
          d.capacity,
          d.fwVersion,
          d.fwMinor,
          d.feature,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public DeleteDevice(id: string): Promise<void> {
    const sql = `
      DELETE FROM devices WHERE controller_id = ?
    `;

    return new Promise((resolve, reject) => {
      this.db.run(sql, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default SqliteHandler;
