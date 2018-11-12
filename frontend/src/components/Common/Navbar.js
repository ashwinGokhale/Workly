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

const Navbar = ({ auth, user, path }) => {
	const routesToMatch = auth
		? [routes.HOME, routes.PROFILE]
		: [routes.HOME, routes.LOGIN, routes.SIGNUP];
	const selectedKey = routesToMatch.some(route => route === path) ? path : routes.HOME;
	return (
		<Header
			style={{
				width: '100%',
				backgroundColor: 'white',
				display: 'flex',
				padding: '0px 24px'
			}}
		>
			<div className="logo">
				<img src={logo} style={{ width: 64 }} alt="logo" />
			</div>
			{auth ? (
				<Menu
					theme="light"
					mode="horizontal"
					selectedKeys={[selectedKey]}
					defaultSelectedKeys={[routes.HOME]}
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
					selectedKeys={[selectedKey]}
					defaultSelectedKeys={[routes.HOME]}
					style={{ lineHeight: '64px', width: '100%' }}
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
};

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
