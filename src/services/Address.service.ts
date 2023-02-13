import { IAddressBody, IAddressFlat, IUserFlat } from '../interfaces/account';
import { PopulateType, StatusCode } from '../resources/enums';
import { http } from './common/Http.service';
import { getUser, updateUser } from './User.service';

export const getAddress = async (
	addressId: string,
	populateType = PopulateType.STAR,
) => {
	try {
		const response = await http.get<any>(`addresses/${addressId}`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

/**
 * POST Address
 * @param {IAddressBody} data The Address payload for the POST Address API
 * @param {IUserFlat} user Send this param if you want the address to be added to a user
 * @param {void} addUser Send this param if you want context of user to be updated
 * @returns
 */
export const createAddress = async (
	data: any,
	user?: IUserFlat,
	addUser?: (user: IUserFlat) => void,
) => {
	try {
		const response = await http.post<any>('addresses', {
			data,
		});
		if (user && response.status === StatusCode.OK) {
			const responseData: IAddressFlat = response.data.data;
			const userAddresses: IAddressFlat[] | undefined =
				user.addresses?.concat(responseData);

			const updatedUser: IUserFlat = {
				...user,
				addresses: userAddresses,
			};
			// update user and refresh user object with relations
			await updateUser(updatedUser).then(async () => {
				await getUser(`${user.id}`).then((userResponse: any) => {
					addUser ? addUser(userResponse.data) : null;
					return userResponse;
				});
			});
		} else {
			return response;
		}
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const updateAddress = async (addressId: string, data: IAddressBody) => {
	try {
		const response = await http.put<any>(`addresses/${addressId}`, {
			data,
		});

		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};

export const getCities = async (populateType = PopulateType.STAR) => {
	try {
		const response = await http.get<any>(`cities`, {
			params: { populate: populateType },
		});
		return response;
	} catch (error) {
		console.log('unexpected error: ', error);
		return error;
	}
};
