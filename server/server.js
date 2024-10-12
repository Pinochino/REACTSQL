import express from 'express';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'REACTSQL'
})

app.get('/', (req, res) => {
    const sql = `SELECT * FROM STUDENT`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: 'Error inside server' });
        return res.json(result);
    })
})

dotenv.config();
const port = process.env.PORT | 8000;
app.listen(port, () => console.log(`App is listerning on http://localhost:${port}`));





