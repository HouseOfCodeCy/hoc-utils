import { IShippingMethod } from '../interfaces/order';

export const getDefaultShippingMethod = (
	shippingMethods: IShippingMethod[],
) => {
	if (shippingMethods && shippingMethods.length > 0) {
		const defaultShippingMethod = shippingMethods.find(
			(method) => method.attributes.isDefault === true,
		);
		return defaultShippingMethod;
	}
};
