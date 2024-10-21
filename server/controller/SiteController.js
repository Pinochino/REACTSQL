// import connectDb from "../config/db/index.js";
// import { v4 as uuidv4 } from 'uuid';

import { generateSecretKey } from "../config/configJWT.js";


class SiteController {
   index(req, res) {
      const data = generateSecretKey();
      return res.send(data)
   }
}


export default SiteController;