import Nav from "./header/Nav";
import classes from "../styles/Layout.module.css"

const Layout = ({children}) => {
    return (
        <>
            <Nav/>
            <main className={classes.main}>
                <div className={classes.container}>
                    {children}
                </div>
            </main>  
        </>
    );
};

export default Layout;