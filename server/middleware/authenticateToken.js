import dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';


function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token);
        if (token == null) return res.status(400).json({ message: "Chua co jwt" })
        console.log(process.env.TOKEN_SECRET);
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            console.error(err)
            if (err) return res.status(400).json({ message: "Bi loi jwt" })
            req.user = user;
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: `${error}` })
    }
}
export default authenticateToken;