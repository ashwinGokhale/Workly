import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Layout } from 'antd';
import { signIn, sendFlashMessage } from '../../actions';
import routes, { err } from '../../constants';
import { Header } from '../Common';

class LoginPage extends Component {
	static propTypes = {
		flash: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func
		}).isRequired,
		user: PropTypes.object,
		signIn: PropTypes.func.isRequired
	};

	static defaultProps = {
		user: null
	};

	constructor(props) {
		super(props);
		console.log('Login props:', this.props);
		this.state = {
			email: (this.props.user && this.props.user.email) || '',
			password: '',
			rememberMe: false
		};
	}

	onChange = e => this.setState({ [e.target.id]: e.target.value });

	onClick = () => this.setState({ rememberMe: !this.state.rememberMe });

	onSubmit = async e => {
		e.preventDefault();
		const { email, password, rememberMe } = this.state;
		const { flash } = this.props;
		try {
			if (!email) return flash('Please enter your email');
			if (!password) return flash('Please enter your password');
			const { user } = await this.props.signIn(email, password, rememberMe);
			console.log('Signed in user:', user);
			this.props.history.push('/');
			return flash(`Welcome ${user.name}!`, 'green');
		} catch (error) {
			return flash(err(error));
		}
	};

	render() {
		const { email, password } = this.state;
		const formItemLayout = {
			// labelCol: {
			// 	xs: { span: 24 },
			// 	sm: { span: 8 }
			// 	// // xs: { span: 16 },
			// 	// // sm: { span: 8 }
			// },
			// wrapperCol: {
			// 	xs: { span: 24 },
			// 	sm: { span: 16 }
			// },
			// labelCol: { span: 4 },
			// wrapperCol: { span: 14 },
			colon: true
		};
		return (
			<div>
				<Header message="Login" />
				<u>
					<h2>Login</h2>
				</u>
				<Form
					layout="horizontal"
					className="login-form"
					onSubmit={this.onSubmit}
					style={{ maxWidth: 700 }}
				>
					<FormItem {...formItemLayout} label="Email">
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							id="email"
							onChange={this.onChange}
							placeholder="Email"
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Password">
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							id="password"
							onChange={this.onChange}
							type="password"
							placeholder="Password"
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Remember Me">
						<Row>
							<Col span={8}>
								<Checkbox onChange={this.onClick} />
							</Col>
							<Col span={16}>
								<Link to={routes.FORGOT_PASSWORD}>Forgot password</Link>
							</Col>
						</Row>
					</FormItem>
					<FormItem
						wrapperCol={{
							// xs: { span: 24, offset: 0 },
							// sm: { span: 12, offset: 12 }
							span: 14,
							offset: 4
						}}
					>
						<Button type="primary" htmlType="submit">
							Login
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

export default connect(
	mapStateToProps,
	{ signIn, flash: sendFlashMessage }
)(LoginPage);

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					<Input
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder="Username"
					/>
				</FormItem>
				<FormItem>
					<Input
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						placeholder="Password"
					/>
				</FormItem>
				<FormItem>
					(<Checkbox>Remember me</Checkbox>)}
					<a className="login-form-forgot" href="">
						Forgot password
					</a>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
					</Button>
					Or <a href="">register now!</a>
				</FormItem>
			</Form>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
