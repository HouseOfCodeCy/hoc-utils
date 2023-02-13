import {
	IAddress,
	IAddressFlat,
	IUser,
	IUserFlat,
} from '../interfaces/account';

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
 * @param {IAddress} address User Address
 * @returns
 */
export const printAddressAsString = (address: IAddress | undefined) => {
	let addressString = '';
	if (address) {
		if (address.attributes.address1)
			addressString += `${address.attributes.address1}, `;
		if (address.attributes.address2)
			addressString += `${address.attributes.address1}, `;
		if (address.attributes.postCode)
			addressString += `${address.attributes.postCode}, `;
		if (address.attributes.city.data.attributes.name)
			addressString += `${address.attributes.city.data.attributes.name}, `;
		if (address.attributes.city.data.attributes.name)
			addressString += `${address.attributes.city.data.attributes.name}`;
	}
	return addressString;
};

/**
 * Returns a string of address Flat
 * @param {IAddressFlat} address User Address
 * @returns
 */
export const printAddressAsStringFlat = (address: IAddressFlat) => {
	let addressString = '';
	if (address.address1) addressString += `${address.address1}, `;
	if (address.address2) addressString += `${address.address1}, `;
	if (address.postCode) addressString += `${address.postCode}, `;
	if (address.city && address.city.name)
		addressString += `${address.city.name}, `;
	if (address.city && address.city.country && address.city.country.name)
		addressString += `${address.city.country.name}`;

	return addressString;
};
