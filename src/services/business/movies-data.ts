import { IResponseSuccess, IMoviesService, MoviesService, IMoviesInterface } from '../services/movies';

export interface IMoviesData {
	getMoviesList(handler:IResponseSuccess): void;
	getDetail(id: string, handler: IResponseSuccess): void;
}

export class MoviesData implements IMoviesData {
	private _service: IMoviesService;

	constructor() {
		this._service = new MoviesService();
	}

	async getMoviesList(handler: IResponseSuccess) {
		try {
			const response = await this._service.getMoviesList();
			return await handler.Success<IMoviesInterface[]>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async getDetail(id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.getDetail(id);
			return await handler.Success<IMoviesInterface>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}
}