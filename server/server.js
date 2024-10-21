import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDb from "./config/db/index.js";
import route from "./routes/index.js";
import multer from 'multer';
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import Redis from "ioredis";
import RedisStore from "connect-redis";
const clientRedis = new Redis(); // default localhost


const app = express();
app.use(cors());
app.use(express.json());

// session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    store: new RedisStore({client: clientRedis}),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 5 * 60 * 1000
    }
}))

// cookie
app.use(cookieParser);

// body-parser
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(jsonParser)
app.use(urlencodedParser)

// multer
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

// connect database
connectDb(app)

const port = process.env.PORT || 8000;

// routes
route(app);

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    console.log('Closing HTTP server and stop receiving requests...');

    server.close(() => {
        console.log('HTTP server closed.');

        if (db) {
            console.log('Closing DB connection...');
            db.end((err) => {
                if (err) {
                    console.error('Error closing the DB connection:', err);
                } else {
                    console.log('DB connection has been closed.');
                }
                // Exit the process
                console.log("Goodbye!");
                process.exit(0);
            });
        } else {
            // Nếu không có kết nối DB
            console.log("No DB connection to close. Goodbye!");
            process.exit(0);
        }
    });
});

app.listen(port, () =>
    console.log(`App is listerning on http://localhost:${port}`)
);
