import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

function AdminPage() {
	const navigate = useNavigate();

	const [showAdded, setShowAdded] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded = jwt_decode(token);

			if (Date.now() >= decoded.exp * 1000) {
				localStorage.clear();
				navigate('/login');
			}
		}
	}, [navigate]);

	async function addUser(event) {
		event.preventDefault();

		const response = await fetch(`${process.env.REACT_APP_URL}/register-user`, {
			method: 'POST',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				username,
				books,
			}),
		});

		const data = await response.json();
		setShowAdded(true);
		setTimeout(function () {
			setShowAdded(false);
		}, 1000);
	}

	async function editUser(event) {
		event.preventDefault();

		const response = await fetch(`${process.env.REACT_APP_URL}/edit`, {
			method: 'PUT',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				books,
				username,
			}),
		});

		const data = await response.json();
		setShowEdit(true);
		setTimeout(function () {
			setShowEdit(false);
		}, 1000);
	}

	async function deleteUser(event) {
		event.preventDefault();

		const response = await fetch(`${process.env.REACT_APP_URL}/delete-user`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token'),
			},
			body: JSON.stringify({
				username,
			}),
		});

		const data = await response.json();

		setShowDelete(true);
		setTimeout(function () {
			setShowDelete(false);
		}, 1000);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Add User</h2>
					<Alert show={showAdded} variant="primary">
						User has been added
					</Alert>
					<Form>
						<Form.Group id="text">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								onChange={e => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								onChange={e => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="username"
								onChange={e => setUsername(e.target.value)}
							/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								onChange={e => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group id="array">
							<Form.Label>Books</Form.Label>
							<Form.Control
								type="array"
								onChange={e => setBooks(e.target.value)}
							/>
						</Form.Group>
					</Form>
					<Form onSubmit={addUser}>
						<Button className="w-100 mt-3" type="submit">
							Add
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Edit User</h2>
					<Alert show={showEdit} variant="success">
						User has been edited
					</Alert>
					<Form className="text-center mb-4">
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="username"
								onChange={e => setUsername(e.target.value)}
							/>
						</Form.Group>
					</Form>

					<Form.Group id="text">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" onChange={e => setName(e.target.value)} />
					</Form.Group>
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group id="array">
						<Form.Label>Books</Form.Label>
						<Form.Control
							type="array"
							onChange={e => setBooks(e.target.value)}
						/>
					</Form.Group>
					<Form onSubmit={editUser}>
						<Button className="w-100 mt-3" type="submit">
							Edit
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Delete User</h2>
					<Alert show={showDelete} variant="danger">
						User has been deleted
					</Alert>
					<Form className="text-center mb-4">
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="username"
								onChange={e => setUsername(e.target.value)}
							/>
						</Form.Group>
					</Form>
					<Form onSubmit={deleteUser} style={{ color: '#FF0000' }}>
						<Button className="w-100 mt-3" type="submit">
							Delete
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Get back to main page <Link to="/">Main Page</Link>
			</div>
		</>
	);
}

export default AdminPage;
