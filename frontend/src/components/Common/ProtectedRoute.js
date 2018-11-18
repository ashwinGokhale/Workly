import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { CustomRedirect } from '.';

const ProtectedRoute = ({ component: Component, token, msg, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			token ? <Component {...props} /> : <CustomRedirect to="/" msgRed={msg} />
		}
	/>
);

ProtectedRoute.propTypes = {
	component: PropTypes.any.isRequired,
	token: PropTypes.string,
	msg: PropTypes.string
};

ProtectedRoute.defaultProps = {
	token: null,
	msg: 'Permission Denied'
};

export default ProtectedRoute;
