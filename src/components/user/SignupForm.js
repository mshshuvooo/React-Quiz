import Form from "../form/Form"
import TextInput from "../form/TextInput"
import CheckboxInput from "../form/CheckboxInput"
import Button from "../Button"
import classes from "../../styles/Signup.module.css"
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"


const SignupForm = () => {
 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const {signUp} = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            return setError("Passwprds don't match.");
        }

        try{
            setError("");
            setLoading(true);
            await signUp(email, password, username);
            navigate("/");
        }catch (err){
            console.log(err);
            setLoading(false);
            setError(err.message);
        }
    }

    return (
        <Form className = {classes.signup} onSubmit={handleSignup}>
            <TextInput type={"text"} placeholder="Enter Your Name" icon="person" required
                value ={username} onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput type={"email"} placeholder="Enter Your Email" icon="alternate_email" required
                value ={email} onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput type={"password"} placeholder="Enter Your password" icon="lock" required
                value ={password} onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput type={"password"} placeholder="Confirm password" icon="lock_clock" required
                value ={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CheckboxInput label={"I agree to the Terms & Conditions"} required
                value ={agreeTerms} onChange={(e) => setAgreeTerms(e.target.value)}
            />

            <Button type="submit" disabled={loading}>Submit now</Button>
            {error && <p className="error">{error}</p>}
            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
};

export default SignupForm;