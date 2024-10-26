export const epoch2date = (epoch: number) => {
	const date = new Date(epoch * 1000);
	return date.toLocaleDateString();
};
