import React, { memo } from 'react';
import { AutoComplete, Row, Col } from 'antd';
import { map } from 'lodash';

interface IHeaderProps {
	onSearchChanged?(e:any):void;
	isList:Boolean;
	options?: any;
	history:any;
}

function _Header(props: IHeaderProps) {
	const { onSearchChanged, history, isList, options } = props;
	const onSearch = (value) => {
		onSearchChanged(value);
	}

	const webkitRight = {
		textAlign: '-webkit-right' as 'right'
	};

    return(
		<div className="headerPage">
			<Row onClick={() => history.push("/")} style={{width: '100%', justifyContent: 'space-between', cursor: 'pointer' }} >
				<Col md={12} xs={24} style={{textAlign: 'left'}}>
					<h2>Movies <span className="galleryStyle">Gallery</span></h2>
				</Col>
				{isList && (
					<Col md={12} xs={24} style={webkitRight}>
						<div className="containerInputSearch">
							<AutoComplete
								onSearch={onSearch}
								options={options}
								placeholder="Search Movies"
								className="inputSearch"
								style={{color: '#3B85D0'}}
								onSelect={onSearch}
								filterOption={(inputValue, option) =>
									option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
								}
							/>
						</div>
					</Col>
				)}
			</Row>
		</div>
	)
}

export default memo(_Header);
export const HeaderComponent = memo(_Header);
