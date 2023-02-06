import { IShippingMethod } from '../interfaces/order';

export const getDefaultShippingMethod = (
	shippingMethods: IShippingMethod[],
) => {
	const defaultShippingMethod = shippingMethods?.find(
		(method) => method.attributes.isDefault === true,
	);
	return defaultShippingMethod;
};
