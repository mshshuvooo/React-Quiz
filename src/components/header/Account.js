import classes from "../../styles/Account.module.css";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext"
const Account = () => {

    const {appCurrentUser, logOut} = useAuth();
    return (
        <div className={classes.account}>

            {appCurrentUser ? (
                    <>
                        <span className="material-icons-outlined" title="Account">
                        account_circle
                        </span>
                        <span>{appCurrentUser.displayName}</span>
                        <span className="material-icons-outlined" title="Logout" onClick={logOut}> logout </span> 
                    </>
                ):(
                    <>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </>
                )
            }        
        </div>
    );
};

export default Account;