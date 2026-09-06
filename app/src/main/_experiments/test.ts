import * as Database from 'better-sqlite3'

const test = new Database('testSQLite3.sqlite3')
const sql = 'CREATE TABLE test_table (id INTEGER PRIMARY KEY, name TEXT)'
test.exec(sql)

const insertSql = 'INSERT INTO test_table (id, name) VALUES (?, ?)'
const stmt = test.prepare(insertSql)
stmt.run(1, 'テストWorkspace')

const selectSql = 'SELECT * FROM test_table'
const selectStmt = test.prepare(selectSql)
const result = selectStmt.get()

console.log(result)
