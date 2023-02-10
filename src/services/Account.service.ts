import { IUserBody, IUserFlat } from '../interfaces/account';
import { http } from './common/Http.service';

export const login = async (data: any) => {
	try {
		const { email, password } = data;
		const response = await http.post<any>('auth/local', {
			identifier: email,
			password: password,
		});
		// check if response
		if (response) {
			localStorage.setItem('accessToken', response.data.jwt);
			localStorage.setItem('user', JSON.stringify(response.data.user));
			return response;
		}
	} catch (error) {
		return error;
	}
};

/**
 * Creates a new user to the system
 * @param {IUserBody} payload IUserBody payload
 * @returns
 */
export const registerUser = async (payload: IUserBody) => {
	try {
		const response = await http.post<any>('auth/local/register', {
			...payload,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const facebook = async () => {
	try {
		const response = await http.post<any>('api/connect/facebook');
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const forgotPassword = async (email: string) => {
	try {
		const response = await http.post<any>('auth/local/register', {
			email,
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const isUserLoggedIn = (): boolean => {
	if (typeof window !== 'undefined') {
		const user = localStorage.getItem('user');
		if (localStorage.getItem('accessToken') && user) {
			return true;
		} else {
			return false;
		}
	}
	return false;
};

export const getLoggedInUser = (): IUserFlat | null => {
	if (typeof window !== 'undefined') {
		const user = localStorage.getItem('user');
		if (user) {
			return JSON.parse(user);
		} else {
			return null;
		}
	} else {
		return null;
	}
};

export const logoutUser = (): void => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('user');
		localStorage.removeItem('accessToken');

		const storage = globalThis?.sessionStorage;
		storage.removeItem('cartId');
	}
};
