'use strict';
let MSSQL  = require('../MSSQLProc'),
    dbConnection = {
        user: 'xxxxxxxxx',
        password: 'xxxxxxxxx',
        server: 'xxxxxxx',
        database: 'xxxxxxx',
        connectionTimeout : 30000,
requestTimeout : 30000
    },
    DB = new MSSQL(dbConnection);

DB.call('proc_name').success(r => console.log(r)).error(e => console.log(e));

//Call proc with data
let data = { foo: 'bar', udt: { foo: 'bar' }, udtList: [ {col1: 1}, {col1: 2}]};
DB.call('proc_name', data).success(r => console.log(r)).error(e => console.log(e));
