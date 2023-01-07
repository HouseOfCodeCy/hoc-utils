import { IUser, IUserFlat } from '../interfaces/account';

export const tranformUserFlatToUser = (userFlat: IUserFlat) => {
	if (userFlat) {
		const { id, addresses, favorite_products, ...userRest } = userFlat;
		const newIUser: IUser = {
			id: id,
			attributes: {
				addresses: addresses,
				favorite_products: favorite_products,
				...userRest,
			},
		};

		return newIUser;
	}
	return null;
};
