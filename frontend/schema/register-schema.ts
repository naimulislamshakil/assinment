import * as yup from 'yup';

export const registerSchema = yup.object({
	name: yup
		.string()
		.required('Name is required')
		.min(3, 'Minimum 3 characters'),

	email: yup.string().required('Email is required').email('Invalid email'),

	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Minimum 8 characters'),

	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password')], 'Passwords must match'),
});
