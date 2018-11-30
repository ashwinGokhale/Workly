import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin, Card, Row, Col, Button } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import routes, { err } from '../../constants';
import { sendFlashMessage, clearFlashMessages, fetchJob, deleteJob } from '../../actions';
import { Header, CustomRedirect } from '../Common';
import './index.css';

class JobPage extends Component {
	static propTypes = {
		flash: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired,
		token: PropTypes.string
	};

	static defaultProps = {
		token: ''
	};

	constructor(props) {
		super(props);
		this.state = {
			job: props.jobs.find(job => job._id === props.match.params.id),
			loading: true
		};
		console.log('Job Page props', props);
	}

	componentDidMount = async () => {
		const {
			clear,
			flash,
			match: {
				params: { id }
			}
		} = this.props;
		let { job } = this.state;
		try {
			clear();
			job = job || (await fetchJob(id));
			job = {
				...job,
				coverLetter: job.coverLetter ? 'Yes' : 'No'
			};
			Object.keys(job).forEach(key => {
				if (!job[key]) job[key] = 'None';
			});

			this.setState({ loading: false, job });
			console.log('Got JOb:', job);
		} catch (error) {
			clear();
			this.setState({ loading: false });
			return flash(err(error));
		}
	};

	onDelete = async () => {
		const {
			clear,
			flash,
			match: {
				params: { id }
			},
			history: { push },
			removeJob
		} = this.props;
		try {
			clear();
			await removeJob(id);
			push(routes.HOME);
			return flash('Successfully removed job', 'green');
		} catch (error) {
			clear();
			return flash(err(error));
		}
	};

	render() {
		const { loading, job } = this.state;
		const {
			match: {
				params: { id }
			}
		} = this.props;
		if (loading)
			return (
				<div className="center">
					<Spin size="large" />
				</div>
			);

		if (!job) return <CustomRedirect msgRed="Error: Job not found" />;
		return (
			<div>
				<Header message="Job" />
				<Card>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Company:</h3>
							</u>
						</Col>
						<Col span={4}>
							<h3>{job.company}</h3>
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Role:</h3>
							</u>
						</Col>
						<Col span={4}>
							<h3>{job.role}</h3>
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Email:</h3>
							</u>
						</Col>
						<Col span={4}>
							<h3>{job.email}</h3>
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Status:</h3>
							</u>
						</Col>
						<Col span={4}>
							<h3>{job.status}</h3>
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Location:</h3>
							</u>
						</Col>
						<Col span={4}>
							<h3>{job.location}</h3>
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Recruiter:</h3>
							</u>
						</Col>
						<Col span={4}>
							<h3>{job.recruiter}</h3>
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Cover Letter:</h3>
							</u>
						</Col>
						<Col span={4}>
							<h3>{job.coverLetter}</h3>
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Blockers:</h3>
							</u>
						</Col>
						<Col span={6}>
							{job.blockers === 'None' ? (
								<h3>None</h3>
							) : (
								<>
									<Card>{ReactHtmlParser(job.blockers)}</Card>
									<br />
								</>
							)}
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Next Steps:</h3>
							</u>
						</Col>
						<Col span={6}>
							{job.nextSteps === 'None' ? (
								<h3>None</h3>
							) : (
								<>
									<Card>{ReactHtmlParser(job.nextSteps)}</Card>
									<br />
								</>
							)}
						</Col>
					</Row>
					<Row>
						<Col offset={10} span={3}>
							<u>
								<h3>Additional Information:</h3>
							</u>
						</Col>
						<Col span={6}>
							{job.additionalInformation === 'None' ? (
								<h3>None</h3>
							) : (
								<>
									<Card>{ReactHtmlParser(job.additionalInformation)}</Card>
									<br />
								</>
							)}
						</Col>
					</Row>
				</Card>
				<br />
				<br />
				<Row>
					<Col offset={10} span={3}>
						<Link to={`/jobs/${id}/edit`}>
							<Button type="primary" icon="edit">
								Edit
							</Button>
						</Link>
					</Col>
					<Col span={8}>
						<Button type="danger" icon="delete" onClick={this.onDelete}>
							Delete
						</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.jobState
});

export default connect(
	mapStateToProps,
	{
		flash: sendFlashMessage,
		clear: clearFlashMessages,
		removeJob: deleteJob
	}
)(JobPage);
