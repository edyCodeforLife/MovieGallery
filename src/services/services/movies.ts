import axios, { AxiosPromise } from 'axios';
import { list_movies, detail_movies } from '../service-url';

export interface IMoviesInterface {
	id: string;
	showTime: string | Date;
	title: string;
	image: string;
	like: number;
}

export interface IResponseError {
	ServiceError: () => void;
}

export interface IResponseSuccess {
	Success?: <T>(res: T) => void;
}

export interface IMoviesService {
	getMoviesList(): AxiosPromise<IMoviesInterface[]>;
	getDetail(id: string): AxiosPromise<IMoviesInterface>;
}

export class MoviesService implements IMoviesService {

	getMoviesList():AxiosPromise<IMoviesInterface[]> {
		return axios.get(list_movies);
	}

	getDetail(id: string):AxiosPromise<IMoviesInterface> {
		return axios.get(detail_movies(id));
	}
}