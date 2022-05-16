import {Grid} from '@mui/material';
import {Outlet} from "react-router-dom";
import {Header} from "./Header";

export function Layout() {
    return (
        <Grid>
            <Header/>
            <Outlet/>
        </Grid>
    );
}
