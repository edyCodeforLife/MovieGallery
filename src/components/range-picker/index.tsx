import React, { memo } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

interface IHeaderProps {
	onSearchChanged?(e:any):void;
	isList:Boolean;
	options?: any;
	history:any;
}

function _RangePicker(props: any) {
	const { RangePicker } = DatePicker;
	const {onCalendarChange} = props;
    return(
		<RangePicker
			ranges={{
				Today: [moment(), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
			}}
			onCalendarChange={onCalendarChange}
		/>
	)
}

export default memo(_RangePicker);
export const RangePicker = memo(_RangePicker);
