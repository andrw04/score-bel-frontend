import {NavLink} from "react-router-dom";
import {CssBaseline} from "@mui/material";


const SignUp = () => {
    return (
        <>
            <CssBaseline enableColorScheme/>
            <div>Already have an account? <NavLink to='/login'>sign in</NavLink></div>
        </>
    )
}

export default SignUp;