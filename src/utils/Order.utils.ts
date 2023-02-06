import { IShippingMethod } from '../interfaces/order';

export const getDefaultShippingMethod = (
	shippingMethods: IShippingMethod[] | undefined,
) => {
	const defaultShippingMethod = shippingMethods?.find(
		(method) => method.attributes.isDefault === true,
	);
	return defaultShippingMethod;
};
