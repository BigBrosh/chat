import React from 'react';

import {Link} from 'react-router-dom';
export const ErrorPage = () => 
	<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
			paddingTop: 30
		}}>

		<p style={{marginBottom: 10, fontSize: 20}}><span style={{fontSize: 32}}>404</span><br/>
		Page not found</p>
		<Link to='/'>Open home page</Link>
	</div>