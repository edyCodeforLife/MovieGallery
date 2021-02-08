import React, { memo } from 'react';
import { Select, Row, Col } from 'antd';
import { map } from 'lodash';

interface IHeaderProps {
	onSearchChanged(e:any):void;
}

function _Header(props: IHeaderProps) {
	const { onSearchChanged } = props;
	const onSearch = (e) => {
		e.persist();
		onSearchChanged(e.target.value);
	}

	const webkitRight = {
		textAlign: '-webkit-right' as 'right'
	};

    return(
		<div className="headerPage">
			<Row style={{width: '100%', justifyContent: 'space-between' }} >
				<Col md={12} xs={24} style={{textAlign: 'left'}}>
					<h2>Movies Gallery</h2>
				</Col>
				<Col md={12} xs={24} style={webkitRight}>
					<div className="containerInputSearch">
						<input
							onChange={(e) => onSearch(e)}
							placeholder="Search Movies"
							className="inputSearch"
							type="text"
						/>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default memo(_Header);
export const HeaderComponent = memo(_Header);
