import { IAddress, IUser, IUserFlat } from '../interfaces/account';

export const tranformUserFlatToUser = (userFlat: IUserFlat): IUser => {
	const { id, ...userRest } = userFlat;
	const newIUser: IUser = {
		id: id,
		attributes: {
			...userRest,
		},
	};

	return newIUser;
};

/**
 * Returns default address, or first address in the list
 * @param addresses User address
 * @returns Returns default address, or the first one if not marked as default
 */
export const getDefaultAddress = (addresses: IAddress[]): IAddress => {
	const defaultAddress = addresses.find((address) => {
		return address.isDefault;
	});
	return defaultAddress ? defaultAddress : addresses[0];
};
