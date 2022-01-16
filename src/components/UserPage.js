import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

function UserPage() {
	const [books, setBooks] = useState([]);
	const [showAdded, setShowAdded] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const navigate = useNavigate();

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

	async function addBook(event) {
		event.preventDefault();

		const response = await fetch('http://localhost:1337/api/users/add-book', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				authorization: localStorage.getItem('token'),
			},
			body: JSON.stringify({
				books,
			}),
		});

		const data = await response.json();
		setShowAdded(true);
		setTimeout(function () {
			setShowAdded(false);
		}, 1000);
	}

	async function deleteBooks(event) {
		event.preventDefault();

		const response = await fetch(
			'http://localhost:1337/api/users/delete-book',
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({
					books,
				}),
			}
		);

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
					<h2 className="text-center mb-4">Edit Profile</h2>
					<Alert show={showAdded} variant="primary">
						Book(s) has been added
					</Alert>
					<Alert show={showDelete} variant="danger">
						Book(s) has been deleted
					</Alert>
					<Form>
						<Form.Group id="array">
							<Form.Label>Books</Form.Label>
							<Form.Control
								type="array"
								onChange={e => setBooks(e.target.value)}
							/>
						</Form.Group>
					</Form>
					<Form onSubmit={addBook}>
						<Button className="w-100 mt-3" type="submit">
							Add Book(s)
						</Button>
					</Form>
					<Form onSubmit={deleteBooks}>
						<Button className="w-100 mt-3" type="submit">
							Delete Book(s)
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

export default UserPage;
