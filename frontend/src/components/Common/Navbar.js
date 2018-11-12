// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import routes from '../../constants';
// import { Layout, Menu, Icon } from 'antd';
// import Sider from 'antd/lib/layout/Sider';

// const { Header } = Layout;

// const menu = (
// 	<Menu selectedKeys={[]}>
// 		<Menu.Item key="userCenter">
// 			<Link to={routes.PROFILE}>Profile</Link>
// 		</Menu.Item>

// 		<Menu.Divider />
// 		<Menu.Item key="logout">
// 			<span>
// 				<Icon type="logout" style={{ marginRight: '5px' }} />
// 				<Link
// 					to={routes.LOGOUT}
// 					style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, .65)' }}
// 				>
// 					Logout
// 				</Link>
// 			</span>
// 		</Menu.Item>
// 	</Menu>
// );

// // const CommonNav = () => (
// // 	<React.Fragment>
// // 		<Link to={routes.HOME}>Home</Link>
// // 	</React.Fragment>
// // );

// // const Navbar = ({ auth }) => (
// // 	<nav className="navbar navbar-default navbar-fixed-top">
// // 		<div className="nav-container container">
// // 			<div className="collapse navbar-collapse" id="navbar">
// // 				<ul className="nav navbar-nav navbar-right">
// // 					{auth ? (
// // 						<React.Fragment>
// // 							<Link to={routes.PROFILE}>Profile</Link>
// // 							<CommonNav />
// // 							<Link to={routes.LOGOUT}>Logout</Link>
// // 						</React.Fragment>
// // 					) : (
// // 						<React.Fragment>
// // 							<CommonNav />
// // 							<Link to={routes.LOGIN}>Login</Link>
// // 							<Link to={routes.SIGNUP}>Join</Link>
// // 						</React.Fragment>
// // 					)}
// // 				</ul>
// // 			</div>
// // 		</div>
// // 	</nav>
// // );

// // Navbar.propTypes = {
// // 	auth: PropTypes.bool,
// // 	id: PropTypes.string,
// // 	user: PropTypes.object
// // };

// // Navbar.defaultProps = {
// // 	auth: null,
// // 	id: null,
// // 	user: null
// // };

// // export default Navbar;

// const CommonNav = () => (
// 	<React.Fragment>
// 		<Menu.Item key="home">
// 			<Link to={routes.HOME}>Home</Link>
// 		</Menu.Item>
// 	</React.Fragment>
// );

// // const Navbar = ({ auth }) => (
// // 	<Layout.Header>
// // 		<Menu
// // 			theme="dark"
// // 			mode="horizontal"
// // 			defaultSelectedKeys={['home']}
// // 			style={{ lineHeight: '64px', width: '100%' }}
// // 		>
// // 			{auth ? (
// // 				<React.Fragment>
// // 					<Menu.Item key="profile">
// // 						<Link to={routes.PROFILE}>Profile</Link>
// // 					</Menu.Item>
// // 					<CommonNav />
// // 					<Menu.Item key="logout">
// // 						<Link to={routes.LOGOUT}>Logout</Link>
// // 					</Menu.Item>
// // 				</React.Fragment>
// // 			) : (
// // 				<React.Fragment>
// // 					<CommonNav />
// // 					<Menu.Item key="login">
// // 						<Link to={routes.LOGIN}>Login</Link>
// // 					</Menu.Item>
// // 					<Menu.Item key="join">
// // 						<Link to={routes.SIGNUP}>Join</Link>
// // 					</Menu.Item>
// // 				</React.Fragment>
// // 			)}
// // 		</Menu>
// // 	</Layout.Header>
// // );

// // Navbar.propTypes = {
// // 	auth: PropTypes.bool,
// // 	id: PropTypes.string,
// // 	user: PropTypes.object
// // };

// // Navbar.defaultProps = {
// // 	auth: null,
// // 	id: null,
// // 	user: null
// // };

// // export default Navbar;

// // import React from 'react';
// // import PropTypes from 'prop-types';
// // import { Link } from 'react-router-dom';
// // import { Menu, Dropdown, Avatar, Icon, Layout } from 'antd';
// // import routes from '../../constants';
// // import 'antd/dist/antd.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Avatar, Icon, Layout } from 'antd';
import logo from '../../assets/logo.png';
import routes from '../../constants';

const { Header } = Layout;

const menu = (
	<Menu selectedKeys={[]}>
		<Menu.Item key={routes.PROFILE}>
			<Link to={routes.PROFILE}>Profile</Link>
		</Menu.Item>

		<Menu.Divider />
		<Menu.Item key={routes.LOGOUT}>
			<Link
				to={routes.LOGOUT}
				style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, .65)' }}
			>
				<Icon type="logout" style={{ margin: 5 }} />
				Logout
			</Link>
		</Menu.Item>
	</Menu>
);

const Navbar = ({ auth, user, path }) => (
	<Header
		style={{
			width: '100%',
			backgroundColor: 'white',
			display: 'flex',
			padding: '0px 24px'
		}}
	>
		<div className="logo">
			<img
				// src="https://cdn1.imggmi.com/uploads/2018/10/12/1bce47614a88470a1b859a82e8ca783f-full.png"
				src={logo}
				style={{ width: 64 }}
			/>
		</div>

		{auth ? (
			<Menu
				theme="light"
				mode="horizontal"
				defaultSelectedKeys={['home']}
				style={{ lineHeight: '64px', width: '100%' }}
			>
				<Menu.Item key={routes.HOME}>
					<Link to={routes.HOME}>Home</Link>
				</Menu.Item>
				<Menu.Item style={{ float: 'right' }}>
					<Dropdown overlay={menu}>
						<div>
							<span />
							<Avatar
								size="small"
								src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
								alt="avatar"
							/>
							{user && (
								<span style={{ padding: '0px 10px', verticalAlign: 'middle' }}>
									{user.name}
								</span>
							)}
						</div>
					</Dropdown>
				</Menu.Item>
			</Menu>
		) : (
			<Menu
				theme="light"
				mode="horizontal"
				defaultSelectedKeys={['home']}
				style={{ lineHeight: '64px' }}
			>
				<Menu.Item key={routes.HOME}>
					<Link to={routes.HOME}>Home</Link>
				</Menu.Item>
				<Menu.Item key={routes.LOGIN}>
					<Link to={routes.LOGIN}>Login</Link>
				</Menu.Item>
				<Menu.Item key={routes.SIGNUP}>
					<Link to={routes.SIGNUP}>Join</Link>
				</Menu.Item>
			</Menu>
		)}
	</Header>
);

Navbar.propTypes = {
	auth: PropTypes.bool,
	id: PropTypes.string,
	user: PropTypes.object,
	path: PropTypes.string
};

Navbar.defaultProps = {
	auth: null,
	id: null,
	user: null,
	path: routes.HOME
};

export default Navbar;
