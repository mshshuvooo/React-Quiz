import Form from "../form/Form"
import TextInput from "../form/TextInput"
import Button from "../Button"
import classes from "../../styles/Login.module.css"
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const {logIn} = useAuth();
    const navigate = useNavigate();
 
    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            setError("");
            setLoading(true);
            await logIn(email, password);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(err.message);
            setLoading(true);
        }
    }

    return (
        <Form className = {classes.login} onSubmit={handleLogin}>
            <TextInput type="email" placeholder="Enter email" icon="alternate_email" 
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput type="password" placeholder="Enter password" icon="lock" 
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading}>Login</Button>
            {error && <p className="error">{error}</p>}
            <div className="info">Don't have an account? <Link to="/signup">Signup</Link> instead.</div>
        </Form>
    );
};

export default LoginForm;