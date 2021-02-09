import React, { memo } from 'react';
import { AutoComplete, Row, Col, Button } from 'antd';
import { RangePicker } from '../range-picker/index';

interface IHeaderProps {
	onSearchChanged?(e:any):void;
	isList:Boolean;
	options?: any;
	history:any;
	onCalendarChange?(dates:any, dateString:any, info:any);
	clickDateFilter?():void
}

function _Header(props: IHeaderProps) {
	const { onSearchChanged, clickDateFilter, history, isList, options, onCalendarChange } = props;
	const onSearch = (value) => {
		onSearchChanged(value);
	}

	const webkitRight = {
		textAlign: '-webkit-right' as 'right'
	};

    return(
		<div className="headerPage">
			<Row onClick={() => history.push("/")} style={{width: '100%', justifyContent: 'space-between', cursor: 'pointer' }} >
				<Col md={3} xs={24} style={{textAlign: 'left'}}>
					<h2>Movies <span className="galleryStyle">Gallery</span></h2>
				</Col>
				{isList && (
					<React.Fragment>
						<Col md={6} xs={12}>
							<RangePicker
								onCalendarChange={onCalendarChange}
							/>

						</Col>
						<Col md={3} xs={12} style={{textAlign: 'left'}}>
							<Button onClick={clickDateFilter} type="primary">
								Filter
							</Button>
						</Col>
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
					</React.Fragment>
				)}
			</Row>
		</div>
	)
}

export default memo(_Header);
export const HeaderComponent = memo(_Header);
