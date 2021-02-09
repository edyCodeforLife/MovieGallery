import React, {memo} from "react";
import "../../components/app.scss";
import { map } from 'lodash';
import { LikeTwoTone } from '@ant-design/icons';
import { Row, Col, Image } from 'antd';
import { HeaderComponent } from '../../components/header/index';
import { Footer } from '../../components/footer/index';
import { IMoviesInterface } from '../../services/services/movies';
import { formattedDate } from '../../global/function/index';

interface IDetailProps {
	detailMovies: IMoviesInterface;
	history:any
}

function _ScreenHomePage(props:IDetailProps
	) {
	const { detailMovies, history } = props;

	return (
		<div className="homeContainer">
			<HeaderComponent
				isList={false}
				history={history}
				{...props}
			/>
			<div className="detailContainer">
				<Row>
					<Col md={24}>
						<Image
							src={detailMovies.image}
						/>
					</Col>
					<Col md={24}>
						<h2>{detailMovies.title}</h2>
					</Col>
					<Col md={24}>
						<h3>Date: {formattedDate(detailMovies.showTime,"idn")}</h3>
					</Col>
					<Col md={24}>
						<LikeTwoTone /> {detailMovies.like}<sup className="supStyle">Like</sup>
					</Col>
				</Row>
			</div>
			<Footer />
		</div>
	);
}
export default memo(_ScreenHomePage);
export const ScreenHomePage = memo(_ScreenHomePage);
