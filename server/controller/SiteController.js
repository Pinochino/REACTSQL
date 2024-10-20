import connectDb from "../config/db/index.js";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';


class SiteController {
   index(req, res) {
      const key = crypto.randomBytes(256).toString('hex')
      return res.json({ message: `${key}` })
   }
}


export default SiteController;