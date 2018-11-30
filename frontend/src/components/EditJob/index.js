import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { sendFlashMessage, clearFlashMessages, createJob } from '../../actions';
import { Header } from '../Common';
import routes, { err } from '../../constants';
import 'react-quill/dist/quill.snow.css';

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
class EditJobPage extends Component {
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
			blockers: '',
			nextSteps: '',
			additionalInformation: ''
		};
		console.log('Edit Job props:', this.props);
	}

	onTextChange = id => value => this.setState({ [id]: value });

	onChange = e => this.setState({ [e.target.name]: e.target.value });

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
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 }
			},
			colon: true
		};

		return (
			<div>
				<Header message="Edit Job" />
				<u>
					<h2 className="center">Edit Job</h2>
				</u>
				<Form layout="horizontal" onSubmit={this.onSubmit}>
					<FormItem {...formItemLayout} label="Company *">
						<Input
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
						<Checkbox
							style={{ float: 'left' }}
							name="coverLetter"
							onChange={e => this.setState({ coverLetter: !this.state.coverLetter })}
						/>
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
					<u className="center">
						<h3>Blockers:</h3>
					</u>
					<ReactQuill
						value={this.state.blockers}
						onChange={this.onTextChange('blockers')}
					/>
					<br />
					<u className="center">
						<h3>Next Steps:</h3>
					</u>
					<ReactQuill
						value={this.state.nextSteps}
						onChange={this.onTextChange('nextSteps')}
					/>
					<br />
					<u className="center">
						<h3>Additional Information:</h3>
					</u>
					<ReactQuill
						value={this.state.additionalInformation}
						onChange={this.onTextChange('additionalInformation')}
					/>
					<br />
					<FormItem
						wrapperCol={{
							span: 14,
							offset: 5
						}}
						className="center"
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
	// ...state.sessionState,
	...state.jobState
});

export default connect(
	mapStateToProps,
	{ flash: sendFlashMessage, clear: clearFlashMessages, addJob: createJob }
)(EditJobPage);
