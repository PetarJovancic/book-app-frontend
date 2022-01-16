import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
	const token = localStorage.getItem('token');

	if (token) return <Component />;
	return <Navigate to="/login" />;
};

export default PrivateRoute;
