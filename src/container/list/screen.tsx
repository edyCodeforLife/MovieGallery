import React, {memo} from "react";
import "../../components/app.scss";
import { map } from 'lodash';
import { Row, Col } from 'antd';
import { HeaderComponent } from '../../components/header/index';
import { Footer } from '../../components/footer/index';

function _ScreenHomePage(props:any
	) {

	const { onSearchChanged } = props;
	return (
		<div className="homeContainer">
			<Row style={{width: '100%' }}>
				<Col xs={24} md={24}>
					<HeaderComponent
						onSearchChanged={onSearchChanged}
						{...props}
					/>
				</Col>
			</Row>

			<Footer />
		</div>
	);
}
export default memo(_ScreenHomePage);
export const ScreenHomePage = memo(_ScreenHomePage);
