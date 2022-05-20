import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg";

export const Header = () => {
    let navigate = useNavigate();
    return <header>
        <Box borderBottom={2} color={'#E5E5E5'}>
            <img style={{cursor: 'pointer'}} src={logo} alt="logo" width={380} height={100}
                 onClick={() => navigate('/')}/>
        </Box>
    </header>
}