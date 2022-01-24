const {createPool} = require('mysql2/promise');

const pool = createPool({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'megaK_santa_gifts',
    decimalNumbers: true,
    namedPlaceholders: true,
})


module.exports = {
    pool,
}