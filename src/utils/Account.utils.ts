import { IUser, IUserFlat } from '../interfaces/account';

export const tranformUserFlatToUser = (userFlat: IUserFlat): IUser | null => {
	if (userFlat) {
		const { id, ...userRest } = userFlat;
		const newIUser: IUser = {
			id: id,
			attributes: {
				...userRest,
			},
		};

		return newIUser;
	}
	return null;
};
