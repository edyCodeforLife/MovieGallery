import React, { useEffect, useState, useRef } from "react";
import { ScreenHomePage } from './screen';
import { filter, intersection, clone } from 'lodash';

function _DetailPage(props) {

	return (
		<ScreenHomePage
			{...props}
		/>
	)
}
export const DetailPage = React.memo((_DetailPage));
