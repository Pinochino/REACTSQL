import express from 'express';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/student', (req, res) => {
    const sql = 'INSERT INTO student (`STUDENT_NAME`, `STUDENT_EMAIL`) VALUES (?, ?)';
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.put('/student/:id', (req, res) => {
    const sql = ``;
})

app.delete('/student/:id', (req, res) => {
    const sql = ``;
})

dotenv.config();
const port = process.env.PORT | 8000;
app.listen(port, () => console.log(`App is listerning on http://localhost:${port}`));





