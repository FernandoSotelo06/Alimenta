import express from 'express'
import morgan from 'morgan';
import cors from 'cors';

const app = express()

app.use(cors({
    origin: [], 
    credentials: true, 
}));

app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

export default app