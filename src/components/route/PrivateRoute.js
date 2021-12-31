import {useAuth} from "../../context/AuthContext"
import {Navigate} from "react-router-dom"
const PrivateRoute = ({children}) => {
 
    const {appCurrentUser} = useAuth();

    return appCurrentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;