export const list_movies = "https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies";

export const detail_movies = (id: string) => {
	return `https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies/${id}`;
}