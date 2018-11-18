import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park'
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
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search name"
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
					record.name.toLowerCase().includes(value.toLowerCase()),
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
				title: 'Age',
				dataIndex: 'age',
				key: 'age'
			},
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address',
				filters: [
					{
						text: 'London',
						value: 'London'
					},
					{
						text: 'New York',
						value: 'New York'
					}
				],
				onFilter: (value, record) => record.address.indexOf(value) === 0
			}
		];
		return <Table columns={columns} dataSource={data} />;
	}
}

export default JobTable;
