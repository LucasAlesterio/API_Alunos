const srcConfig = {
    "type": "postgres", 
    "host": "localhost",
    "username": "postgres",
    "password": "000000",
    "port": 5432,
    "database": "asa_tb1", 
    "synchronize": true, 
    "entities": ["src/models/**.ts"],
    "logging": false
}
const distConfig = {
    "type": "postgres", 
    "host": "db",
    "username": "postgres",
    "password": "000000",
    "port": 5432,
    "database": "asa_tb1", 
    "synchronize": true, 
    "entities": ["dist/models/**.js"],
    "logging": false
}
console.log(process.env.TS_NODE,"NODE ENV")
module.exports = process.env.TS_NODE ? srcConfig : distConfig;