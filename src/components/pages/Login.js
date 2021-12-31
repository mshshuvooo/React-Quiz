import Illustration from "../Illustration";
import SignupImage from "../../assets/images/login.svg";
import LoginForm from "../user/LoginForm";
const Login = () => {
    return (
        <>
            <h1>Login to your account</h1>
            <div className="column">
                <Illustration image={SignupImage}/>
                <LoginForm/>
            </div>
        </>
    );
};

export default Login;