import React from 'react';

import {Link} from 'react-router-dom';
export const ErrorPage = () => 
	<div>
		<p style={{marginBottom: 10}}>404<br/>Page not found</p>
		<Link to='/'>Open home page</Link>
	</div>