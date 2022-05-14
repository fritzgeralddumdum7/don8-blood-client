import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Cookies from 'js-cookie';


const RequireAuth = ({ children }) => {
    const location = useLocation();
    const auth = useAuth();
    const user = Cookies.get('don8_blood');

    if (!auth.user && !user) {
        return <Navigate to='/login' state={{ path: location.pathname }} />
    }

    return children;
}

export default RequireAuth;
