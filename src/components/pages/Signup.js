import Illustration from "../Illustration";
import SignupImage from "../../assets/images/signup.svg";
import SignupForm from "../user/SignupForm";

const Signup = () => {
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration image={SignupImage}/>
                <SignupForm/>
            </div>
        </>
            
        
    );
};

export default Signup;