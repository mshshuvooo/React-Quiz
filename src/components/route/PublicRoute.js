import {useAuth} from "../../context/AuthContext"
import {Navigate} from "react-router-dom"

const PublicRoute = ({children}) => {
    const {appCurrentUser} = useAuth();

    return appCurrentUser ? <Navigate to="/" />  : children;
};

export default PublicRoute;