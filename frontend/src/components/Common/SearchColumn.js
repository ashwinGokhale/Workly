import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

// export default class SearchColumn extends Table.Column {
// 	constructor(props) {
// 		super(props);
// 		console.log('Search Column made:', this.props);
// 	}

// 	state = {
// 		searchText: ''
// 	};

// 	handleSearch = (selectedKeys, confirm) => () => {
// 		confirm();
// 		this.setState({ searchText: selectedKeys[0] });
// 	};

// 	handleReset = clearFilters => () => {
// 		clearFilters();
// 		this.setState({ searchText: '' });
// 	};

// 	filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
// 		<div className="custom-filter-dropdown">
// 			<Input
// 				ref={ele => (this.searchInput = ele)}
// 				placeholder={`Search ${this.props.title}`}
// 				value={selectedKeys[0]}
// 				onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
// 				onPressEnter={this.handleSearch(selectedKeys, confirm)}
// 			/>
// 			<Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
// 				Search
// 			</Button>
// 			<Button onClick={this.handleReset(clearFilters)}>Reset</Button>
// 		</div>
// 	);

// 	filterIcon = filtered => (
// 		<Icon type="filter" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
// 	);
// 	onFilter = (value, record) =>
// 		record[this.props.key] &&
// 		record[this.props.key].toLowerCase().includes(value.toLowerCase());

// 	onFilterDropdownVisibleChange = visible => {
// 		if (visible) {
// 			setTimeout(() => {
// 				this.searchInput.focus();
// 			});
// 		}
// 	};
// 	renderColumn = text => {
// 		console.log('Rendering column:', text);
// 		const { searchText } = this.state;
// 		return searchText ? (
// 			<span>
// 				{text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map(
// 					(fragment, i) =>
// 						fragment.toLowerCase() === searchText.toLowerCase() ? (
// 							<span key={i} className="highlight">
// 								{fragment}
// 							</span>
// 						) : (
// 							fragment
// 						) // eslint-disable-line
// 				)}
// 			</span>
// 		) : (
// 			text
// 		);
// 	};

// 	render() {
// 		const { title, key } = this.props;
// 		console.log('Search Column Props', this.props);
// 		return (
// 			<Table.Column
// 				title={title}
// 				key={key}
// 				// dataIndex={key}
// 				filterDropdown={this.filterDropdown}
// 				filterIcon={this.filterIcon}
// 				onFilter={this.onFilter}
// 				onFilterDropdownVisibleChange={this.onFilterDropdownVisibleChange}
// 				render={this.renderColumn}
// 			/>
// 		);
// 	}
// }

export default (title, key, handleSearch, handleReset, searchText) => ({
	title,
	dataIndex: key,
	key,
	filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		<div className="custom-filter-dropdown">
			<Input
				placeholder={`Search ${title}`}
				value={selectedKeys[0]}
				onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
				onPressEnter={handleSearch(selectedKeys, confirm, `${key}Text`)}
			/>
			<Button type="primary" onClick={handleSearch(selectedKeys, confirm, `${key}Text`)}>
				Search
			</Button>
			<Button onClick={handleReset(clearFilters, `${key}Text`)}>Reset</Button>
		</div>
	),
	filterIcon: filtered => <Icon type="filter" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
	onFilter: (value, record) =>
		record[key] && record[key].toLowerCase().includes(value.toLowerCase()),
	render: text => {
		return searchText ? (
			<span>
				{text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map(
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
});
