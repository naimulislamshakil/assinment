import pool from '../config/db.js';

export const checkUserAlreadyExzisting = async (email) => {
	const result = await pool.query(
		`
        SELECT * FROM users WHERE email = $1
        `,
		[email]
	);

	return result.rows[0];
};

export const createUser = async (name, email, password) => {
	const result = await pool.query(
		`
        INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *
        `,
		[name, email, password]
	);

	return result.rows[0];
};

export const updateUserRefreshTokenModel = async (id, token) => {
	const result = await pool.query(
		`
        UPDATE users
        SET
        refresh_token = $1,
        last_login = NOW()
        WHERE id = $2
        RETURNING *
        `,
		[token, id]
	);

	return result.rows[0];
};
