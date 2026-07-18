import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import simpleUserRoute from './routes/simpleUserRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(
	cors({
		origin: clientOrigin,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.json({ message: 'Practice auth API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/simple', simpleUserRoute);

app.use((req, res) => {
	res.status(404).json({ message: 'Route not found.' });
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).json({ message: 'Internal server error.' });
});

app.listen(port, () => {
	console.log(`Practice auth API listening on http://localhost:${port}`);
});