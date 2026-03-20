import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import { handelResponse } from '../middlewares/handleResponse.js';
import { checkUserAlreadyExzisting, createUser } from '../models/userModels.js';
import { registerSchema } from '../schema/registe-schema.js';
import bcrypt from 'bcrypt';

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
