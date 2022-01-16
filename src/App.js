import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import React from 'react';

const App = () => {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: '100vh' }}
		>
			<div className="w-100" style={{ maxWidth: '600px' }}>
				<Router>
					<Routes>
						<Route path="/" element={<PrivateRoute component={Dashboard} />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/admin/admin-page"
							element={<PrivateRoute component={AdminPage} />}
						/>
						<Route
							path="/user/user-page"
							element={<PrivateRoute component={UserPage} />}
						/>
						<Route path="/admin/register" element={<Register />} />
					</Routes>
				</Router>
			</div>
		</Container>
	);
};

export default App;
