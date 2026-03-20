import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
	created_at: string;
	created_by: string | null;
	email: string;
	id: string;
	last_login: string | null;
	name: string;
	status: string;
	updated_at: string;
	user_type: string;
}

export interface Response {
	success: boolean;
	message: string;
	accessToken?: string;
	refreshToken?: string;
	data: User | null;
}

export interface Body {
	email: string;
	name?: string;
	password: string;
	confirmPassword?: string;
}

export const userSlice = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api/v1/user',
		credentials: 'include',
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

		login: builder.mutation<Response, Body>({
			query: (input) => ({
				url: '/login',
				method: 'POST',
				body: input,
			}),
			invalidatesTags: ['user'],
		}),

		me: builder.query<Response, void>({
			query: () => ({
				url: '/me',
				method: 'GET',
			}),
			providesTags: ['user'],
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery } = userSlice;
