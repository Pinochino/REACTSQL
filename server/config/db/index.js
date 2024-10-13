import mysql2 from 'mysql2/promise';

async function connectDb() {
    try {
        const db = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'REACTSQL'
        });
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

export default connectDb;
