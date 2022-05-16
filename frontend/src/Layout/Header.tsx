import {Box} from "@mui/material";
import logo from "../assets/logo.svg";

export const Header = () => {
    return <header>
        <Box borderBottom={2} color={'#E5E5E5'}>
            <img src={logo} alt="logo" width={380} height={100}/>
        </Box>
    </header>
}