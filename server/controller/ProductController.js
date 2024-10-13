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
         res.status(500).json({ error: 'Internal Server Error' });
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
         const id = req.params.id || req.body.id;

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

         console.log(req.body);
         console.log(req.body.image); // Kiểm tra xem trường này có đúng không
         console.log(req.body.name);  // Kiểm tra trường này
         console.log(req.body.description); // Kiểm tra trường này
         console.log(req.body.price); // Kiểm tra trường này


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

   update(req, res, next) {

   }

   delete(req, res, next) {

   }
}

export default ProductController;