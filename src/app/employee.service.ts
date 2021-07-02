/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public pdb;
  public employees;

  createPouchDB = async () => {
    PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = await new PouchDB('employees.db', {
      adapter: 'cordova-sqlite',
      location: 'default',
      androidDatabaseImplementation: 2,
    });
    this.pdb.info().then((res) => {
      console.log(res);
    });
  };

  create(employee) {
    return this.pdb.post(employee);
  }

  update(employee) {
    return this.pdb.put(employee);
  }

  delete(employee) {
    return this.pdb.delete(employee);
  }

  read = async () => {
    // this.pdb
    //   .changes({ live: true, since: 'now', include_docs: true })
    //   .on('change', () => {
    //     allDocs().then((emps) => {
    //       this.employees = emps;
    //     });
    //   });
    await this.pdb.allDocs({ include_docs: true }).then((docs) => {
      this.employees = docs.rows.map((row) => {
        row.doc.Date = new Date(row.doc.Date);
        return row.doc;
      });
    });
    return this.employees;
  };
}
