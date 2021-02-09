import React, { useEffect, useState, useRef, useCallback } from "react";
import { ScreenHomePage } from './screen';
import { filter, clone, debounce,chunk, map } from 'lodash';
import moment from 'moment';
import { MoviesData, IMoviesData } from '../../services/business/movies-data';
import { message } from "antd";

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
	const [ dateString, setDateString ] = useState([]);
	const [ datePick, setDatePick ] = useState({start: null, end: null});
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
				let dateItem = moment(item.showTime).format("YYYY-MM-DD");
				let searchQuery = item.title && querySearch !== ""?
					item.title.toLowerCase().includes(querySearch.toLowerCase()) : true;
				let filterDate = dateString.length > 0 && dateString[0] !== "" && dateString[1] !== "" && datePick.start !== null && datePick.end !== null ?
					moment(dateItem).isSameOrAfter(datePick.start) && moment(dateItem).isSameOrBefore(datePick.end) : true;
				return searchQuery && filterDate;
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
	}, [querySearch, datePick ]);

	const onChangePagination = (page) => {
		setSelectedIndex(currentPage < page ? selectedIndex + 1 : selectedIndex - 1);
		setCurrentPage(page);
	}

	useEffect(() => {
		getListMoviesData();
	}, []);

	useEffect(() => {
		if (dateString[0] === "" && dateString[1] === "") {
			setDatePick({start:null, end: null});
		}

	}, [dateString])

	const onRedirectDetail = (id) => {
		props.history.push(`/detail?movie_id=${id}`);
	}

	const onCalendarChange = (dates,dateString,info) => {
		setDateString(dateString);
	}

	const clickDateFilter = () => {
		if (dateString.length === 0) {
			message.warning("Pilih dahulu tanggal yang ingin di filter!");
		} else {
			userInteraction.current = true;
			setDatePick({start: moment(dateString[0]).format("YYYY-MM-DD"), end: moment(dateString[1]).format("YYYY-MM-DD")});
		}
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
			onCalendarChange={onCalendarChange}
			clickDateFilter={clickDateFilter}
			datePick={datePick}
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
