import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DB_URL,
});

const db = {
    query: async (sql: string, params?: any[]) => {
        const client = await pool.connect();
        const result = await pool.query(sql, params);
        client.release();
        return result;
    },
};

export default db;
