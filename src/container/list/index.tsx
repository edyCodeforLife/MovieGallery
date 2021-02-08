import React, { useEffect, useState, useRef } from "react";
import { ScreenHomePage } from './screen';
import { filter, intersection, clone } from 'lodash';
import { MoviesData, IMoviesData } from '../../services/business/movies-data';

function _HomePage(props) {
	const _service: IMoviesData = new MoviesData();

	const getListMoviesData = () => {
		_service.getMoviesList({
			Success: (res:any) => {
				console.log(res)
			}
		})
	}

	useEffect(() => {
		getListMoviesData();
	}, [])

	return (
		<ScreenHomePage
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
