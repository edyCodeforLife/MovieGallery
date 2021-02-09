import React, {memo} from "react";
import "../../components/app.scss";
import { map } from 'lodash';
import { Row, Col, Pagination } from 'antd';
import { HeaderComponent } from '../../components/header/index';
import { Footer } from '../../components/footer/index';
import { CardComponent } from '../../components/card-component/card';
import { IMoviesInterface } from '../../services/services/movies';


interface IScreenListProps {
	onSearchChanged():void;
	dummyArr: number[];
	masterListData: IMoviesInterface[];
	listData: any;
	selectedIndex: number;
	onChangePagination(page:number):void;
	currentPage: number;
	loading: boolean;
	onRedirectDetail(id:string):void;
	options:any;
	querySearch: string;
	history:any;
	onCalendarChange?(dates:any, dateString:any, info:any);
	clickDateFilter():void;
	datePick:any;
	dateString: string[];
}

function _ScreenHomePage(props:IScreenListProps
	) {
	const { onSearchChanged, datePick, clickDateFilter, onCalendarChange, dummyArr, history, options, querySearch, onRedirectDetail, masterListData, listData, selectedIndex, loading, onChangePagination, currentPage, dateString } = props;

	const mapArr = loading? dummyArr : listData && listData[selectedIndex];
	const pageTotalRelative = querySearch === "" && (datePick.start === null && datePick.end === null) ? masterListData.length : listData.length;

	return (
		<div className="homeContainer">
			<HeaderComponent
				isList={true}
				onSearchChanged={onSearchChanged}
				options={options}
				history={history}
				clickDateFilter={clickDateFilter}
				onCalendarChange={onCalendarChange}
				{...props}
			/>

			<div className="containerScreen">
				<Row style={{width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
					{map(mapArr, (item, idx) => {
						return(
							<Col md={5} xs={24} style={{margin: 25}}>
								<CardComponent
									key={idx}
									loading={loading}
									item={item}
									onRedirectDetail={onRedirectDetail}

								/>
							</Col>
						)
					})}

					{listData && listData[selectedIndex] && listData[selectedIndex].length > 0 && (
						<Col md={24} xs={24}>
							<Pagination
								simple
								defaultCurrent={1}
								onChange={onChangePagination}
								current={currentPage}
								pageSize={25}
								total={pageTotalRelative}
							/>
						</Col>
					)}
				</Row>
			</div>
			<Footer />
		</div>
	);
}
export default memo(_ScreenHomePage);
export const ScreenHomePage = memo(_ScreenHomePage);
