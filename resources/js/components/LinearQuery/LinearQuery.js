/* *
* Linear Query
*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
	root: {
		flexGrow: 1,
	},
};

function LinearQuery(props) {
	const { classes } = props;
	return (
		<div className={`${classes.root} linearProgressCustom` }>
			<LinearProgress variant="query" />
			<br />
			<LinearProgress color="secondary" variant="query" />
			<br />
			<div style={{ width: "100%",textAlign: "center",paddingBottom: "15px" }}>
				<span>Utilice el lector de código de barras para continuar...</span>
			</div>
			<LinearProgress color="primary" variant="query" />
			<br />
			<LinearProgress color="secondary" variant="query" />
		</div>
	);
}

LinearQuery.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearQuery);
