/**
 * Receives a string for Cart Total and Trasform to number without the dot.
 * @param {string} totalCartAmount The Cart Total Amount
 * @returns Returns 0 if param is empty
 */
export const tranformPriceToStripeAmount = (totalCartAmount: string) => {
	if (totalCartAmount !== '') {
		return totalCartAmount.replace('.', '');
	}
	return 0;
};
