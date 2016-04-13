# st-mssql-proc
A es2015 helper class that simplifies calling stored procedures.

Example usage

```javascript
let MSSQLProc = require('st-mssql-proc');

let dbSettings = {
    "user": "xxx",
    "password": "xxx",
    "server": "xxx",
    "database": "MyDB",
    "connectionTimeout" : 30000,
    "requestTimeout" : 30000,
    "domain": "DOMAIN"
};

let DB = new MSSQLProc(dbSettings);

let verbose = true;

DB.call('MyProcName', {
    simpleParam : "value",
    udtParam: { foo : 0},
    udtArray: [
        { foo: 1 },
        { foo: 2 },
        { foo: 3 },
        { foo: 4 }
    ]
}, verbose);

```

**TO DO**  
Add more documentation
