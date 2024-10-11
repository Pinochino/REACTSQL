import express from 'express';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
})

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => console.log(`App is listerning on http://localhost:${port}`));





