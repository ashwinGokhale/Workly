import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Layout } from 'antd';
import { sendFlashMessage } from '../../actions';

class FlashMessage extends Component {
	static propTypes = {
		msgGreen: PropTypes.string,
		msgRed: PropTypes.string,
		clear: PropTypes.func.isRequired
	};

	static defaultProps = {
		msgGreen: '',
		msgRed: ''
	};

	onClose = (type = 'red') => () => {
		type === 'red' ? this.props.flash('') : this.props.flash('', 'green');
	};

	render = () => (
		<React.Fragment>
			{this.props.msgGreen && (
				<Layout style={{ padding: '24px 24px 0px 24px' }}>
					<Alert
						message={this.props.msgGreen}
						type="success"
						closable
						onClose={this.onClose('green')}
					/>
				</Layout>
			)}
			{this.props.msgRed && (
				<Layout style={{ padding: '24px 24px 0px 24px' }}>
					<Alert
						message={this.props.msgRed}
						type="error"
						closable
						onClose={this.onClose()}
					/>
				</Layout>
			)}
		</React.Fragment>
	);
}

const mapStateToProps = state => ({
	...state.flashState
});

export default connect(
	mapStateToProps,
	{ flash: sendFlashMessage }
)(FlashMessage);
