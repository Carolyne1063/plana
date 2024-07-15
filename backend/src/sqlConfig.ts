import * as sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config()

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function testConnection() {
  try {
    const pool = await sql.connect(sqlConfig);
    console.log('Connected to SQL Server successfully');

    
    const query = 'SELECT 1 + 1 AS test';
    const result = await pool.request().query(query);
    console.log('Query result:', result.recordset);

    await pool.close();
  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
  }
}

testConnection();