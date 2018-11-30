import React from 'react';
import { Table } from 'antd';
import { statuses } from '../../constants';
import SearchColumn from '../Common/SearchColumn';
import './JobTable.css';

class JobTable extends React.Component {
	state = {
		companyText: '',
		roleText: '',
		emailText: '',
		locationText: '',
		recruiterText: ''
	};

	handleSearch = (selectedKeys, confirm, text) => () => {
		confirm();
		this.setState({ [text]: selectedKeys[0] });
	};

	handleReset = (clearFilters, text) => () => {
		clearFilters();
		this.setState({ [text]: '' });
	};

	render() {
		const { jobs, loading } = this.props;
		const data = jobs.map(job => {
			job = {
				key: job._id,
				...job,
				coverLetter: job.coverLetter ? 'Yes' : 'No'
			};
			Object.keys(job).forEach(key => {
				if (!job[key]) job[key] = 'None';
			});
			return job;
		});

		const columns = [
			SearchColumn.bind(this)(
				'Company',
				'company',
				this.handleSearch,
				this.handleReset,
				this.state.companyText
			),
			SearchColumn.bind(this)(
				'Role',
				'role',
				this.handleSearch,
				this.handleReset,
				this.state.roleText
			),
			SearchColumn.bind(this)(
				'Email',
				'email',
				this.handleSearch,
				this.handleReset,
				this.state.emailText
			),
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				filters: statuses.map(status => ({
					text: status,
					value: status
				})),
				onFilter: (value, record) => record.status && record.status.indexOf(value) === 0
			},
			{
				title: 'Cover Letter',
				dataIndex: 'coverLetter',
				key: 'coverLetter',
				filters: [
					{
						text: 'Yes',
						value: 'Yes'
					},
					{
						text: 'No',
						value: 'No'
					}
				],
				onFilter: (value, record) =>
					record.coverLetter && record.coverLetter.indexOf(value) === 0
			},
			SearchColumn.bind(this)(
				'Location',
				'location',
				this.handleSearch,
				this.handleReset,
				this.state.locationText
			),
			SearchColumn.bind(this)(
				'Recruiter',
				'recruiter',
				this.handleSearch,
				this.handleReset,
				this.state.recruiterText
			)
			// {
			// 	company: '', // required
			// 	role: '', // required
			// 	email: '', // required
			// 	status: statuses[0],
			// 	coverLetter: false,
			// 	location: '',
			// 	recruiter: '',
			// 	blockers: '',
			// 	nextSteps: '',
			// 	additionalInformation: ''
			// }
		];
		return <Table columns={columns} dataSource={data} loading={loading} />;
	}
}

export default JobTable;
