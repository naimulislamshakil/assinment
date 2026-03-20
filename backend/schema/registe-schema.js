import Joi from 'joi';

export const registerSchema = Joi.object({
	name: Joi.string().min(3).max(50).required().messages({
		'string.empty': 'Name is required',
		'string.min': 'Name must be at least 3 characters',
	}),

	email: Joi.string().email().required().messages({
		'string.email': 'Invalid email',
		'string.empty': 'Email is required',
	}),

	password: Joi.string().min(6).required().messages({
		'string.min': 'Password must be at least 6 characters',
		'string.empty': 'Password is required',
	}),

	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Passwords do not match',
		'any.required': 'Confirm password is required',
	}),
});
