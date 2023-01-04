/**
 * Receives a string for Cart Total and Trasform to number without the dot.
 * @param {string} totalCartAmount The Cart Total Amount
 * @returns {number} Returns 0 if param is empty
 */
export const transformPriceToStripeAmount = (
	totalCartAmount: string,
): number => {
	if (totalCartAmount !== '') {
		return +totalCartAmount.replace('.', '');
	}
	return 0;
};
