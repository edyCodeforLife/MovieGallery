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
}

function _ScreenHomePage(props:IScreenListProps
	) {
	const { onSearchChanged, dummyArr, masterListData, listData, selectedIndex, loading, onChangePagination, currentPage } = props;

	const mapArr = loading? dummyArr : listData && listData[selectedIndex];
	console.log(listData.length)
	return (
		<div className="homeContainer">
			<HeaderComponent
				onSearchChanged={onSearchChanged}
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
								total={40}
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
