import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendFlashMessage, clearFlashMessages, createJob } from '../../actions';
import { Header } from '../Common';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import routes, { err } from '../../constants';

const statuses = [
	'Need To Apply',
	'Applied',
	'Interview',
	'Received Offer',
	'Accepted Offer',
	'Denied'
];

// TODO: Add blockers and next steps to form
// TODO: Convert some inputs to text areas
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
			company: '', // required
			role: '', // required
			email: '', // required
			status: statuses[0],
			coverLetter: false,
			location: '',
			recruiter: '',
			blockers: [],
			nextSteps: [],
			additionalInformation: ''
		};
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onListAdd = e =>
		this.setState({ [e.target.name]: [...this.state[e.target.name], e.target.value] });
	onListRemove = e =>
		this.setState({
			[e.target.name]: this.state[e.target.name].filter(val => val !== e.target.value)
		});

	onSubmit = async e => {
		e.preventDefault();
		const { company, role, email } = this.state;
		const { clear, flash, addJob } = this.props;
		try {
			clear();
			if (!company) return flash('Please enter the company name');
			if (!role) return flash('Please enter the role you are applying for');
			if (!email) return flash('Please enter the email you applied with');
			const job = await addJob(this.state);
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
				<Form layout="horizontal" onSubmit={this.onSubmit}>
					<FormItem {...formItemLayout} label="Company *">
						<Input
							// prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							name="company"
							onChange={this.onChange}
							placeholder="Google"
							required
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Role *">
						<Input
							name="role"
							onChange={this.onChange}
							placeholder="Software Engineer"
							required
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Email *">
						<Input
							name="email"
							onChange={this.onChange}
							placeholder="example@workly.com"
							type="email"
							required
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Status">
						<Select
							showArrow={true}
							onChange={status => this.setState({ status })}
							defaultActiveFirstOption={true}
							defaultValue={statuses[0]}
						>
							{statuses.map((s, i) => (
								<Select.Option value={s} key={`status-${i}`}>
									{s}
								</Select.Option>
							))}
						</Select>
					</FormItem>
					<FormItem {...formItemLayout} label="Cover Letter">
						<Checkbox name="coverLetter" onChange={this.onChange} />
					</FormItem>
					<FormItem {...formItemLayout} label="Location">
						<Input
							name="location"
							onChange={this.onChange}
							placeholder="San Francisco"
						/>
					</FormItem>
					<FormItem {...formItemLayout} label="Recruiter">
						<Input
							name="recruiter"
							onChange={this.onChange}
							placeholder="Recruiter Info"
						/>
					</FormItem>
					{/* <Form layout="horizontal">
						<FormItem {...formItemLayout} label="Blockers">
							<Input
								name="blockers"
								onChange={this.onChange}
								placeholder="Waiting for referral"
							/>
						</FormItem>
						<FormItem {...formItemLayout} label="Next Steps">
							<Input
								name="nextSteps"
								onChange={this.onChange}
								placeholder="Wait for cofing challenge"
							/>
						</FormItem>
					</Form> */}
					<FormItem {...formItemLayout} label="Additional Information">
						<Input
							name="additionalInformation"
							onChange={this.onChange}
							placeholder=""
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
