import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { err } from '../../constants';
import { sendFlashMessage, clearFlashMessages, signUp } from '../../actions';
import { Header } from '../Common';
import FormItem from 'antd/lib/form/FormItem';
import { Button, Form, Input, Icon } from 'antd';

class SignUpPage extends Component {
	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func
		}).isRequired,
		signUp: PropTypes.func.isRequired,
		flash: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
			phone: ''
		};
		console.log('Signup page props', this.props);
	}

	onChange = e => {
		const { id, value } = e.target;
		this.setState({ [id]: value });
	};

	onSubmit = async e => {
		e.preventDefault();
		const { name, email, password, passwordConfirm } = this.state;
		const { flash, clear, signUp, history } = this.props;
		try {
			clear();
			if (!name) return flash('Please enter your full name');
			if (!email) return flash('An email is required for your account');
			if (!password) return flash('A password is required');
			if (!passwordConfirm) return flash('Please confirm your password');
			if (password !== passwordConfirm) return flash('Passwords does not match');

			flash('Creating your account...', 'green');
			const resp = await signUp(this.state);
			history.push('/');
			return flash(`Welcome ${resp.user.name}!`, 'green');
		} catch (error) {
			clear();
			console.error('EditProfile Page error:', error);
			return flash(err(error));
		}
	};

	render() {
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			colon: true
		};
		return (
			<div>
				<Header message="Signup" />
				<u>
					<h2>Signup</h2>
				</u>
				<Form
					layout="horizontal"
					className="login-form"
					onSubmit={this.onSubmit}
					style={{ maxWidth: 800 }}
				>
					<FormItem {...formItemLayout} label="Email">
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							id="email"
							onChange={this.onChange}
							placeholder="Email"
							type="email"
							title="Please enter your email"
							required
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Name">
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							id="name"
							onChange={this.onChange}
							placeholder="Full Name"
							pattern="([a-zA-Z]+ )+[a-zA-Z]+"
							title="Please enter your first and last name"
							required
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Password">
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							id="password"
							onChange={this.onChange}
							type="password"
							placeholder="Password"
							title="Please enter a password"
							required
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Password Confirm">
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							id="passwordConfirm"
							onChange={this.onChange}
							type="password"
							placeholder="Password Confirm"
							required
							title="Please confirm your password"
						/>
					</FormItem>
					<FormItem
						wrapperCol={{
							span: 14,
							offset: 4
						}}
					>
						<Button type="primary" htmlType="submit">
							Join
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
	{
		flash: sendFlashMessage,
		clear: clearFlashMessages,
		signUp
	}
)(SignUpPage);
