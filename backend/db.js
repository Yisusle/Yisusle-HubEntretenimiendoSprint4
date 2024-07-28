const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Conectado a la base de datos SQL Server');
  } catch (err) {
    console.error('Error, no se puede conectar:', err);
  }
}

module.exports = {
  sql,
  connectToDatabase
};
