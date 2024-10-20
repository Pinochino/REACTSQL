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
                if (rows.affectedRows) {
                    return res.json({ message: `Create user successfuly`, data: rows })
                }
                return res.status(400).send({ message: 'Fail to create user' })
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

    async update(req, res) {
        let db;
        const { id } = req.params;
        const { avatar, name, email, password } = req.body;
        try {
            const sql = `UPDATE Customer SET CUSTOMER_NAME = ?,  CUSTOMER_EMAIL = ?, CUSTOMER_PASSWORD = ?, AVATAR = ? WHERE CUSTOMER_ID = ?`;
            const values = [
                name,
                email,
                password,
                avatar,
                id
            ]
            db = await connectDb();
            const [rows] = await db.query(sql, values);
            if (rows.affectedRows > 0) {
                return res.json({ message: `Update customer successfully` })
            }
            return res.status(400).json({ message: `Update customer fail` })
        } catch (error) {
            res.status(500).json({ message: `${error}` })
        } finally {
            if (db) {
                await db.end();
            }
        }
    }

    async delete(req, res) {
        let db;
        const { id } = req.params;
        try {
            const sql = `DELETE FROM Customer WHERE CUSTOMER_ID=?`
            db = await connectDb();
            const [rows] = await db.query(sql, id);
            if (rows.affectedRows) {
                return res.json({ message: `Delete successfully ${id}` })
            }
            return res.status(400).json({ message: `Fail to delete user id: ${id}` })
        } catch (error) {
            return res.status(500).json({ message: `${error}` })
        } finally {
            if (db) {
                await db.end();
            }
        }
    }

    async check(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        let db;
        try {
            const values = [
                email,
                password
            ];
            const sql = `SELECT CUSTOMER_EMAIL, CUSTOMER_PASSWORD FROM Customer WHERE CUSTOMER_EMAIL=?`;
            db = await connectDb();
            const [rows] = await db.query(sql, values);
            console.log(rows[0].CUSTOMER_PASSWORD);
            const check = await bcrypt.compare(password, rows[0].CUSTOMER_PASSWORD)
            if (check) {
                return res.json({ message: `Login successfully` })
            }
            return res.json({ message: `Fail to login` })
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