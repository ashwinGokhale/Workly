import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Header = ({ message }) => (
	<Helmet>
		<title>{message ? `${message} | Workly` : 'Workly'}</title>
	</Helmet>
);

Header.propTypes = {
	message: PropTypes.string
};

Header.defaultProps = {
	message: ''
};

export default Header;
