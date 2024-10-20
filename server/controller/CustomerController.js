// Mã hóa password;
import bcrypt from 'bcrypt';
import connectDb from "../config/db/index.js";
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;
class CustomerController {

    async index(req, res) {
        let db;
        try {
            db = await connectDb();
            const sql = `SELECT * FROM Customer`;
            const [rows] = await db.query(sql);
            res.json(rows)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            if (db) {
                await db.end(); // Close the connection if it was established
            }
        }
    }

    async create(req, res) {
        const { avatar, username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "Username, email and password is required" });
        }

        try {
            // mã hóa mật khẩu
            const salt = await bcrypt.genSalt(saltRounds);
            const encryptedPassword = await bcrypt.hash(password, salt)
            const sql = 'INSERT INTO customer (`CUSTOMER_ID`,`AVATAR`,`CUSTOMER_NAME`, `CUSTOMER_EMAIL`, `CUSTOMER_PASSWORD`) VALUES (?, ?, ?, ?, ?)';

            const values = [
                uuidv4(),
                req.body.avatar,
                req.body.username,
                req.body.email,
                encryptedPassword
            ]
            let db;
            try {
                db = await connectDb();
                const [rows] = await db.query(sql, values);
                res.json(rows)
            } catch (error) {
                res.status(500).json({ message: `${error}` })
            } finally {
                if (db) {
                    await db.end();
                }
            }
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        }
    }

    update(req, res, next) {
        const sql = `UPDATE Customer SET AVATAR=?, CUSTOMER_NAME=?, CUSTOMER_EMAIL=?, CUSTOMER_PASSWORD=?`
    }

    delete(req, res, next) {

    }

    async check(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        let db;
        try {
            // mã hóa mật khẩu
            const salt = await bcrypt.genSalt(saltRounds);
            const encryptedPassword = await bcrypt.hash(password, salt);

            const values = [
                email,
                encryptedPassword
            ]

            const sql = `SELECT CUSTOMER_EMAIL, CUSTOMER_PASSWORD FROM Customer`;
            db = await connectDb();
            const [rows] = await db.query(sql, values);
            if (email === rows.CUSTOMER_EMAIL && password === CUSTOMER_PASSWORD) {
                res.json({ message: 'Login successfully' })
            }

        } catch (error) {
            res.status(500).send({ message: `${error}` })
        } finally {
            if (db) {
                await db.end();
            }
        }

    }


}

export default CustomerController;