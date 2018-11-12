import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch, Link } from 'react-router-dom';
import routes from '../../constants';
import { ProtectedRoute, NotFound, Footer, FlashMessage, Navigation } from '../Common';
import Home from '../Home';
import User from '../User';
import Login from '../Login';
import Logout from '../Logout';
import SignUp from '../Signup';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import { storageChanged, clearFlashMessages, fetchProfile } from '../../actions';
import './index.css';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content } = Layout;

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
			const response = await this.props.fetchProfile();
			console.log('Sign in response:', response);
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

				<Layout className="App" style={{ padding: '24px 24px 0px 24px' }}>
					<Layout style={{ padding: 24 }}>
						<Content>
							<Switch>
								<Route exact path={routes.HOME} component={Home} />
								<Route exact path={routes.LOGIN} component={Login} />
								<ProtectedRoute
									exact
									path={routes.LOGOUT}
									component={Logout}
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

					<Layout style={{ padding: 24, textAlign: 'center' }}>
						<Footer />
					</Layout>
				</Layout>

				{/* <Layout className="layout">
					<Header>
						<div className="logo" />
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['2']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1">nav 1</Menu.Item>
							<Menu.Item key="2">nav 2</Menu.Item>
							<Menu.Item key="3">
								<Link to={routes.LOGOUT}>Logout</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Content style={{ padding: '0 50px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>List</Breadcrumb.Item>
							<Breadcrumb.Item>App</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
							Content
						</div>
					</Content>
				</Layout> */}
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
