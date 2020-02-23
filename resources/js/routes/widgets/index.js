/**
 * Pages Routes
 */
import React from 'react';
import { Helmet } from "react-helmet";
import { Redirect, Route, Switch } from 'react-router-dom';

const Pages = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Reactify | Widgets</title>
			<meta name="description" content="Reactify Widgets" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/blank`} />
		</Switch>
	</div>
);

export default Pages;
