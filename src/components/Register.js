import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

function RegisterAdmin() {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [books, setBooks] = useState([]);

	async function registerAdmin(event) {
		event.preventDefault();

		const response = await fetch(
			'http://localhost:1337/api/users/register-admin',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
					username,
					books,
				}),
			}
		);

		const data = await response.json();

		if (data.success === true) {
			navigate('/login');
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Admin Sign Up</h2>
					<Form onSubmit={registerAdmin}>
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
						<Button className="w-100 mt-3" type="submit">
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</>
	);
}

export default RegisterAdmin;
