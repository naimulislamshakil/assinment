import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/errorHandler.js';
import { handelResponse } from '../middlewares/handleResponse.js';
import {
	checkUserAlreadyExzisting,
	createUser,
	updateUserRefreshTokenModel,
} from '../models/userModels.js';
import { loginSchema } from '../schema/login-schema.js';
import { registerSchema } from '../schema/registe-schema.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

export const registe = catchAsyncError(async (req, res, next) => {
	const { error, value } = registerSchema.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		const errors = error.details.map((e) => ({
			field: e.path[0],
			message: e.message,
		}));
		return res.status(400).json({ success: false, message: errors });
	}

	const existingUser = await checkUserAlreadyExzisting(value.email);

	if (existingUser) {
		return handelResponse(res, 200, true, 'User already exists', existingUser);
	}

	const hashedPassword = await bcrypt.hash(value.password, 10);

	const user = await createUser(value.name, value.email, hashedPassword);

	if (!user) {
		return res.status(500).json({
			success: false,
			message: 'Failed to create user',
		});
	}

	return handelResponse(res, 200, true, 'User created successfully.');
});

export const login = catchAsyncError(async (req, res, next) => {
	const { error, value } = loginSchema.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		const errors = error.details.map((e) => ({
			field: e.path[0],
			message: e.message,
		}));
		return res.status(400).json({ success: false, message: errors });
	}

	const user = await checkUserAlreadyExzisting(value.email);

	if (!user) {
		return next(new ErrorHandler('Invalid email and password', 400));
	}

	const isMatchPassword = await bcrypt.compare(value.password, user.password);

	if (!isMatchPassword) {
		return next(new ErrorHandler('Invalid email and password', 400));
	}

	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	const updateUser = await updateUserRefreshTokenModel(user.id, refreshToken);

	const { password, refresh_token, ...userData } = updateUser;

	res
		.status(200)
		.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 15 * 60 * 1000,
		})
		.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		.json({
			success: true,
			message: 'Login successfully',
			userData,
		});
});

export const me = catchAsyncError(async (req, res, next) => {
	const { password, refresh_token, ...userData } = req.user;

	console.log(req.user);

	handelResponse(res, 200, true, 'get all user', userData);
});
