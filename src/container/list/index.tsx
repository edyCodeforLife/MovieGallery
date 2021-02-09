import React, { useEffect, useState, useRef, useCallback } from "react";
import { ScreenHomePage } from './screen';
import { filter, clone, debounce,chunk, map } from 'lodash';
import { MoviesData, IMoviesData } from '../../services/business/movies-data';

function _HomePage(props) {
	const _service: IMoviesData = new MoviesData();
	const [ listData, setListData ] = useState([]);
	const userInteraction = useRef(false);
	const [ masterListData, setMasterListData ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ selectedIndex, setSelectedIndex ] = useState(0);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ querySearch, setQuerySearch ] = useState("");
	const [ options, setOptions ] = useState([]);
	const chunkNumber = 25;


	const staticArr = () => {
		let arr=[];
		for (let i = 0; i < chunkNumber; i++) {
			arr.push(i);
		}
		return arr;
	}
	const getListMoviesData = () => {
		staticArr();
		let options = [];
		_service.getMoviesList({
			Success: (res:any) => {
				setLoading(false);
				map(res,item => {
					options.push({
						value: item.title
					});
				})
				setOptions(options);
				setMasterListData(res);
				setListData(chunk(res,chunkNumber));
			}
		})
	}

	const filteredData = () => {
		if (masterListData && masterListData.length > 0) {
			let selectedFilter = filter(clone(masterListData), (item) => {
				let searchQuery = item.title && querySearch !== ""?
					item.title.toLowerCase().includes(querySearch.toLowerCase()) : true;
				return searchQuery;
			});

			setListData(chunk(selectedFilter,chunkNumber));
			setCurrentPage(1);
			setSelectedIndex(0)
		}
	}

	const onSearchChanged = useCallback(debounce((value) => {
		userInteraction.current = true;
		setQuerySearch(value);
	},250),
	[]);

	useEffect(() => {
		userInteraction.current && filteredData();
	}, [querySearch]);

	const onChangePagination = (page) => {
		setSelectedIndex(currentPage < page ? selectedIndex + 1 : selectedIndex - 1);
		setCurrentPage(page);
	}

	useEffect(() => {
		getListMoviesData();
	}, []);

	const onRedirectDetail = (id) => {
		props.history.push(`/detail?movie_id=${id}`);
	}

	return (
		<ScreenHomePage
			onChangePagination={onChangePagination}
			currentPage={currentPage}
			selectedIndex={selectedIndex}
			listData={listData}
			loading={loading}
			masterListData={masterListData}
			onSearchChanged={onSearchChanged}
			dummyArr={staticArr()}
			onRedirectDetail={onRedirectDetail}
			options={options}
			querySearch={querySearch}
			history={props.history}
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
