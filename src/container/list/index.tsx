import React, { useEffect, useState, useRef } from "react";
import { ScreenHomePage } from './screen';
import { filter, intersection, clone } from 'lodash';

function _HomePage(props) {

	return (
		<ScreenHomePage
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
