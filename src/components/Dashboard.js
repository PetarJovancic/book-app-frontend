import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DataTable from './DataTable';

const Dashboard = () => {
	const [tableData, setTableData] = useState([]);
	const [searchName, setSearchName] = useState('');
	const [label, setLabel] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const isAdmin = localStorage.getItem('isAdmin');

		if (isAdmin === 'true') {
			setLabel('Admin Page');
		}
		if (isAdmin === 'false') {
			setLabel('User Page');
		}

		if (token) {
			const decoded = jwt_decode(token);

			if (Date.now() >= decoded.exp * 1000) {
				localStorage.clear();
				navigate('/login');
			} else {
				findAll();
			}
		}
	}, [navigate]);

	async function findAll() {
		const response = await fetch(`${process.env.REACT_APP_URL}/all-users`, {
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});

		const data = await response.json();

		// // If we want to exlude Admin users
		// let allUsers = [];

		// data.result.forEach(el => {
		// 	if (el.role !== 'admin') {
		// 		allUsers.push(el);
		// 	}
		// });

		setTableData(data.result);
	}

	async function search(e) {
		e.preventDefault();
		try {
			if (searchName) {
				const response = await fetch(
					`${process.env.REACT_APP_URL}/search?name=${searchName}`,
					{
						headers: {
							authorization: localStorage.getItem('token'),
						},
					}
				);

				const data = await response.json();

				const user = [];
				user.push(data.result);

				setTableData(user);
			} else {
				findAll();
			}
		} catch (err) {
			findAll();
		}
	}

	async function logout(e) {
		e.preventDefault();

		try {
			localStorage.clear();
			navigate('/login');
		} catch {
			alert('error while trying to logout');
		}
	}

	async function redirect(e) {
		e.preventDefault();

		try {
			const isAdmin = localStorage.getItem('isAdmin');

			if (isAdmin === 'true') {
				navigate('/admin/admin-page');
			}
			if (isAdmin === 'false') {
				navigate('/user/user-page');
			}
		} catch {
			alert('error whlie trying to redirect page');
		}
	}

	return (
		<div>
			<Form onSubmit={search}>
				<input
					className="w-100 mt-3"
					type="text"
					placeholder="Search"
					value={searchName}
					onChange={e => setSearchName(e.target.value)}
				/>
			</Form>
			<DataTable tableData={tableData} />
			<Form onSubmit={redirect}>
				<Button className="w-100 mt-3" type="submit">
					{label}
				</Button>
			</Form>
			<Form onSubmit={logout}>
				<Button className="w-100 mt-3" type="submit">
					Logout
				</Button>
			</Form>
		</div>
	);
};

export default Dashboard;
