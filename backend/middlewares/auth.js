import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/token.js';
import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandler from './errorHandler.js';
import pool from '../config/db.js';

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
	const { accessToken, refreshToken } = req.cookies;

	try {
		if (accessToken) {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

			const user = await pool.query(
				`SELECT *
                FROM users
                WHERE id = $1`,
				[decoded.userId]
			);

			if (!user.rows.length) {
				return next(new ErrorHandler('User not found', 404));
			}

			req.user = user.rows[0];
			return next();
		}

		throw new Error('Access token missing');
	} catch (err) {
		// 🔁 2️⃣ Try refresh token if access fails
		if (!refreshToken) {
			return next(new ErrorHandler('Not authenticated', 401));
		}

		try {
			const decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);

			const userResult = await pool.query(
				`SELECT *
         FROM users
         WHERE id = $1 AND refresh_token = $2`,
				[decoded.userId, refreshToken]
			);

			if (!userResult.rows.length) {
				return next(new ErrorHandler('Invalid refresh token', 403));
			}

			const user = userResult.rows[0];

			const newAccessToken = generateAccessToken(userResult.id);

			// 🔥 Set new access token in cookie
			res.cookie('accessToken', newAccessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 15 * 60 * 1000,
			});

			// ❗ Remove sensitive fields before attaching
			delete user.refresh_token;

			req.user = user;

			return next();
		} catch (refreshErr) {
			return next(new ErrorHandler('Session expired. Login again.', 403));
		}
	}
});
