import React, { useEffect, useState, useRef, useCallback } from "react";
import { ScreenHomePage } from './screen';
import { filter, clone, debounce,chunk } from 'lodash';
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
		_service.getMoviesList({
			Success: (res:any) => {
				setLoading(false);
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
	}, [])

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
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
