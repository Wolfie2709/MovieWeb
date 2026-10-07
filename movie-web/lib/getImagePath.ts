export const getImagePath = (imagePath?: string, fullSize?: boolean) => {
	if (!imagePath) {
		return 'https://via.placeholder.com/500x750?text=No+Image+Available';
	}

	const normalizedImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

	return `https://image.tmdb.org/t/p/${fullSize ? 'original' : 'w500'}/${normalizedImagePath}`;
};
