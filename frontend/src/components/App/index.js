import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import routes from '../../constants';
import { ProtectedRoute, NotFound, Footer, FlashMessage, Navigation } from '../Common';
import Home from '../Home';
import Splash from '../Splash';
import User from '../User';
import Login from '../Login';
import Logout from '../Logout';
import SignUp from '../Signup';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import CreateJob from '../CreateJob';
import EditJob from '../EditJob';
import Job from '../Job';
import { storageChanged, clearFlashMessages, fetchProfile } from '../../actions';
import './index.css';

import { Layout } from 'antd';

const { Content } = Layout;

class App extends Component {
	static propTypes = {
		token: PropTypes.string,
		history: PropTypes.shape({
			listen: PropTypes.func
		}).isRequired,
		match: PropTypes.shape({
			path: PropTypes.string
		}),
		fetchProfile: PropTypes.func.isRequired,
		clearFlashMessages: PropTypes.func.isRequired,
		storageChanged: PropTypes.func.isRequired
	};

	static defaultProps = {
		token: null
	};

	constructor(props) {
		super(props);
		window.addEventListener('storage', this.props.storageChanged);
		this.props.history.listen(() => this.props.clearFlashMessages());
		console.log('App props:', this.props);
	}

	componentWillMount = async () => {
		try {
			// const response = await this.props.fetchProfile();
			// console.log('Sign in response:', response);
		} catch (error) {
			console.error('Sign in error:', error);
		}
	};

	render() {
		const {
			token,
			user,
			location: { pathname: path }
		} = this.props;
		console.log('App path:', path);
		return (
			<Layout>
				<Navigation auth={!!token} user={user} path={path} />

				<FlashMessage />

				<Layout className="App">
					<Layout className="App-content" style={{ background: 'white' }}>
						<Content>
							<Switch>
								{token ? (
									<Route exact path={routes.HOME} component={Home} />
								) : (
									<Route exact path={routes.HOME} component={Splash} />
								)}

								<Route exact path={routes.LOGIN} component={Login} />
								<ProtectedRoute
									exact
									path={routes.LOGOUT}
									component={Logout}
									token={token}
								/>
								<ProtectedRoute
									exact
									path={routes.CREATE_JOB}
									component={CreateJob}
									token={token}
								/>
								<ProtectedRoute
									exact
									path={routes.EDIT_JOB}
									component={EditJob}
									token={token}
								/>
								<ProtectedRoute
									exact
									path={routes.JOB}
									component={Job}
									token={token}
								/>
								<Route exact path={routes.SIGNUP} component={SignUp} />
								<Route
									exact
									path={routes.FORGOT_PASSWORD}
									component={ForgotPassword}
								/>
								<Route
									exact
									path={routes.RESET_PASSWORD}
									component={ResetPassword}
								/>
								<Route exact path={routes.USER} component={User} />
								<Route component={NotFound} />
							</Switch>
						</Content>
					</Layout>

					<Layout className="App-footer">
						<Footer />
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

export default withRouter(
	connect(
		mapStateToProps,
		{ storageChanged, clearFlashMessages, fetchProfile }
	)(App)
);
