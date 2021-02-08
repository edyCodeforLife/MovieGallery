import React, { memo } from 'react';
import "../app.scss";

function _Footer() {
	const year = (new Date()).getFullYear();
    return (
		<footer className="footer">
			Copyrights © {year} Edy Susanto
		</footer>
	)
}

export default memo(_Footer);
export const Footer = memo(_Footer);
