import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import { errorMiddleWare } from './middlewares/errorHandler.js';

export const app = express();
config();

import userRoute from './routes/userRoute.js';

app.use(
	cors({
		origin: [process.env.FRONTEND_URL],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', async (req, res) => {
	const result = await pool.query('SELECT current_database()');
	res.send(`The databse name is: ${result.rows[0].current_database}`);
});

app.use('/api/v1/user', userRoute);

app.use(errorMiddleWare);
