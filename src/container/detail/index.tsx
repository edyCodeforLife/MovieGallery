import React, { useEffect, useState, useRef } from "react";
import { ScreenHomePage } from './screen';
import { MoviesData, IMoviesData } from '../../services/business/movies-data';
import { QrsToObj } from '../../global/function/index';

function _DetailPage(props) {
	const _service: IMoviesData = new MoviesData();
	const [ detailMovies, setDetailMovies ] = useState({})
	const getDetailMovies = () => {
		let qrs = QrsToObj(window.location.search);
		_service.getDetail(qrs.movie_id, {
			Success: (res:any) => {
				setDetailMovies(res)
			}
		})
	}

	useEffect(() => {
		getDetailMovies()
	}, [])

	return (
		<ScreenHomePage
			detailMovies={detailMovies}
			history={props.history}
			{...props}
		/>
	)
}
export const DetailPage = React.memo((_DetailPage));
