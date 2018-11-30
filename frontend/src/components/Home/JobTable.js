import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import { statuses } from '../../constants';
import SearchColumn from '../Common/SearchColumn';
import './JobTable.css';

const data = [
	{
		key: '1',
		company: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park'
	},
	{
		key: '2',
		company: 'Brown Hames',
		age: 23,
		address: 'London, Somrthng'
	}
];

class JobTable extends React.Component {
	state = {
		searchText: ''
	};

	handleSearch = (selectedKeys, confirm) => () => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = clearFilters => () => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	render() {
		console.log('Job Table props:', this.props);
		const { jobs, loading } = this.props;
		const data = jobs.map(job => ({
			key: job._id,
			...job,
			coverLetter: job.coverLetter ? 'Yes' : 'No'
		}));
		const columns = [
			{
				title: 'Company',
				dataIndex: 'company',
				key: 'company',
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search Company"
							value={selectedKeys[0]}
							onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
							onPressEnter={this.handleSearch(selectedKeys, confirm)}
						/>
						<Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
							Search
						</Button>
						<Button onClick={this.handleReset(clearFilters)}>Reset</Button>
					</div>
				),
				filterIcon: filtered => (
					<Icon type="filter" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
				),
				onFilter: (value, record) =>
					record.company.toLowerCase().includes(value.toLowerCase()),
				onFilterDropdownVisibleChange: visible => {
					if (visible) {
						setTimeout(() => {
							this.searchInput.focus();
						});
					}
				},
				render: text => {
					const { searchText } = this.state;
					return searchText ? (
						<span>
							{text
								.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
								.map(
									(fragment, i) =>
										fragment.toLowerCase() === searchText.toLowerCase() ? (
											<span key={i} className="highlight">
												{fragment}
											</span>
										) : (
											fragment
										) // eslint-disable-line
								)}
						</span>
					) : (
						text
					);
				}
			},
			{
				title: 'Role',
				dataIndex: 'role',
				key: 'role',
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search Role"
							value={selectedKeys[0]}
							onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
							onPressEnter={this.handleSearch(selectedKeys, confirm)}
						/>
						<Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
							Search
						</Button>
						<Button onClick={this.handleReset(clearFilters)}>Reset</Button>
					</div>
				),
				filterIcon: filtered => (
					<Icon type="filter" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
				),
				onFilter: (value, record) =>
					record.company.toLowerCase().includes(value.toLowerCase()),
				onFilterDropdownVisibleChange: visible => {
					if (visible) {
						setTimeout(() => {
							this.searchInput.focus();
						});
					}
				},
				render: text => {
					const { searchText } = this.state;
					return searchText ? (
						<span>
							{text
								.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
								.map(
									(fragment, i) =>
										fragment.toLowerCase() === searchText.toLowerCase() ? (
											<span key={i} className="highlight">
												{fragment}
											</span>
										) : (
											fragment
										) // eslint-disable-line
								)}
						</span>
					) : (
						text
					);
				}
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
			},
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
				key: 'coverLetter'
			},
			{
				title: 'Location',
				dataIndex: 'location',
				key: 'location'
			},
			{
				title: 'Recruiter',
				dataIndex: 'recruiter',
				key: 'recruiter'
			}
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
