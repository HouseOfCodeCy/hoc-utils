import { IAddressFlat, IUser, IUserFlat } from '../interfaces/account';

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
export const getDefaultAddress = (addresses: IAddressFlat[]): IAddressFlat => {
	const defaultAddress = addresses.find((address) => {
		return address.isDefault;
	});
	return defaultAddress ? defaultAddress : addresses[0];
};

/**
 * Returns a string of full address
 * @param address User Address
 * @returns
 */
export const printAddressAsString = (address: IAddressFlat) => {
	let addressString = '';
	if (address.address1) addressString += `${address.address1}, `;
	if (address.address2) addressString += `${address.address1}, `;
	if (address.postCode) addressString += `${address.postCode}, `;
	if (address.city.name) addressString += `${address.city.name}, `;
	if (address.city.country.name)
		addressString += `${address.city.country.name}`;

	return addressString;
};
