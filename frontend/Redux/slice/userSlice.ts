import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
	email: string;
}

export interface Response {
	success: boolean;
	message: string;
	data: User | null;
}

export interface Body {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}

export const userSlice = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api/v1/user',
	}),
	tagTypes: ['user'],
	endpoints: (builder) => ({
		register: builder.mutation<Response, Body>({
			query: (input) => ({
				url: '/register',
				method: 'POST',
				body: input,
			}),
			invalidatesTags: ['user'],
		}),
	}),
});

export const { useRegisterMutation } = userSlice;
