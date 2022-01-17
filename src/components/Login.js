import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	async function loginUser(e) {
		e.preventDefault();

		const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password,
				username,
			}),
		});

		const data = await response.json();

		if (data.success) {
			localStorage.setItem('token', data.token);

			if (data.role === 'admin') {
				localStorage.setItem('isAdmin', true);
			} else {
				localStorage.setItem('isAdmin', false);
			}

			alert('Login successful');
			navigate('/');
		} else {
			localStorage.clear();
			alert('Please check your username and password');
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			navigate('/');
		}
	});

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Log In</h2>
					<Form onSubmit={loginUser}>
						<Form.Group id="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="username"
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Button className="w-100 mt-3" type="submit">
							Login
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Create Admin acount? <Link to="/admin/register">Register Admin</Link>
			</div>
		</>
	);
}

export default Login;
