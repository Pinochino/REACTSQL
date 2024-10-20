import connectDb from "../config/db/index.js";
import { v4 as uuidv4 } from 'uuid';

class ProductController {

   async index(req, res) {
      let db;
      try {
         db = await connectDb(); // Get the database connection
         const [rows] = await db.query('SELECT * FROM product'); // Example query
         res.json(rows);
      } catch (error) {
         res.status(500).json({ message: `${error}` });
      } finally {
         if (db) {
            await db.end(); // Close the connection if it was established
         }
      }
   }

   async read(req, res) {
      let db;
      try {
         db = await connectDb(); // Get the database connection
         const id = req.params.id;

         if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
         }

         const [rows] = await db.query(`SELECT * FROM product WHERE PRODUCT_ID = ? `, [id]);
         res.json(rows[0]);
      } catch (error) {
         res.status(500).json({ error: 'Internal Server Error' });
      } finally {
         if (db) {
            await db.end(); // Close the connection if it was established
         }
      }
   }


   async create(req, res, next) {
      let db;
      try {
         db = await connectDb();
         const productId = uuidv4();
         const sql = 'INSERT INTO product (`PRODUCT_ID`,`PRODUCT_IMAGE`,`PRODUCT_NAME`, `PRODUCT_DESCRIPTION`, `PRICE`) VALUES (?, ?, ?, ?, ?)';

         const values = [
            productId,
            req.body.image,
            req.body.name,
            req.body.description,
            req.body.price
         ]

         const [result] = await db.query(sql, values);
         res.json(result)
      } catch (error) {
         res.status(500).json({ error: 'Internal Server Error' });
      } finally {
         if (db) {
            await db.end();
         }
      }
   }

   async update(req, res) {
      let db;
      try {
         db = await connectDb();
         const id = req.params.id;
         const sql = 'UPDATE product SET `PRODUCT_NAME`=?, `PRODUCT_DESCRIPTION`=?, `PRODUCT_IMAGE`=?, `PRICE`=? WHERE PRODUCT_ID=?'
         if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
         }

         const values = [
            req.body.name,
            req.body.description,
            req.body.image,
            req.body.price,
            id
         ]

         const [result] = await db.query(sql, values);

         if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found or no changes made' });
         }
         res.json({ message: 'Update product successfully' });
      } catch (error) {
         res.status(500).json({ error: 'Internal Server Error' });
      } finally {
         if (db) {
            await db.end();
         }
      }
   }

   async delete(req, res) {
      let db;
      try {
         db = await connectDb();
         const sql = `DELETE FROM product WHERE PRODUCT_ID=?`;
         const id = req.params.id;
         if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
         }

         const [result] = await db.query(sql, id);
         if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found or no changes made' });
         }
         res.json({ message: 'Delete product successfully' });
      } catch (error) {
         res.status(500).json({ error: 'Internal Server Error' });
      } finally {
         if (db) {
            await db.end();
         }
      }
   }
}

export default ProductController;