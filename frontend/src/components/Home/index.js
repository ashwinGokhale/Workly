import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { err } from '../../constants';
import { sendFlashMessage, clearFlashMessages, fetchJobs } from '../../actions';
import { Header } from '../Common';
import JobTable from './JobTable';

class HomePage extends Component {
	static propTypes = {
		flash: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired,
		getJobs: PropTypes.func.isRequired,
		user: PropTypes.object
	};

	static defaultProps = {
		user: null
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount = async () => {
		const { clear, flash, getJobs, user } = this.props;
		try {
			clear();
			if (!user) return;
			const jobs = await getJobs();
			console.log('Got jobs:', jobs);
			this.setState({ loading: false });
		} catch (error) {
			clear();
			return flash(err(error));
		}
	};

	render() {
		return (
			<div>
				<h1>Workly</h1>
				<JobTable />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

export default connect(
	mapStateToProps,
	{
		flash: sendFlashMessage,
		clear: clearFlashMessages,
		getJobs: fetchJobs
	}
)(HomePage);
