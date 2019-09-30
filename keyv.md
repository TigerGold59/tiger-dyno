# Database
By default this bot should use [keyv](https://github.com/lukechilds/keyv) and sqlite to store data such as mutes and server prefixes, as it comes with dependencies keyv and @keyv/sqlite.

## How to use
Documentation: [keyv](https://github.com/lukechilds/keyv/blob/master/README.md)
First, create a database file at `example/example.db` by using `sqlite3 /this-cloned-folder/example/example.db`, then in the shell type `select 1;`, then finally `.exit`.
```
const kv = require("keyv")
var database = new kv("sqlite://example/example.db")
database.set("kvcool", "true").then(() => {
  database.get("kvcool").then(value => {
    console.log(value)
  })
})
```
This sets a value in our database called `kv_cool` to `true`, and then logs `true`.
