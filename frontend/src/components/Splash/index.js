import React from 'react';
import routes from '../../constants';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button/button';
import './index.css';

export default () => (
	<div className="Splash-Body">
		<div className="Splash-Content">
			<h1 className="Splash-Title">Welcome to Workly.</h1>
			<div className="Splash-Message">
				Organize your job application workflow with Workly.
				<br /> To get started login or sign up.
			</div>
			<div className="Splash-Buttons">
				<Button
					type="primary"
					size="large"
					style={{
						color: '#1890ff',
						marginRight: '15px',
						backgroundColor: 'white',
						borderColor: 'white',
						textShadow: 'none'
					}}
				>
					<Link to={routes.SIGNUP}>Sign Up</Link>
				</Button>

				<Button
					size="large"
					style={{
						color: 'white',
						backgroundColor: '#1890ff',
						borderColor: 'white'
					}}
				>
					<Link to={routes.LOGIN}>Login</Link>
				</Button>
			</div>
		</div>
	</div>
);
