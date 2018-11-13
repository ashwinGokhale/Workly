import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendFlashMessage, clearFlashMessages, createJob } from '../../actions';
import { Header } from '../Common';
import { Form, Input, Icon, Row, Col, Checkbox, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import routes, { err } from '../../constants';

class CreateJob extends Component {
	static propTypes = {
		flash: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func
		}).isRequired,
		addJob: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = async e => {
		e.preventDefault();
		const { name } = this.state;
		const { clear, flash, addJob } = this.props;
		try {
			clear();
			if (!name) return flash('Please enter company name');
			const job = await addJob({ name });
			console.log('Created a job:', job);
			this.props.history.push(routes.HOME);
			return flash('Successfully created job', 'green');
		} catch (error) {
			clear();
			return flash(err(error));
		}
	};

	render() {
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 14 },
			colon: true
		};

		return (
			<div>
				<Header message="Create Job" />
				<u>
					<h2>Create Job</h2>
				</u>
				<Form layout="horizontal" className="login-form" onSubmit={this.onSubmit}>
					<FormItem {...formItemLayout} label="Name">
						<Input
							// prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							name="name"
							onChange={this.onChange}
							placeholder="Google"
						/>
					</FormItem>
					<FormItem
						wrapperCol={{
							span: 14,
							offset: 4
						}}
					>
						<Button type="primary" htmlType="submit">
							Create Job
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
	{ flash: sendFlashMessage, clear: clearFlashMessages, addJob: createJob }
)(CreateJob);
