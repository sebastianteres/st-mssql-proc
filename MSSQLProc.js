'use strict';
let sql = require('mssql'),
    StPromise = require('st-promise');

class MSSQLProc {
    constructor(settings) {
        this.settings = settings;
    }
    call(proc, parametersObject) {
        let self = this;
        return new StPromise((resolve, reject) => {
            let connection = new sql.Connection(self.settings, function(err){
                if (err) return reject(err);
                let rq = new sql.Request(connection);
                rq.stream = true;

                if(parametersObject) {
                    if (parametersObject.verbose) {
                        rq.verbose = true;
                        delete parametersObject.verbose;
                    }
                    MSSQLProc.addParameterToRequest(rq, parametersObject);
                }
                rq.execute(proc);

                let results = [];
                rq.on('row', function(row){
                    results.push(row);
                });
                rq.on('done', function(){
                    resolve(results);
                    connection.close();
                });
                rq.on('error', function(error){
                    reject(error);
                });
            });
        });
    }
    static addParameterToRequest(rq, parameters) {
        Object.keys(parameters).forEach(k => {
            let value = parameters[k];
            if (typeof value === 'object' && value !== null) {
                value = MSSQLProc.buildTable(value);
            }
            rq.input(k, value);
        });
    }
    static buildTable(obj) {
        let table = new sql.Table();
        if (Array.isArray(obj)) {
            if (obj.length) {
                Object.keys(obj[0]).forEach(k => table.columns.add(k, sql.VarChar));
                obj.forEach(r => {
                    let values = [];
                    Object.keys(r).forEach(k => { values.push(r[k]); });
                    table.rows.add.apply(table.rows, values);
                });
            }
        } else {
            let values = [];
            Object.keys(obj).forEach(k => { table.columns.add(k, sql.VarChar); values.push(obj[k]); });
            table.rows.add.apply(table.rows, values);
        }
        return table;
    }
}

module.exports = MSSQLProc;
