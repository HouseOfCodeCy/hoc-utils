import { IUser, IUserFlat } from '../interfaces/account';

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
